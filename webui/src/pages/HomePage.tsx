import Skeleton from "../components/Skeleton";

const HomePage = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-5 bg-white dark:bg-gray-800">
      <div className="h-1/2 w-1/2">
        <Skeleton />
      </div>
    </div>
  );
};

export default HomePage;
