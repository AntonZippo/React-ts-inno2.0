import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";

function LoginPage() {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login submitted");
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
              Email
            </label>
            <input
              ref={inputRef}
              type="email"
              placeholder="example@mail.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div className="mb-5">
            <label className="block mb-1 text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
          >
            Enter
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          Don't have an acc?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:underline font-medium"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
