import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

import { http } from "../../objects/http";

import SignUpForm from "../../components/auth/SignUpForm";
import { authState } from "../../state/auth.state";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [_auth, setAuth] = useRecoilState(authState);

  async function onSubmitHanlder(values: any) {
    try {
      const { data } = await http.post("/api/auth/signup", values);
      const { user, auth } = data;

      setAuth({ user, initialized: true, accessToken: auth.accessToken });
      localStorage.setItem("token", auth.accessToken);
      http.defaults.headers["Authorization"] = "Bearer " + auth.accessToken;

      return navigate("/");
    } catch (error: any) {
      return Promise.reject(error);
    }
  }

  return (
    <div className="flex w-full items-center justify-center bg-white dark:bg-gray-700">
      <div className="container flex flex-1 items-center justify-center">
        <div className="w-full max-w-md">
          <SignUpForm onSubmit={onSubmitHanlder} />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
