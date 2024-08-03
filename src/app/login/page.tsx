"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

const LoginPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false); //for learning purposes

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onLogin = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/users/login", user);

      console.log("Login success", response.data);
      toast.success("Login Successful!");
      router.push("/profile");
    } catch (error: any) {
      console.log("Login failed: ", error.message);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex justify-center items-center w-full h-[100vh]">
      <div className="w-[25rem] text-center text-2xl p-8 bg-slate-500 rounded-2xl">
        <h2 className="mb-4">{isLoading ? "Processing" : "Login"}</h2>
        <hr />
        <div className="text-sm flex flex-col gap-2 mt-4">
          <label htmlFor="email" className="text-start mt-2">
            Email
          </label>
          <input
            id="email"
            type="text"
            value={user.email}
            placeholder="Enter email"
            className="p-2 rounded-sm  text-black"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />

          <label htmlFor="password" className="text-start mt-2">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={user.password}
            placeholder="Enter password"
            className="p-2 rounded-sm text-black"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />

          {/* Buttons */}
          <button
            className="my-4 bg-black px-4 py-2 rounded-lg"
            onClick={onLogin}
          >
            {buttonDisabled ? "Fill all fields" : "Login"}
          </button>
          <Link href="/signup">Sign Up</Link>
        </div>
      </div>
      <Toaster position="top-center" />
    </div>
  );
};

export default LoginPage;
