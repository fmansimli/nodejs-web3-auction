import { HandRaisedIcon } from "@heroicons/react/24/outline";
import CopyClipboard from "../CopyClipboard";

import { Convert } from "../../utils/convert";
import type { Bid } from "../../models/bid";

interface IProps {
  bids: Bid[];
}

const BidList: React.FC<IProps> = (props) => {
  return (
    <div className="flex w-full flex-col gap-5">
      {props.bids?.map((bid, key) => (
        <div
          key={key}
          className="flex gap-3 rounded-md border bg-white p-3 shadow dark:bg-gray-800">
          <HandRaisedIcon className="h-8 w-8" />
          <div className="flex">
            <div className="leading-7">
              <span className="flex items-center">
                <span className="mr-3">{bid.owner.substring(0, 20)}...</span>
                <CopyClipboard text={bid.owner} />
              </span>
              made a bid with the amount of {Convert.toEth(String(bid.amount))} eth.
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BidList;
