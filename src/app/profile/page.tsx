"use client";

import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

const ProfilePage = () => {
  const router = useRouter();
  const [userData, setUserData] = useState(null); // data variable

  const onLogout = async () => {
    try {
      const response = await axios.get("/api/users/logout");
      toast.success("Successfully logged out!");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  //can be used in useState interchangably
  const getUserDetails = async () => {
    const response = await axios.get("/api/users/my");
    console.log(response.data); //return response object
    setUserData(response.data.data._id); //returns response object.user.id from route.ts
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen space-y-12 w-full bg-slate-500">
      <h1>Profile</h1>
      <hr />
      <h2>
        {userData ? (
          <Link href={`/profile/${userData}`}>{userData}</Link>
        ) : (
          "No ID"
        )}
      </h2>
      <button
        onClick={onLogout}
        className="bg-transparent border border-white rounded-lg px-4 py-2"
      >
        Logout
      </button>

      <button
        onClick={getUserDetails}
        className="bg-transparent border border-white rounded-lg px-4 py-2"
      >
        Get User Details
      </button>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default ProfilePage;
