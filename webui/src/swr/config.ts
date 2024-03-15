import type { SWRConfiguration } from "swr";
import { fetcher } from "./fetcher";

export const defaultValues: SWRConfiguration = {
  revalidateIfStale: true,
  revalidateOnMount: true,
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
  refreshWhenHidden: false,
  refreshWhenOffline: false,
  shouldRetryOnError: true,
  dedupingInterval: 2000,
  onError(err, _key, _config) {
    if (err?.status !== 403 && err?.status !== 404) {
      return;
    }
  },
  onErrorRetry(err, key, _config, revalidate, { retryCount }) {
    if (key === "/api/auth/user") return;
    if (err.status === 404) return;
    if (retryCount >= 2) return;

    setTimeout(() => revalidate({ retryCount }), 5000);
  },
  fetcher: fetcher
};

// errorRetryInterval = 5000;
// errorRetryCount
