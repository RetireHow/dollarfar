// AdminLogin.tsx

import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState, FormEvent, ChangeEvent } from "react";
import { baseUrl } from "../../api/apiConstant";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const fetchAdmin = async (email: string, password: string) => {
  const res = await fetch(`${baseUrl}/admin/login-admin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  return data;
};

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setError("");
    // Simulate login or call actual API
    setLoading(true);
    const result = await fetchAdmin(email, password);
    setLoading(false);
    if (result?.success) {
      localStorage.setItem("email", result?.data?.email);
      localStorage.setItem("name", result?.data?.name);
      toast.success("Login success!");
      navigate("/admin-dashboard");
    } else {
      setLoading(false);
      toast.error("Login failed : You are not an authenticated user.");
    }
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className="py-[2rem] min-h-screen flex items-start justify-center bg-gray-100 dark:bg-neutral-900 px-4">
      <div className="max-w-md w-full bg-white dark:bg-neutral-900 p-8 rounded-lg shadow-md dark:border-[1px] dark:border-gray-500">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
          Admin Login
        </h2>
        {error && (
          <div className="mb-4 text-red-600 text-sm text-center">{error}</div>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 dark:text-white mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={handleEmailChange}
              placeholder="admin@example.com"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 dark:text-white mb-1"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={isVisible ? "text" : "password"}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Enter password"
                required
              />
              {isVisible ? (
                <Icon
                  onClick={() => setIsVisible(!isVisible)}
                  className="absolute top-[6px] right-2 text-[1.8rem] text-[#CCCCCC] cursor-pointer"
                  icon="mdi:eye-off"
                />
              ) : (
                <Icon
                  onClick={() => setIsVisible(!isVisible)}
                  className="absolute top-[6px] right-2 text-[1.8rem] text-[#CCCCCC] cursor-pointer"
                  icon="mdi:eye"
                />
              )}
            </div>
            <Link to="/send-otp">
              <p className="text-right mt-1 hover:underline cursor-pointer">
                Forgot password? Reset
              </p>
            </Link>
          </div>
          <button
            type="submit"
            disabled={loading ? true : false}
            className={`w-full text-white py-2 rounded-md hover:bg-blue-700 dark:hover:bg-neutral-700 transition flex justify-center items-center h-[45px] ${
              loading
                ? "bg-blue-300 hover:bg-blue-300 dark:bg-neutral-600 dark:hover:bg-neutral-600"
                : "bg-blue-600 dark:bg-neutral-700"
            }`}
          >
            {loading ? (
              <Icon
                icon="eos-icons:three-dots-loading"
                width="30"
                height="30"
              />
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
