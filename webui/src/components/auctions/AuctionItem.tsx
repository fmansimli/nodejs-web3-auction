import { Link } from "react-router-dom";
import web3 from "../../web3/web3";
import type { Auction } from "../../models/auction";
import LiveSign from "../LiveSign";

interface IProps {
  auction: Auction;
}

const AuctionItem: React.FC<IProps> = ({ auction }) => {
  return (
    <div className="w-full rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800">
      <div className="px-5 pb-5">
        <div className="my-5 flex items-center gap-5">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {auction.title}
          </h5>
          {Number(auction.finishTime) * 1000 > Date.now() && (
            <div>
              <LiveSign />
            </div>
          )}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">
            {web3.utils.fromWei(auction.basePrice, "ether")} ETH
          </span>
          <Link
            to={`/auctions/${auction._id}`}
            className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            view
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuctionItem;
