import { atom, selector } from "recoil";
import { http } from "../objects/http";

interface IState {
  user: null | { email: string; _id: string };
  accessToken: string | null;
  initialized: boolean;
}

const defaultState: IState = {
  initialized: false,
  user: null,
  accessToken: ""
};

export const authState = atom({
  key: Math.random().toString(),
  default: defaultState
});

export const authSelector = selector({
  key: Math.random().toString(),
  get({ get }) {
    return get(authState);
  }
});

export const authQuery = selector({
  key: Math.random().toString(),
  async get() {
    let user;
    let token = localStorage.getItem("token");
    try {
      if (token) {
        const { data } = await http.get("/api/account/profile", {
          headers: {
            Authorization: "Bearer " + token
          }
        });
        user = data.user;
      }
    } catch (error) {
      localStorage.removeItem("token");
      token = "";
    }

    try {
      if (!token) {
        const { data } = await http.get("/api/auth/anonymous");
        token = data.auth.accessToken;
        user = data.user;
      }
    } catch (error) {
      return { ...defaultState, initialized: true };
    }

    http.defaults.headers["Authorization"] = "Bearer " + token;
    return { user, accessToken: token, initialized: true };
  }
});
