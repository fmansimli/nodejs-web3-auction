const AuctionsSkeleton = () => {
  return (
    <div className="animate-pulse rounded-md border border-blue-300 px-4 py-2 shadow">
      <div className="flex h-full w-full flex-col justify-around gap-4">
        <div className="my-2 rounded-md bg-slate-600 py-2" />
        <div className="flex w-full items-center justify-between">
          <div className="rounded-md bg-slate-600 px-10 py-3" />
          <div className="rounded-md bg-slate-600 px-14 py-5" />
        </div>
      </div>
    </div>
  );
};

export default AuctionsSkeleton;
