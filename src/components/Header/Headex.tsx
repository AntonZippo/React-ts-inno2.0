import { Link } from "@tanstack/react-router";

function Header() {
  return (
    <>
      <header className="bg-white shadow p-4">
        <nav className="flex justify-between">
          <Link to="/">Product Company 2.0</Link>
          <div className="flex gap-10 mr-30">
            <Link to="/">Home</Link>
            <Link to="/cart">Cart</Link>
          </div>
          <Link to="/login">Login</Link>
        </nav>
      </header>
    </>
  );
}

export default Header;
