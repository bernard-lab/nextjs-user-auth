// TODO: Send an email for forgetting the password
// Create API
// Make axios request to send the token via email and database
// When email link is clicked make another API call
// Get the token from the url
// the body will get the password and confirmed password and submit
// When the button is clicked get token, password and confirm password
// Base on these, check the token if valid or not
// Grab the user base on the token and update the password
// Encrypt the password again
"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({
    email: "",
  });

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/users/forgotpassword", user);
      console.log("🚀 ~ forgot password ~ response:", response);
      toast.success(
        "Forgot password submitted! Check your email and click the link to change your password."
      );
      router.push("/login");
    } catch (error: any) {
      console.log("Failed to change password: ", error.message);
      toast.error("Invalid Email.");
      setUser({ email: "" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-[25rem] text-centertext-sm flex flex-col gap-2 mt-4 p-8 bg-slate-500 rounded-2xl text-sm">
        <h2 className="mb-4 text-center text-2xl">
          {isLoading ? "Processing" : "Forgot Password"}
        </h2>
        <hr className="mb-4" />
        <label>Email:</label>
        <input
          type="email"
          id="email"
          value={user.email}
          placeholder="Enter email"
          className="px-2 py-1 text-black"
          onChange={(e) => setUser({ email: e.target.value })}
        />
        <button
          className="my-4 bg-black px-4 py-2 rounded-lg hover:opacity-80"
          onClick={onSubmit}
        >
          Submit
        </button>
        <Link href="/login" className="text-center hover:opacity-80">
          Cancel
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
