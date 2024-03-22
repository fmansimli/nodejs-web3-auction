import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { SWRConfig } from "swr";

import Navbar from "./components/_common/Navbar";
import Loading from "./components/Loading";

import HomePage from "./pages/HomePage";
import SignInPage from "./pages/auth/SignInPage";
import SignUpPage from "./pages/auth/SignUpPage";
import ForgetPasswordPage from "./pages/auth/ForgetPasswordPage";
import AuctionDetailPage from "./pages/auctions/AuctionDetailPage";
import NewAuctionPage from "./pages/auctions/NewAuctionPage";
import NotFoundPage from "./pages/NotFoundPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import ProfilePage from "./pages/account/ProfilePage";
import SettingsPage from "./pages/account/SettingsPage";

import { defaultValues } from "./swr/config";
import { authQuery, authState } from "./state/auth.state";
import Protected from "./components/Protected";
import UnProtected from "./components/UnProtected";

function App() {
  const resp = useRecoilValueLoadable(authQuery);
  const [authData, setAuth] = useRecoilState(authState);

  useEffect(() => {
    if (resp.state === "hasValue") {
      setAuth(resp.contents);
    }
  }, [resp.state]);

  function onMatchMedia() {
    const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const theme = localStorage.getItem("theme");

    if (theme === "dark" || (!theme && darkQuery.matches)) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }

  onMatchMedia();

  function logoutHandler(): void {
    localStorage.removeItem("token");
    setAuth({ user: null, initialized: true, accessToken: "" });
  }

  return (
    <BrowserRouter>
      <SWRConfig value={defaultValues}>
        <div className="flex min-h-screen w-screen flex-col bg-white font-mono dark:bg-gray-800">
          {authData.initialized ? (
            <>
              <div className="sticky top-0 w-full">
                <Navbar authData={authData} onLogout={logoutHandler} />
              </div>
              <main className="flex w-screen flex-1">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route
                    path="/auth/signin"
                    element={
                      <UnProtected unmount={!!authData.user}>
                        <SignInPage />
                      </UnProtected>
                    }
                  />
                  <Route
                    path="/auth/signup"
                    element={
                      <UnProtected unmount={!!authData.user}>
                        <SignUpPage />
                      </UnProtected>
                    }
                  />

                  <Route
                    path="/auth/forgot-password"
                    element={
                      <UnProtected unmount={!!authData.user}>
                        <ForgetPasswordPage />
                      </UnProtected>
                    }
                  />

                  <Route
                    path="/auctions/new"
                    element={
                      <Protected mount={!!authData.user}>
                        <NewAuctionPage />
                      </Protected>
                    }
                  />

                  <Route
                    path="/account/profile"
                    element={
                      <Protected mount={!!authData.user}>
                        <ProfilePage />
                      </Protected>
                    }
                  />

                  <Route
                    path="/account/settings"
                    element={
                      <Protected mount={!!authData.user}>
                        <SettingsPage />
                      </Protected>
                    }
                  />

                  <Route path="/auctions/:id" element={<AuctionDetailPage />} />

                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </main>
            </>
          ) : (
            <Loading visible />
          )}
        </div>
      </SWRConfig>
    </BrowserRouter>
  );
}

export default App;
