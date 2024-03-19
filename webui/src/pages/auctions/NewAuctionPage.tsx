import AuctionForm from "../../components/auctions/AuctionForm";
import factory from "../../web3/factory";

const NewAuctionPage = () => {
  async function submitHandle(_values: any): Promise<void> {
    try {
      const owner = await factory.methods.factoryOwner().call();
      alert(owner);

      return Promise.resolve();
    } catch (error: any) {
      console.log(error);

      alert(error.message);
    }
  }

  return (
    <div className="flex flex-1">
      <div className="container my-8 flex flex-1 items-center justify-center">
        <div className="w-full max-w-md">
          <AuctionForm onSubmit={submitHandle} />
        </div>
      </div>
    </div>
  );
};

export default NewAuctionPage;
