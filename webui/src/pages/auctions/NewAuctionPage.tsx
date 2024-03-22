import { useNavigate } from "react-router-dom";
import AuctionForm from "../../components/auctions/AuctionForm";
import factory from "../../web3/factory";
import web3 from "../../web3/web3";

const NewAuctionPage = () => {
  const navigate = useNavigate();

  async function submitHandle(values: any): Promise<void> {
    const { title, basePrice } = values || {};
    try {
      const signers = await web3.eth.getAccounts();

      const priceinWei = web3.utils.toWei(basePrice, "ether");
      await factory.methods.createAuction(title, priceinWei).send({
        value: web3.utils.toWei("0.002", "ether"),
        from: signers[0]
      });

      return navigate("/");
    } catch (error: any) {
      return Promise.reject(error);
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
