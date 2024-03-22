import { useState } from "react";
import { Link } from "react-router-dom";

import MyInput from "../ui/MyInput";
import Alert from "../Alert";
import SingImg from "../../assets/images/sign.png";

interface IProps {
  onSubmit: (values: any) => Promise<void>;
}

const SignUpForm: React.FC<IProps> = (props) => {
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
      <Link
        to="/"
        className="mb-6 flex items-center text-2xl font-semibold text-gray-900 dark:text-white">
        <img className="h-20" src={SingImg} alt="logo" />
      </Link>
      <div className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 md:mt-0 xl:p-0">
        <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
            Sign up
          </h1>
          <form onSubmit={onSubmitHandle} className="space-y-4 md:space-y-6">
            <MyInput
              id="email"
              placeholder="example@example.com"
              name="email"
              label="Your email"
              autoComplete="off"
              defaultValue="fmansimli@test.com"
            />

            <MyInput
              id="password"
              placeholder="••••••••"
              name="password"
              type="password"
              label="Password"
              autoComplete="off"
              defaultValue="MyExtremePassword"
            />
            <button
              type="submit"
              className="w-full rounded-lg bg-primary-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
              {loading ? "processing..." : "Sign up"}
            </button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              already have an account? &nbsp;
              <Link
                to="/auth/signin"
                className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                Sign in
              </Link>
            </p>
          </form>
          {message && (
            <div className="mt-5">
              <Alert>{message}</Alert>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
