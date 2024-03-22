import useSWR from "swr";
import Loading from "../../components/Loading";

const ProfilePage = () => {
  const { data, isLoading, error } = useSWR("/api/account/profile");

  if (isLoading) {
    return <Loading visible />;
  }

  if (error) {
    return (
      <div className="flex w-full items-center justify-center">
        <div className="container flex flex-1 items-center justify-center">
          <div className="w-2/3 text-center text-xl font-bold text-black dark:text-white">
            {JSON.stringify(error, null, 2)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full items-center justify-center">
      <div className="container flex flex-1 items-center justify-center">
        <div className="border p-5 text-center text-xl font-bold text-black dark:text-white">
          <div className="mb-5">id: {data?.user?._id}</div>
          <div>email: {data?.user?.email}</div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
