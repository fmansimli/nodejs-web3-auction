import { useState } from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";

import Loading from "../../components/Loading";
import BidList from "../../components/bids/BidList";
import MakeBid from "../../components/bids/MakeBid";

import web3 from "../../web3/web3";
import AuctionCont from "../../web3/auction";
import { Auction } from "../../models/auction";
import type { Contract } from "web3";

const AuctionDetailPage = () => {
  const params = useParams();
  const [contract] = useState<Contract<any>>(AuctionCont.from(params.id!));
  const { data, error, isLoading, mutate } = useSWR<Auction, any, any>("/:id", getSumary);

  async function getSumary() {
    return contract.methods.getSummary().call();
  }

  async function getAccounts() {
    const signers = await web3.eth.getAccounts();
    alert(JSON.stringify(signers, null, 2));
  }

  async function makeBid() {
    try {
      const _amount = window.prompt("enter the amount in ether.");
      const amount = parseFloat(_amount || "");

      if (!isNaN(amount)) {
        const signers = await web3.eth.getAccounts();

        await contract.methods.makeBid().send({
          value: web3.utils.toWei(String(amount), "ether"),
          from: signers[0]
        });

        mutate();
        return;
      }

      alert("incorrect input!");
    } catch (error: any) {
      alert(error.message);
    }
  }

  async function finishTheAuction() {
    try {
      const signers = await web3.eth.getAccounts();
      await contract.methods.finish().send({ from: signers[0] });
      mutate();
    } catch (error: any) {
      alert(error.message);
    }
  }

  if (isLoading) {
    return <Loading visible />;
  }

  if (error) {
    return (
      <div className="flex w-full flex-1 items-center justify-center">
        <div>{JSON.stringify(error, null, 2)}</div>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-1">
      <div className="container my-10 flex flex-1 flex-col gap-20 lg:flex-row">
        <div className="flex flex-1 flex-col gap-8">
          <div>
            <div className="text-3xl font-bold text-black dark:text-white">
              <h1 onClick={getAccounts}>{data?.title}</h1>
            </div>
          </div>
          <div className="text-md text-black dark:text-white">
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum, dolor sit
              amet consectetur adipisicing elit. Id, corrupti suscipit qui quidem minima nulla?
            </div>
          </div>
          <div className="text-gray-900 dark:text-white">
            <MakeBid onBid={makeBid} />
          </div>
          <div className="mt-5 text-gray-900 dark:text-white">
            <h5 className="text-lg font-bold">Details</h5>
            <div className="mt-5 space-y-3">
              <div className="space-x-5">
                <span>Address:</span>
                <span>{data?._id.substring(0, 20)}...</span>
              </div>
              <div className="space-x-5">
                <span>Creator:</span>
                <span>{data?.creator.substring(0, 20)}...</span>
              </div>

              <div className="space-x-5">
                <span>Created:</span>
                <span>{new Date(Number(data?.finishTime)).toDateString()}</span>
              </div>

              <div className="space-x-5">
                <span>Completed:</span>
                <span>{String(data?.completed)}</span>
              </div>

              <div className="space-x-5">
                <button
                  onClick={finishTheAuction}
                  className=" justify-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-200 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900">
                  finish
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-8">
          <div className="text-gray-900 dark:text-white">
            <h5 className="mb-3 text-lg font-bold">Info:</h5>
            <div className="space-x-5">
              <span>Seller:</span>
              <span>{data?.creator.substring(0, 20)}...</span>
            </div>
          </div>
          <div className="space-x-5 text-gray-900 dark:text-white">
            <span>Current price:</span>
            <span className="font-bold text-red-700">
              {web3.utils.fromWei(String(data?.basePrice), "ether")} ETH
            </span>
          </div>
          <div className="border border-gray-500/25 dark:border-blue-300/60" />
          <div className="text-gray-900 dark:text-white">
            <h5 className="mb-3 text-lg font-bold">Bids:</h5>
            <BidList bids={data?.bids || []} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuctionDetailPage;
