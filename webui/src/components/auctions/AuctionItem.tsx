import { Link } from "react-router-dom";
import type { Auction } from "../../models/auction";

interface IProps {
  auction: Auction;
}

const AuctionItem: React.FC<IProps> = (props) => {
  return (
    <div className="w-full max-w-sm rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800">
      <div className="px-5 pb-5">
        <div className="my-5">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {props.auction.title}
          </h5>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">
            {props.auction.basePrice} ETH
          </span>
          <Link
            to={`/auctions/${props.auction._id}`}
            className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            view
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuctionItem;
