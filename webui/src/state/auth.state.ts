import { atom, selector } from "recoil";
import { http } from "../objects/http";

interface IState {
  user: null | { email: string; _id: string };
  accessToken: string;
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
    try {
      const accessToken = localStorage.getItem("token");

      if (!accessToken) {
        return { ...defaultState, initialized: true };
      }
      http.defaults.headers["Authorization"] = "Bearer " + accessToken;

      const { data } = await http.get("/api/account/profile");
      return { user: data.user, initialized: true, accessToken };
    } catch (error) {
      return { ...defaultState, initialized: true };
    }
  }
});
