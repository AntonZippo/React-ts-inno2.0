import { Outlet } from "@tanstack/react-router";
import "./App.css";
import Header from "./components/Header/Headex";
import { useState } from "react";

function App() {
  const [isDark, setIsDark] = useState(false);
  const toggleTheme = () => {
    if (isDark) {
      setIsDark(false);
    } else {
      setIsDark(true);
    }
  };
  return (
    <div className={isDark ? "dark" : ""}>
      <div className="dark:bg-gray-900">
        <div className="min-h-screen flex flex-col w-[95vw] max-w-7xl m-auto">
          <Header toggleTheme={toggleTheme}></Header>
          <main className="flex-1 p-4">
            <Outlet />
          </main>

          <footer className="bg-gray-100 text-center rounded-md  shadow p-4 italiс dark:bg-gray-800 dark:text-white">
            Product company 2.0 | About | 2026{" "}
          </footer>
        </div>
      </div>
    </div>
  );
}

export default App;
