import { useParams } from "react-router-dom";
import useSWR from "swr";
import Loading from "../../components/Loading";

const AuctionDetailPage = () => {
  const params = useParams();
  const { data, isLoading, error } = useSWR("/api/auctions/" + params.id);

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
    <div className="my-10 flex w-full flex-1">
      <div className="container flex flex-1">
        <div className="flex flex-col gap-10 text-red-500">
          <div>{JSON.stringify(data, null, 2)}</div>
        </div>
      </div>
    </div>
  );
};

export default AuctionDetailPage;
