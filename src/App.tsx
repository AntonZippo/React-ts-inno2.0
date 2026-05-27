import { Outlet } from "@tanstack/react-router";
import "./App.css";
import Header from "./components/Header/Headex";

function App() {
  return (
    <div className="min-h-screen flex flex-col w-[95vw] max-w-7xl m-auto">
      <Header></Header>
      <main className="flex-1 p-4">
        <Outlet />
      </main>

      <footer className="bg-gray-100 text-center shadow p-4 italic">
        Product company 2.0 | About | 2026{" "}
      </footer>
    </div>
  );
}

export default App;
