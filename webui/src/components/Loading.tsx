import Lottie from "lottie-react";
import EthLottie from "../assets/lotties/diamond.json";

interface IProps {
  visible: boolean;
}

const Loading: React.FC<IProps> = (_props) => {
  return (
    <div className="flex w-full flex-1 items-center justify-center bg-white dark:bg-gray-700">
      <div className="container flex flex-1 items-center justify-center">
        <div className="max-w-md lg:max-w-lg">
          <Lottie animationData={EthLottie} />
        </div>
      </div>
    </div>
  );
};

export default Loading;
