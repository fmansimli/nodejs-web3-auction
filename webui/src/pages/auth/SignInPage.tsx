import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

import { http } from "../../objects/http";

import SignInForm from "../../components/auth/SignInForm";
import { authState } from "../../state/auth.state";

const SignInPage = () => {
  const navigate = useNavigate();
  const [_auth, setAuth] = useRecoilState(authState);

  async function onSubmitHanlder(values: any) {
    try {
      const { data } = await http.post("/api/auth/signin", values);
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
    <div className="flex w-full items-center justify-center">
      <div className="container flex flex-1 items-center justify-center">
        <div className="w-full max-w-md">
          <SignInForm onSubmit={onSubmitHanlder} />
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
