import { useState } from "react";
import { ClockIcon } from "@heroicons/react/24/outline";

interface IProps {
  onBid: () => Promise<void>;
}

const MakeBid: React.FC<IProps> = (props) => {
  const [processing, setProcessing] = useState(false);

  async function makeBid() {
    try {
      setProcessing(true);
      await props.onBid();
    } catch (error) {
      //
    } finally {
      setProcessing(false);
    }
  }

  return (
    <div className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow dark:border-gray-700 dark:bg-gray-800 sm:p-8">
      <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
        Auction ends in
      </h5>
      <div className="my-10 flex items-center gap-5">
        <ClockIcon className="h-10 w-10" />
        <span className="text-3xl font-extrabold tracking-tight lg:text-5xl">00:49:12:34</span>
      </div>

      <button
        onClick={makeBid}
        disabled={processing}
        className="inline-flex w-full justify-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-200 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900">
        {processing ? "Processing...." : "Place a Bid"}
      </button>
    </div>
  );
};

export default MakeBid;
