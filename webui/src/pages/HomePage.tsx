import { useMemo } from "react";
import { Link } from "react-router-dom";
import useSWR from "swr";
import Lottie from "lottie-react";

import AuctionItem from "../components/auctions/AuctionItem";
import AuctionsSkeleton from "../components/auctions/AuctionsSkeleton";
import factory from "../web3/factory";
import AuctionCont from "../web3/auction";

import { Auction } from "../models/auction";
import NotFoundLottie from "../assets/lotties/notfound.json";

const HomePage = () => {
  const { data, error, isLoading } = useSWR<any>("/auctions", getList);

  const auctions = useMemo(() => {
    return data
      ?.map((item: Auction) => {
        return new Auction({
          _id: item._id,
          title: item.title,
          basePrice: item.basePrice,
          finishTime: item.finishTime,
          blockTime: item.blockTime,
          completed: item.completed
        });
      })
      .reverse();
  }, [data]);

  async function getList() {
    const _auctions: string[] = await factory.methods.getAuctions().call();
    const promises = _auctions.map((address) =>
      AuctionCont.from(address).methods.getBasicInfo().call()
    );
    return Promise.all(promises);
  }

  if (isLoading) {
    return (
      <div className="container my-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {new Array(window.innerWidth < 500 ? 6 : 20).fill(0).map((_, key) => (
          <AuctionsSkeleton key={key} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex w-full flex-1 items-center justify-center">
        <div className="container text-xl text-red-600">
          <div>{error.message}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-1 flex-col">
      {data?.length > 0 ? (
        <div className="container my-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {auctions.map((auction: Auction) => (
            <AuctionItem key={auction._id} auction={auction} />
          ))}
        </div>
      ) : (
        <div className="container flex w-full flex-1 flex-col items-center justify-center gap-7">
          <div className="w-1/2 lg:w-1/4">
            <Lottie animationData={NotFoundLottie} />
          </div>
          <div className="w-3/4 text-center text-lg leading-7 text-black dark:text-white">
            No auctions available, start creating a new one.
          </div>
          <Link
            to="/auctions/new"
            className="justify-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-200 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900">
            new auction
          </Link>
        </div>
      )}
    </div>
  );
};

export default HomePage;
