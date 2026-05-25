import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Moon,
  Sun,
  ChevronDown,
} from "lucide-react";

import MultiStepForm
  from "../components/MultiStepForm";

import { GithubUser }
  from "../types/user";

interface Props {

  darkMode: boolean;

  setDarkMode: (
    value: boolean
  ) => void;
}

export default function Dashboard({

  darkMode,

  setDarkMode,
}: Props) {

  const [user, setUser] =
    useState<GithubUser | null>(
      null
    );

  const [loading, setLoading] =
    useState(true);

  const [openProfile, setOpenProfile] =
    useState(false);

  const profileRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {

    const fetchUser =
      async () => {

        try {

          const response =
            await fetch(
              `${import.meta.env.VITE_API_URL}/auth/me`,
              {
                credentials:
                  "include",
              }
            );

          const data =
            await response.json();

          if (data.success) {

            setUser(data.user);
          }

        } catch (error) {

          console.log(error);

        } finally {

          setLoading(false);
        }
      };

    fetchUser();

  }, []);

  // CLOSE DROPDOWN ON OUTSIDE CLICK

  useEffect(() => {

    const handleOutsideClick = (
      event: MouseEvent
    ) => {

      if (
        profileRef.current &&
        !profileRef.current.contains(
          event.target as Node
        )
      ) {

        setOpenProfile(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    return () => {

      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };

  }, []);

  // Add this function inside Dashboard component
  const handleLogout = async () => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
        credentials: "include",
      });
      window.location.href = "/";
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {

    return (

      <div
        className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-gray-100
        dark:bg-gray-950
      "
      >

        <div
          className="
          animate-spin
          rounded-full
          h-16
          w-16
          border-b-2
          border-black
          dark:border-white
        "
        />

      </div>
    );
  }

  return (

    <div
      className="
      min-h-screen
      bg-gray-100
      dark:bg-gray-950
      transition
    "
    >

      {/* NAVBAR */}

      <div
        className="
        bg-white
        dark:bg-gray-900
        border-b
        dark:border-gray-800
        px-10
        py-5
        flex
        justify-between
        items-center
        shadow-sm
      "
      >

        {/* LEFT */}

        <div>

          <h1
            className="
            text-3xl
            font-bold
            dark:text-white
          "
          >

            ML Deployment Platform

          </h1>

          <p
            className="
            text-gray-500
            dark:text-gray-400
            mt-1
          "
          >

            GitOps based ML deployment portal

          </p>

        </div>

        {/* PROFILE DROPDOWN */}

        <div
          className="relative"
          ref={profileRef}
        >

          <button
            onClick={() =>
              setOpenProfile(
                !openProfile
              )
            }

            className="
            flex
            items-center
            gap-3
            bg-gray-50
            dark:bg-gray-800
            border
            dark:border-gray-700
            px-4
            py-2
            rounded-2xl
            shadow-sm
            hover:shadow-md
            transition
          "
          >

            {user?.avatar && (

              <img
                src={user.avatar}

                alt="avatar"

                className="
                w-11
                h-11
                rounded-full
                border
              "
              />
            )}

            <ChevronDown
              size={18}
              className="
              dark:text-white
            "
            />

          </button>

          {/* DROPDOWN */}

          {openProfile && (
            <div className="
    absolute right-0 mt-3 w-80
    bg-white dark:bg-gray-900
    border dark:border-gray-700
    rounded-2xl shadow-2xl
    overflow-hidden z-50
  ">

              {/* USER INFO */}
              <div className="p-5 border-b dark:border-gray-700">
                <div className="flex items-center gap-4">
                  {user?.avatar && (
                    <img src={user.avatar} alt="avatar"
                      className="w-14 h-14 rounded-full" />
                  )}
                  <div>
                    <h3 className="font-bold text-lg dark:text-white">
                      {user?.username}
                    </h3>
                    <p className="text-sm text-gray-500">
                      GitHub Authenticated
                    </p>
                  </div>
                </div>
              </div>

              {/* DARK MODE */}
              <div className="p-4">
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="
          w-full flex items-center justify-between
          bg-gray-50 dark:bg-gray-800
          hover:bg-gray-100 dark:hover:bg-gray-700
          transition p-4 rounded-xl
        "
                >
                  <div className="flex items-center gap-3">
                    {darkMode ? (
                      <Sun size={20} className="text-yellow-400" />
                    ) : (
                      <Moon size={20} className="text-gray-700" />
                    )}
                    <span className="font-medium dark:text-white">
                      Enable Dark Mode
                    </span>
                  </div>
                  <div className={`w-12 h-6 rounded-full transition relative
          ${darkMode ? "bg-green-500" : "bg-gray-300"}`}>
                    <div className={`absolute top-1 w-4 h-4 bg-white
            rounded-full transition
            ${darkMode ? "translate-x-7" : "translate-x-1"}`}
                    />
                  </div>
                </button>
              </div>

              {/* LOGOUT */}
              <div className="px-4 pb-4">
                <button
                  onClick={handleLogout}
                  className="
          w-full flex items-center gap-3
          bg-red-50 dark:bg-red-900/20
          hover:bg-red-100 dark:hover:bg-red-900/40
          text-red-600 dark:text-red-400
          transition p-4 rounded-xl font-medium
        "
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                  Logout
                </button>
              </div>

            </div>
          )}

        </div>

      </div>

      {/* MAIN CONTENT */}

      <div className="p-10">

        <MultiStepForm
          user={user}
        />

      </div>

    </div>
  );
}