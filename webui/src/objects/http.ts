import axios, { type AxiosError, type AxiosRequestConfig } from "axios";

export const http = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || "",
  headers: {
    Authorization: ""
  },
  timeout: 5000
});

http.interceptors.response.use(
  (resp) => {
    return resp;
  },
  async (error: AxiosError) => {
    const name = (error.response?.data as any).name;
    const httpCode = (error.response?.data as any).httpCode;

    if (httpCode === 401 && name === "TokenExpiredError") {
      try {
        //const bearerToken = error.config?.headers.get("authorization");
        const { data } = await axios.get("/api/auth/refresh", {
          baseURL: import.meta.env.VITE_BASE_URL,
          withCredentials: true
        });

        const newToken = data.auth.accessToken;
        localStorage.setItem("ethtoken", newToken);

        const config = error?.config;
        config?.headers.set("authorization", "Bearer " + newToken);
        http.defaults.headers["Authorization"] = "Bearer " + newToken;

        const resp = await axios(config as AxiosRequestConfig);
        return Promise.resolve(resp);
      } catch (error) {
        return Promise.reject(error);
      }
    }

    return Promise.reject(error.response?.data);
  }
);
