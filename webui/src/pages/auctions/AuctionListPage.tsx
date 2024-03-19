import useSWR from "swr";
import AuctionItem from "../../components/auctions/AuctionItem";
import AuctionsSkeleton from "../../components/auctions/AuctionsSkeleton";
import factory from "../../web3/factory";
import AuctionCont from "../../web3/auction";
import type { Auction } from "../../models/auction";

const AuctionListPage = () => {
  const { data, error, isLoading } = useSWR<any>("/auctions", getList);

  async function getList() {
    const _auctions: string[] = await factory.methods.getAuctions().call();
    const promises = _auctions.map((address) =>
      AuctionCont.from(address).methods.getBasicInfo().call()
    );
    return Promise.all(promises);
  }

  if (isLoading) {
    return (
      <div className="container my-6 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {new Array(window.innerWidth < 500 ? 6 : 20).fill(0).map((_, key) => (
          <AuctionsSkeleton key={key} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex w-full flex-1 items-center justify-center">
        <div className="text-xl text-red-600">
          <div>{error.message}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-1 flex-col">
      {data?.length > 0 ? (
        <div className="container my-6 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data.map((auction: Auction) => (
            <AuctionItem key={auction._id} auction={auction} />
          ))}
        </div>
      ) : (
        <div className="flex w-full flex-1 items-center justify-center">
          <div className="text-red-500">no data!</div>
        </div>
      )}
    </div>
  );
};

export default AuctionListPage;
