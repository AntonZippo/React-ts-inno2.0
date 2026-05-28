import { Link } from "@tanstack/react-router";
import { useCart } from "../../context/CartContext";

interface HeaderProps {
  toggleTheme: () => void;
}
function Header({ toggleTheme }: HeaderProps) {
  const { totalItems } = useCart();
  return (
    <>
      <header className="flex bg-gray-100 border-b border-gray-300 items-center p-4 sticky top-0 z-10 dark:bg-gray-800 dark:text-white ">
        <nav className="flex justify-between items-center w-full max-sm:flex-wrap max-sm:gap-2 font-medium">
          <Link
            to="/"
            className="italic font-bold underline text-gray-600 hover:text-indigo-500 dark:text-white dark:hover:text-amber-200"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Product Company 2.0
          </Link>
          <div className="flex gap-6 ">
            <Link
              to="/"
              className="bg-gray-100 text-cyan-700 border border-cyan-700 py-2 px-3 rounded-md  hover:bg-cyan-700 hover:text-white dark:bg-gray-600 dark:text-white dark:border-none"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              Home
            </Link>
            <Link
              to="/cart"
              className="bg-gray-100 text-cyan-700 border border-cyan-700 py-2 px-3 rounded-md  hover:bg-cyan-700 hover:text-white dark:bg-gray-600 dark:border-none dark:text-white"
            >
              Cart : {totalItems}
            </Link>
            <button
              className="bg-gray-100 text-cyan-700 border border-cyan-700  dark:bg-gray-600 dark:text-white py-2 px-3 rounded-md  hover:bg-cyan-700 hover:text-white cursor-pointer dark:border-none"
              onClick={toggleTheme}
            >
              ☀️/🌙
            </button>
          </div>
          <Link
            to="/login"
            className="bg-gray-100 text-cyan-700 border border-cyan-700 py-2 px-3 rounded-md  hover:bg-cyan-700 hover:text-white dark:bg-gray-600 dark:border-none dark:text-white"
          >
            Login
          </Link>
        </nav>
      </header>
    </>
  );
}

export default Header;
