import { useState } from "react";
import CountDown from "../CountDown";
import { ClockIcon } from "@heroicons/react/24/outline";

interface IProps {
  onBid: () => void;
  secondsLeft: number;
}

const MakeBid: React.FC<IProps> = (props) => {
  const [timeEnded, setTimeEnded] = useState(false);

  function makeBid() {
    props.onBid();
  }

  return (
    <div className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow dark:border-gray-700 dark:bg-gray-800 sm:p-8">
      <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
        {timeEnded || props.secondsLeft <= 0 ? "Auction ended" : "Auction ends in"}
      </h5>
      <div className="my-10 flex items-center gap-5">
        <ClockIcon className="h-10 w-10" />
        <CountDown
          key={Math.random()}
          secondsLeft={props.secondsLeft}
          className="text-3xl font-extrabold tracking-tight lg:text-5xl"
          onFinish={() => setTimeEnded(true)}
        />
      </div>

      <button
        onClick={makeBid}
        disabled={timeEnded}
        className="inline-flex w-full justify-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:cursor-not-allowed dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900">
        Place a Bid
      </button>
    </div>
  );
};

export default MakeBid;
