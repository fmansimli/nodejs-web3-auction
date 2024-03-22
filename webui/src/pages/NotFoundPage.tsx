import Lottie from "lottie-react";
import NotLottie from "../assets/lotties/404.json";

const NotFoundPage = () => {
  return (
    <div className="flex w-full items-center justify-center bg-white dark:bg-gray-700">
      <div className="container flex flex-1 items-center justify-center">
        <div className="w-full max-w-md">
          <Lottie animationData={NotLottie} />
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
