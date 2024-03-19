import { HandRaisedIcon } from "@heroicons/react/24/outline";
import type { Bid } from "../../models/bid";
import { Convert } from "../../utils/convert";

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
          <div className="flex flex-col gap-3">
            <div>
              @fmansimli made a bid with amount of {Convert.toEth(String(bid.amount))} eth.
            </div>
            <div>May 28, 2024 11:45 PM</div>
          </div>
          <div></div>
        </div>
      ))}
    </div>
  );
};

export default BidList;
