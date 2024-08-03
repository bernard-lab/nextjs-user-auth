"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const VerifyEmailPage = () => {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  // Function to verify user's email
  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.message);
    }
  };

  //get user email from url's right side of '=' sign
  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  //run verifyUserEmail once token has been get from url
  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8">
      <h1 className="text-4xl">Verify Email</h1>
      <h2 className="my-4 p-2 bg-orange-500 text-black">
        {token ? `${token}` : "no token"}
      </h2>

      {verified ? (
        <div>
          <h2 className="text-2xl">Email Verified</h2>
          <Link href="/login">Login</Link>
        </div>
      ) : error ? (
        <div>
          <h2 className="text-2xl bg-red-500 text-black">Error</h2>
        </div>
      ) : (
        <h2 className="text-2xl">Verifying...</h2>
      )}
    </div>
  );
};

export default VerifyEmailPage;
