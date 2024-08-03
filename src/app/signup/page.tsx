"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

const SignUpPage = () => {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    username: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false); //for learning purposes
  const [isLoading, setLoading] = useState(false); //

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      // console.log("Sign Up success", response.data);

      toast.success("Sign Up Successful!");
      router.push("/login");
    } catch (error: any) {
      console.log("Sign Up Failed: ", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-[100vh]">
      <div className="w-[25rem] text-center text-2xl p-8 bg-slate-500 rounded-2xl">
        <h2 className="mb-4">{isLoading ? "Processing..." : "Sign Up"}</h2>
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
            className="p-2 rounded-sm text-gray-800"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <label htmlFor="username" className="text-start mt-2">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={user.username}
            placeholder="Enter username"
            className="p-2 rounded-sm text-gray-800"
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
          <label htmlFor="password" className="text-start mt-2">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={user.password}
            placeholder="Enter password"
            className="p-2 rounded-sm text-gray-800"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />

          {/* Buttons */}
          <button
            className="my-4 bg-black px-4 py-2 rounded-lg"
            onClick={onSignup}
          >
            {buttonDisabled ? "Fill all fields" : "Sign up"}
          </button>
          <Link href="/login">Login</Link>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default SignUpPage;
