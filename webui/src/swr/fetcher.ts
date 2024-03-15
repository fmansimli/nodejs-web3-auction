import { http } from "../objects/http";

export const fetcher = (url: string) => http.get(url).then((res) => res.data);
