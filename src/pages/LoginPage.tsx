import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { useAuth } from "../context/AuthContex";

function LoginPage() {
  const { login } = useAuth();
  const UserNameRef = useRef<HTMLInputElement>(null);
  const PasswrodRef = useRef<HTMLInputElement>(null);
  let userName = "";
  let password = "";

  useEffect(() => {
    UserNameRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(userName, password);
    userName = "";
    password = "";
    if (UserNameRef.current) UserNameRef.current.value = "";
    if (PasswrodRef.current) PasswrodRef.current.value = "";
  };

  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center py-10 px-4 w-full max-w-7xl mx-auto box-border">
      <div className="bg-white p-6 md:p-9 rounded-2xl shadow-md border border-gray-200 w-full max-w-md">
        <h2 className="text-center text-xl md:text-2xl font-semibold mb-6">
          Enter an acc
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block mb-1 text-sm font-medium text-gray-600">
              UserName
            </label>
            <input
              ref={UserNameRef}
              onChange={(e) => (userName = e.target.value)}
              type="text"
              placeholder="UserName"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div className="mb-5">
            <label className="block mb-1 text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              ref={PasswrodRef}
              onChange={(e) => (password = e.target.value)}
              type="password"
              placeholder="••••••••"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-cyan-700 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 cursor-pointer"
          >
            Enter
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          Don't have an acc?
          <Link
            to="/login"
            className="text-cyan-700 hover:underline font-medium pl-2"
          >
            Register
          </Link>
          <p className="font-bold text-lg">(admin,123)</p>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
