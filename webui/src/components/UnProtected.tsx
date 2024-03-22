import { Link } from "react-router-dom";

import Lottie from "lottie-react";
import SafeLottie from "../assets/lotties/safe.json";

interface IProps {
  unmount: boolean;
  children: React.ReactNode;
}

const UnProtected: React.FC<IProps> = (props) => {
  if (props.unmount) {
    return (
      <div className="flex w-full items-center justify-center bg-white dark:bg-gray-700">
        <div className="container flex flex-1 flex-col items-center justify-center gap-5">
          <div className="w-full max-w-md">
            <Lottie animationData={SafeLottie} />
          </div>
          <div className="text-center font-bold text-black dark:text-white">
            <div className="text-md lg:text-lg">You have already logged in.</div>
          </div>
          <Link
            to="/"
            className=" justify-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-200 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900">
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  return props.children;
};

export default UnProtected;
