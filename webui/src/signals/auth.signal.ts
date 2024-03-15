import { signal, computed } from "@preact/signals-react";

export const authData = signal({ user: null, accessToken: "" });
export const isLoggedIn = computed(() => !!authData.value.user);

export type AuthDataType = typeof authData;
