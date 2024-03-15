import { useState } from "react";
import MyInput from "../ui/MyInput";

interface IProps {
  onSubmit: (values: any) => Promise<void>;
}

const SignInForm: React.FC<IProps> = (props) => {
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
    <section>
      <div className="mx-auto flex flex-col items-center justify-center">
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
        <div className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
              Sign in to your account
            </h1>
            <form onSubmit={onSubmitHandle} className="space-y-4 md:space-y-6">
              <MyInput
                id="email"
                placeholder="name@company.com"
                name="email"
                label="Your email"
                autoComplete="off"
                defaultValue="fmansimli@test.com"
                onChange={() => null}
              />

              <MyInput
                id="password"
                placeholder="••••••••"
                name="password"
                label="Password"
                autoComplete="off"
                onChange={() => null}
                defaultValue="MyExtremePassword"
              />
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex h-5 items-center">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="focus:ring-3 h-4 w-4 rounded border border-gray-300 bg-gray-50 focus:ring-primary-300 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">
                  forgot password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-primary-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                {loading ? "processing..." : "Sign in"}
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet? &nbsp;
                <a
                  href="#"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                  Sign up
                </a>
              </p>
            </form>
            <div className="my-5 text-red-800">{message}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignInForm;
