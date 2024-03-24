import { useState } from "react";
import { Link } from "react-router-dom";

import MyDialog from "../MyDialog";
import MyInput from "../ui/MyInput";
import MyTextArea from "../ui/MyTextArea";
import Alert from "../Alert";

import SingImg from "../../assets/images/sign.png";

interface IProps {
  onSubmit: (values: any) => Promise<void>;
}

const AuctionForm: React.FC<IProps> = (props) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  async function onSubmitHandle(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formdata = new FormData(event.currentTarget);
    const values = Object.fromEntries<any>(formdata);

    setMessage("");
    try {
      const lengthOfTitle = values?.title.trim().length;
      const _errors: string[] = [];

      if (lengthOfTitle < 5 || lengthOfTitle > 14) {
        const msg = "Lenght of title should be between 5 and 14.";
        _errors.push(msg);
      }

      if (isNaN(Number(values.basePrice))) {
        const msg = "Base price should be a number.";
        _errors.push(msg);
      }

      const lengthOfDesc = values?.desc.trim().length;

      if (lengthOfDesc < 5 || lengthOfDesc > 50) {
        const msg = "Lenght of description should be between 5 and 50";
        _errors.push(msg);
      }

      if (_errors.length > 0) {
        setErrors(_errors);
        return;
      }

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
      <Link
        to="/"
        className="mb-6 flex items-center text-2xl font-semibold text-gray-900 dark:text-white">
        <img className="h-20" src={SingImg} alt="logo" />
      </Link>
      <div className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 md:mt-0 xl:p-0">
        <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
            Create a new Auction
          </h1>
          <form noValidate onSubmit={onSubmitHandle} className="space-y-4 md:space-y-6">
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
              step={0.001}
              defaultValue={0}
              min={0}
              label="Base Price (in ETH)"
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
          {message && (
            <div className="mt-8 text-red-800">
              <Alert>{message}</Alert>
            </div>
          )}
        </div>
      </div>
      <MyDialog
        open={errors.length > 0}
        title="Attention!"
        hasLeftButton={false}
        rightButtonText="close"
        hasRightButton
        onRightButtonClick={() => setErrors([])}
        onLeftButtonClick={() => null}>
        <div className="my-5 flex h-full w-full items-center justify-center">
          <ul className="text-black dark:text-white">
            {errors.map((err, key) => (
              <li key={key}>{err}</li>
            ))}
          </ul>
        </div>
      </MyDialog>
    </div>
  );
};

export default AuctionForm;
