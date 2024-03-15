import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SWRConfig } from "swr";

import Navbar from "./components/_common/Navbar";
import Footer from "./components/_common/Footer";

import HomePage from "./pages/HomePage";
import SignInPage from "./pages/auth/SignInPage";
import SignUpPage from "./pages/auth/SignUpPage";
import NotFoundPage from "./pages/NotFoundPage";
import AboutPage from "./pages/AboutPage";

import { authData } from "./signals/auth.signal";
import { defaultValues } from "./swr/config";

function App() {
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

  console.log("rendering app.tsx...");

  return (
    <BrowserRouter>
      <SWRConfig value={defaultValues}>
        <div className="flex min-h-screen w-screen flex-col bg-white font-mono dark:bg-gray-900">
          <Navbar authData={authData} />
          <main className="flex w-screen flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/auth/signin" element={<SignInPage />} />
              <Route path="/auth/signup" element={<SignUpPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </SWRConfig>
    </BrowserRouter>
  );
}

export default App;
