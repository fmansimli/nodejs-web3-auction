import { useState } from "react";
import { Link } from "react-router-dom";

import MyDialog from "../MyDialog";
import MyInput from "../ui/MyInput";
import Alert from "../Alert";
import SingImg from "../../assets/images/sign.png";

interface IProps {
  onSubmit: (values: any) => Promise<void>;
}

const SignInForm: React.FC<IProps> = (props) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  async function onSubmitHandle(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formdata = new FormData(event.currentTarget);
    const values = Object.fromEntries<any>(formdata);

    try {
      setMessage("");

      const lengthOfPass = values?.password.trim().length;
      const _errors: string[] = [];

      if (lengthOfPass < 8 || lengthOfPass > 20) {
        const msg = "Lenght of password should be between 8 and 20.";
        _errors.push(msg);
      }

      const pattern = /[\w]{2,}@[A-Za-z0-9]{3,}\.[A-Za-z]{2,}/;
      if (!pattern.test(values.email || "")) {
        const msg = "Invalid email address.";
        _errors.push(msg);
      }

      if (_errors.length > 0) {
        setErrors(_errors);
        return;
      }

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
            Sign in to your account
          </h1>
          <form onSubmit={onSubmitHandle} className="space-y-4 md:space-y-6">
            <MyInput
              id="email"
              placeholder="example@example.com"
              name="email"
              label="Your email"
              autoComplete="off"
            />

            <MyInput
              id="password"
              placeholder="••••••••"
              name="password"
              type="password"
              label="Password"
              autoComplete="off"
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
              <Link
                to="/auth/forgot-password"
                className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">
                forgot password?
              </Link>
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-primary-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
              {loading ? "processing..." : "Sign in"}
            </button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Don’t have an account yet? &nbsp;
              <Link
                to="/auth/signup"
                className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                Sign up
              </Link>
            </p>
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

export default SignInForm;
