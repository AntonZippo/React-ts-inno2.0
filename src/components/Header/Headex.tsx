import { Link } from "@tanstack/react-router";
import { useCart } from "../../context/CartContext";

function Header() {
  const { totalItems } = useCart();
  return (
    <>
      <header className=" flex bg-gray-100 shadow h-14 items-center p-4 sticky top-0 z-10">
        <nav className="flex justify-between items-center w-full">
          <Link
            to="/"
            className="italic font-bold underline text-gray-600 hover:text-indigo-600"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Product Company 2.0
          </Link>
          <div className="flex gap-6 ">
            <Link
              to="/"
              className="bg-gray-300 py-1 px-2 rounded-md  hover:bg-blue-500 hover:text-white"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              Home
            </Link>
            <Link
              to="/cart"
              className="bg-gray-300 py-1 px-2 rounded-md  hover:bg-blue-500 hover:text-white"
            >
              Cart : {totalItems}
            </Link>
          </div>
          <Link
            to="/login"
            className="bg-gray-300 py-1 px-2 rounded-md  hover:bg-blue-500 hover:text-white"
          >
            Login
          </Link>
        </nav>
      </header>
    </>
  );
}

export default Header;
