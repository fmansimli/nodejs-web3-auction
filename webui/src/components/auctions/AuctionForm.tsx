import { useState } from "react";
import MyInput from "../ui/MyInput";
import MyTextArea from "../ui/MyTextArea";

interface IProps {
  onSubmit: (values: any) => Promise<void>;
}

const AuctionForm: React.FC<IProps> = (props) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function onSubmitHandle(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formdata = new FormData(event.currentTarget);
    const values = Object.fromEntries(formdata);

    try {
      setMessage("");
      setLoading(true);
      await props.onSubmit(values);
    } catch (error: any) {
      setMessage(error.message);
    }
    setLoading(false);
  }

  return (
    <div className="flex w-full flex-col items-center">
      <a
        href="#"
        className="mb-6 flex items-center text-2xl font-semibold text-gray-900 dark:text-white">
        <img
          className="mr-2 h-8 w-8"
          src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
          alt="logo"
        />
        Flowbite
      </a>
      <div className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 md:mt-0 xl:p-0">
        <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
            Create a new Auction
          </h1>
          <form onSubmit={onSubmitHandle} className="space-y-4 md:space-y-6">
            <MyInput
              id="title"
              placeholder="enter title"
              name="title"
              label="Title"
              autoComplete="off"
            />

            <MyInput
              id="basePrice"
              placeholder="base price (eth)"
              name="basePrice"
              type="number"
              label="Base Price"
              autoComplete="off"
            />

            <MyTextArea
              id="desc"
              placeholder="write description"
              name="desc"
              label="Description"
              autoComplete="off"
            />
            <button
              type="submit"
              className="w-full rounded-lg bg-primary-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
              {loading ? "processing..." : "Create"}
            </button>
          </form>
          <div className="my-5 text-red-800">{message}</div>
        </div>
      </div>
    </div>
  );
};

export default AuctionForm;
