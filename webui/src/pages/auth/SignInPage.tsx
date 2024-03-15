import { useNavigate } from "react-router-dom";
import { http } from "../../objects/http";

import SignInForm from "../../components/auth/SignInForm";
import { authData } from "../../signals/auth.signal";

const SignInPage = () => {
  const navigate = useNavigate();

  async function onSubmitHanlder(values: any) {
    try {
      const { data } = await http.post("/api/auth/signin", values);
      const { user, auth } = data;
      authData.value = { user, accessToken: auth.accessToken };

      return navigate("/");
    } catch (error: any) {
      return Promise.reject(error);
    }
  }

  return (
    <div className="flex w-full items-center justify-center bg-white dark:bg-gray-700">
      <div>
        <SignInForm onSubmit={onSubmitHanlder} />
      </div>
    </div>
  );
};

export default SignInPage;
