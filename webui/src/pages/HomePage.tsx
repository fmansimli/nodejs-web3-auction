import { authData, isLoggedIn } from "../signals/auth.signal";

const HomePage = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-5 bg-white dark:bg-gray-800">
      <div className="h-1/2 w-1/2">
        <div className="text-red-600">
          <div>
            {isLoggedIn.value ? JSON.stringify(authData.value.user, null, 2) : "not logged in"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
