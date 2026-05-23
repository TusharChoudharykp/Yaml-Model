import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import {
  useEffect,
  useState,
} from "react";

import Login from "./pages/Login";

import Dashboard from "./pages/Dashboard";

function App() {

  const [darkMode, setDarkMode] =
    useState(false);

  useEffect(() => {

    if (darkMode) {

      document.documentElement
        .classList.add("dark");

    } else {

      document.documentElement
        .classList.remove("dark");
    }

  }, [darkMode]);

  return (

    <div
      className="
      min-h-screen
      bg-gray-100
      dark:bg-gray-950
      transition
    "
    >

      <BrowserRouter>

        <Routes>

          <Route
            path="/"
            element={<Login />}
          />

          <Route
            path="/dashboard"

            element={

              <Dashboard
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              />
            }
          />

        </Routes>

      </BrowserRouter>

    </div>
  );
}

export default App;