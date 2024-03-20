import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";

import Lottie from "lottie-react";
import type { Contract } from "web3";
import type { Auction } from "../../models/auction";

import Loading from "../../components/Loading";
import BidList from "../../components/bids/BidList";
import MakeBid from "../../components/bids/MakeBid";
import CopyClipboard from "../../components/CopyClipboard";
import NotFoundLottie from "../../assets/lotties/notfound.json";

import web3 from "../../web3/web3";
import AuctionCont from "../../web3/auction";

const AuctionDetailPage = () => {
  const params = useParams();
  const [contract] = useState<Contract<any>>(AuctionCont.from(params.id!));
  const [accounts, setAccounts] = useState<string[]>([]);

  const { data, error, isLoading, mutate } = useSWR<Auction, any, any>("/:id", getSumary);

  useEffect(() => {
    if ((window as any).ethereum) {
      (window as any).ethereum.on("chainChanged", () => {
        window.location.reload();
      });
      (window as any).ethereum.on("accountsChanged", () => {
        getAccounts();
      });
    }
  }, []);

  useEffect(() => {
    getAccounts();
  }, []);

  async function getSumary() {
    return contract.methods.getSummary().call();
  }

  async function getAccounts() {
    try {
      const signers = await web3.eth.getAccounts();
      setAccounts(signers);
    } catch (error: any) {
      alert(error.message);
    }
  }

  async function makeBid() {
    try {
      const _amount = window.prompt("enter the amount in ether.");
      const amount = parseFloat(_amount || "");

      if (isNaN(amount)) {
        alert("incorrect input!");
        return;
      }

      const signers = await web3.eth.getAccounts();
      const remain = await contract.methods
        .getAmountForBid(web3.utils.toWei(String(amount), "ether"))
        .call({ from: signers[0] });

      alert(remain + " || " + signers[0]);

      await contract.methods.makeBid().send({
        value: String(remain),
        from: signers[0]
      });

      mutate();
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
        <div className="container">
          <div>{JSON.stringify(error, null, 2)}</div>
        </div>
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
            <MakeBid
              key={Math.random()}
              onBid={makeBid}
              secondsLeft={Number(data?.finishTime) - Math.floor(Date.now() / 1000)}
            />
          </div>
          <div className="mt-5 text-gray-900 dark:text-white">
            <h5 className="text-lg font-bold">Details</h5>
            <div className="mt-5 space-y-4">
              <div className="flex items-center space-x-5">
                <span>Address:</span>
                <div>
                  <span className="text-blue-700 dark:text-white">
                    {data?._id.substring(0, 20)}...
                  </span>
                  <span className="ml-3">
                    <CopyClipboard text={data?._id} />
                  </span>
                </div>
              </div>

              <div className="space-x-5">
                <span>Created:</span>
                <span>{new Date(Number(data?.finishTime) * 1000).toDateString()}</span>
              </div>

              {accounts[0] === data?.creator && !data.completed && (
                <div className="space-x-5">
                  <button
                    onClick={finishTheAuction}
                    className=" justify-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-200 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900">
                    finish
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-8">
          <div className="text-gray-900 dark:text-white">
            <h5 className="mb-3 text-lg font-bold">Info:</h5>
            <div className="mb-2 flex items-center gap-3">
              <span>Seller:</span>
              <div className="flex items-center gap-3">
                <span className="text-blue-700 dark:text-white">
                  {data?.creator.substring(0, 18)}...
                </span>
                <CopyClipboard text={data?.creator} />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span>Etherscan:</span>
              <div className="flex items-center gap-3">
                <span className="text-blue-700 dark:text-white"></span>
              </div>
            </div>
          </div>
          <div className="flex animate-bounce items-center gap-3 rounded-md border p-5 text-gray-900 shadow dark:text-white">
            <span className="relative flex h-4 w-4">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex h-4 w-4 rounded-full bg-sky-500"></span>
            </span>

            <span className="font-bold">
              {data?.bids.length! > 0 && data?.completed
                ? "Winner"
                : data?.bids.length! > 0
                  ? "Current bid"
                  : "Base price"}
              :
            </span>
            <span className="font-bold text-red-700">
              {web3.utils.fromWei(String(data?.basePrice), "ether")} ETH
            </span>
            {data?.bids.length! > 0 && (
              <div className="mx-2 flex items-center gap-3">
                <span className="text-blue-700 dark:text-white">
                  {"("}
                  {data?.bids.at(-1)?.owner.substring(0, 10)}...
                </span>
                <span>
                  <CopyClipboard text={data?.bids.at(-1)?.owner} />
                  <span className="text-blue-700 dark:text-white">{")"}</span>
                </span>
              </div>
            )}
          </div>
          <div className="" />
          <div className="text-gray-900 dark:text-white">
            <h5 className="mb-3 text-lg font-bold">Bids:</h5>
            {data?.bids.length! > 0 ? (
              <BidList bids={data?.bids.reverse() || []} />
            ) : (
              <div className="flex flex-col items-center justify-center gap-5">
                <div className="my-5 w-1/2">
                  <Lottie animationData={NotFoundLottie} />
                </div>
                <div className="text-xl text-black dark:text-white">
                  There are not bids yet.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuctionDetailPage;
