import SignInForm from "../../components/auth/SignInForm";

const SignInPage = () => {
  return (
    <div className="flex w-full items-center justify-center bg-white dark:bg-gray-700">
      <div>
        <SignInForm />
      </div>
    </div>
  );
};

export default SignInPage;
