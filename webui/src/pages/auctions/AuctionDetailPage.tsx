import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import useSWR from "swr";

import Lottie from "lottie-react";
import type { Contract } from "web3";
import type { Auction } from "../../models/auction";
import { toast } from "react-toastify";

import MyInput from "../../components/ui/MyInput";
import MyDialog from "../../components/MyDialog";
import Loading from "../../components/Loading";
import BidList from "../../components/bids/BidList";
import MakeBid from "../../components/bids/MakeBid";
import CopyClipboard from "../../components/CopyClipboard";
import LiveSign from "../../components/LiveSign";

import NotFoundLottie from "../../assets/lotties/notfound.json";
import EthereumLottie from "../../assets/lotties/diamond.json";

import web3 from "../../web3/web3";
import AuctionCont from "../../web3/auction";
import * as ethSocket from "../../sockets/eth.socket";
import { authSelector } from "../../state/auth.state";

function formatMessage(signer: string, ethers: string) {
  return `${signer.substring(0, 7)}... made a bid with the amount of ${ethers} ethers`;
}

const AuctionDetailPage = () => {
  const params = useParams();
  const [contract] = useState<Contract<any>>(AuctionCont.from(params.id!));
  const [accounts, setAccounts] = useState<string[]>([]);
  const [ethModalIsOpen, setEthModalIsOpen] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [processing, setProcessing] = useState(false);
  const [socketSize, setSocketSize] = useState(0);

  const authData = useRecoilValue(authSelector);

  const { data, error, isLoading, mutate } = useSWR<Auction, any, any>(params.id, getSumary);

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
    ethSocket.init(authData.accessToken!, (succ) => {
      if (succ) {
        ethSocket.joinRoom({ room: params.id! }, (size) => {
          setSocketSize(size);

          ethSocket.onNewBid((data) => {
            toast(formatMessage(data.signer, data.ethers), {
              type: "info"
            });

            mutate();
          });

          ethSocket.onNewUserJoined((data) => {
            setSocketSize(data.size);
            toast("someone joined!", { type: "info", autoClose: 2000 });
          });
        });

        return;
      }
    });

    return () => {
      ethSocket.disconnect((succ) => succ);
    };
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
      toast(error.message, { type: "error" });
    }
  }

  async function modalHandler() {
    try {
      const ethers = (document.getElementById("ethers") as HTMLInputElement).value;
      setEthModalIsOpen(false);

      if (isNaN(parseFloat(ethers))) {
        toast("incorrect input!", {
          type: "warning",
          position: "top-center",
          autoClose: 2000
        });
        return;
      }
      await makeBid(ethers);

      ethSocket.emitNewBid({ ethers, signer: accounts[0], room: params.id! });
      toast("success!", { type: "success", position: "top-center", autoClose: 2000 });
    } catch (error: any) {
      toast(error.message, { type: "error" });
    }
  }

  async function makeBid(ethers: string) {
    try {
      setProcessing(true);

      const signers = await web3.eth.getAccounts();
      const remain = await contract.methods
        .getAmountForBid(web3.utils.toWei(ethers, "ether"))
        .call({ from: signers[0] });

      await contract.methods.makeBid().send({
        value: String(remain),
        from: signers[0]
      });
      setProcessing(false);

      mutate();
    } catch (error: any) {
      setProcessing(false);
      return Promise.reject(error);
    }
  }

  async function withdraw() {
    try {
      const signers = await web3.eth.getAccounts();
      await contract.methods.withdraw().send({ from: signers[0] });
      mutate();
    } catch (error: any) {
      toast(error.message, { type: "error" });
    }
  }

  async function finishTheAuction() {
    try {
      const signers = await web3.eth.getAccounts();
      await contract.methods.finish().send({ from: signers[0] });
      mutate();
    } catch (error: any) {
      toast(error.message, { type: "error" });
    }
  }

  if (isLoading) {
    return <Loading visible />;
  }

  if (error) {
    return (
      <div className="flex w-full flex-1 items-center justify-center">
        <div className="container text-black dark:text-white">
          <div>{JSON.stringify(error, null, 2)}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-1">
      <div className="container my-10 flex flex-1 flex-col gap-20 lg:flex-row">
        <div className="flex flex-1 flex-col gap-8">
          <div className="flex items-center justify-between ">
            <div className="flex items-center gap-3">
              <div className="text-lg font-bold text-black dark:text-white lg:text-2xl">
                <h1 onClick={getAccounts}>
                  {data?.title} ({socketSize})
                </h1>
              </div>
            </div>

            {accounts[0] !== data?.lastBidder && accounts[0] !== data?.creator && (
              <div className="space-x-5">
                <button
                  onClick={withdraw}
                  className=" justify-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-200 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900">
                  withdraw
                </button>
              </div>
            )}

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

          <div className="text-gray-900 dark:text-white">
            <MakeBid
              key={Math.random()}
              onBid={() => setEthModalIsOpen(true)}
              secondsLeft={Number(data?.finishTime) - Math.floor(Date.now() / 1000)}
            />
          </div>

          <div className="flex animate-bounce items-center gap-3 rounded-lg border border-gray-200 p-5 text-gray-900 shadow dark:border-gray-700  dark:text-white">
            <LiveSign />

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
              <div className="mx-2 flex items-center gap-1 lg:gap-3">
                {window.innerWidth > 400 ? (
                  <span className="text-blue-700 dark:text-white">
                    {data?.bids.at(-1)?.owner.substring(0, window.innerWidth < 400 ? 4 : 10)}
                    ...
                  </span>
                ) : (
                  "0x..."
                )}
                <span>
                  <CopyClipboard text={data?.bids.at(-1)?.owner} />
                  <span className="text-blue-700 dark:text-white"></span>
                </span>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2 text-gray-900 dark:text-white">
            <h5 className="mb-3 text-lg font-bold">Info:</h5>
            <div className="flex items-center gap-3">
              <span className="">Seller:&nbsp;&nbsp;&nbsp;</span>
              <div className="flex items-center gap-3">
                <span className="text-blue-700 dark:text-white">
                  {data?.creator.substring(0, Math.floor(window.innerWidth / 30))}...
                </span>
                <CopyClipboard text={data?.creator} />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="">Contract:&nbsp;</span>
              <div>
                <span className="text-blue-700 dark:text-white">
                  {data?._id.substring(0, Math.floor(window.innerWidth / 30))}...
                </span>
                <span className="ml-3">
                  <CopyClipboard text={data?._id} />
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="">Etherscan:</span>
              <a href="https://etherscan.io/" className="text-blue-600 hover:underline">
                view on etherscan
              </a>
            </div>

            <div className="flex items-center gap-3">
              <span className="">Created: &nbsp;</span>
              <span>{new Date(Number(data?.finishTime) * 1000).toDateString()}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-8">
          <div className="text-gray-900 dark:text-white">
            <h5 className="mb-3 text-lg font-bold">Bids:</h5>
            {data?.bids.length! > 0 ? (
              <BidList bids={data!.bids || []} />
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

          <div className="text-md mt-10 text-black dark:text-white">
            <h5 className="mb-3 text-lg font-bold">Description:</h5>
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum, dolor sit
              amet consectetur adipisicing elit. Id, corrupti suscipit qui quidem minima nulla?
            </div>
          </div>
        </div>
      </div>

      <MyDialog
        open={ethModalIsOpen}
        title=""
        hasLeftButton
        hasRightButton
        onLeftButtonClick={() => setEthModalIsOpen(false)}
        onRightButtonClick={modalHandler}
        leftButtonText="cancel"
        rightButtonText="confirm">
        <div className="my-5">
          <MyInput
            type="number"
            id="ethers"
            step={0.001}
            min={0}
            label="Amount Price (in ETH)"
          />
        </div>
      </MyDialog>

      <MyDialog
        open={!!errorText}
        title="info!"
        hasLeftButton={false}
        hasRightButton
        onLeftButtonClick={() => null}
        onRightButtonClick={() => setErrorText("")}
        rightButtonText="ok, got it.">
        <div className="my-8 text-center text-black dark:text-white">
          <div>{errorText}</div>
        </div>
      </MyDialog>

      <MyDialog
        open={processing}
        title=""
        hasLeftButton={false}
        hasRightButton={false}
        onLeftButtonClick={() => null}
        onRightButtonClick={() => null}>
        <div className="flex h-full w-full items-center justify-center">
          <Lottie className="max-w-52" animationData={EthereumLottie} />
        </div>
      </MyDialog>
    </div>
  );
};

export default AuctionDetailPage;
