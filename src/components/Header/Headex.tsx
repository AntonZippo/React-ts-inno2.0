import { Link } from "@tanstack/react-router";
import { useCart } from "../../context/CartContext";

interface HeaderProps {
  toggleTheme: () => void;
}
function Header({ toggleTheme }: HeaderProps) {
  const { totalItems } = useCart();
  return (
    <>
      <header className=" flex bg-gray-100 shadow rounded-md h-14 items-center p-4 sticky top-0 z-10 dark:bg-gray-800 dark:text-white">
        <nav className="flex justify-between items-center w-full">
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
              className="bg-gray-300 py-1 px-2 rounded-md  hover:bg-blue-500 hover:text-white dark:bg-gray-600"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              Home
            </Link>
            <Link
              to="/cart"
              className="bg-gray-300 py-1 px-2 rounded-md  hover:bg-blue-500 hover:text-white dark:bg-gray-600"
            >
              Cart : {totalItems}
            </Link>
            <button
              className="bg-gray-300 dark:bg-gray-600 dark:text-white py-1 px-2 rounded-md  hover:bg-blue-500 cursor-pointer"
              onClick={toggleTheme}
            >
              ☀️/🌙
            </button>
          </div>
          <Link
            to="/login"
            className="bg-gray-300 py-1 px-2 rounded-md  hover:bg-blue-500 hover:text-white dark:bg-gray-600"
          >
            Login
          </Link>
        </nav>
      </header>
    </>
  );
}

export default Header;
