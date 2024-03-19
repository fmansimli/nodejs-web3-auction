import { useSearchParams } from "react-router-dom";
import useSWR from "swr";

import Pagination from "../components/Pagination";
import AuctionItem from "../components/auctions/AuctionItem";
import AuctionsSkeleton from "../components/auctions/AuctionsSkeleton";

const HomePage = () => {
  const [params, setParams] = useSearchParams({
    limit: window.innerWidth > 500 ? "20" : "6",
    page: "1"
  });

  const { data, isLoading, error } = useSWR(
    `/api/auctions?page=${params.get("page")}&limit=${params.get("limit")}`
  );

  function nextPage() {
    setParams((old) => ({
      page: String(+old.get("page")! + 1),
      limit: old.get("limit")!
    }));
  }

  function prevPage() {
    setParams((old) => {
      if (old.get("page") === "1") {
        return { page: "1", limit: old.get("limit")! };
      }
      return { page: String(+old.get("page")! - 1), limit: old.get("limit")! };
    });
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
      {data.auctions.length > 0 ? (
        <div className="container my-6 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data.auctions.map((auction: any) => (
            <AuctionItem key={auction._id} auction={auction} />
          ))}
        </div>
      ) : (
        <div className="flex w-full flex-1 items-center justify-center">
          <div className="text-red-500">no data!</div>
        </div>
      )}

      <div className="my-5 flex w-full justify-center">
        <Pagination
          onNext={nextPage}
          onPrev={prevPage}
          prevDisabled={params.get("page") === "1"}
          nextDisabled={data.meta.pageCount <= +params.get("page")!}
        />
      </div>
    </div>
  );
};

export default HomePage;
