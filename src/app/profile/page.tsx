"use client";

import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

interface User {
  id: string;
  email: string;
  username: string;
}
const ProfilePage: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = useState<User[]>([]); // data variable
  const [_, setIsLoggedIn] = useState(true);

  const onLogout = async () => {
    try {
      const response = await axios.get("/api/users/logout");
      toast.success("Successfully logged out!");
      setIsLoggedIn(false); // update state to false to hide navigation links when logged out
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  //can be used in useEffect interchangably
  const getUserDetails = async () => {
    const response = await axios.get("/api/users/my");
    console.log(response.data); //return response object
    setUser([
      ...user,
      {
        id: response.data.data._id,
        email: response.data.data.email,
        username: response.data.data.username,
      },
    ]); //returns response object.user.id from route.ts
  };

  return (
    <>
      {/* <Navbar LoggedIn={isLoggedIn} /> */}
      <div className="flex flex-col justify-center items-center min-h-screen w-full">
        <div className="w-9/12 p-8 gap-4 rounded-lg bg-slate-500 flex flex-col">
          <h1>Profile</h1>
          <hr />
          <h2>
            {user[0]?.id ? (
              <Link
                href={`/profile/${user[0]?.id}`}
                className="flex gap-2 items-center"
              >
                Got to{" "}
                <p className="text-black text-lg font-bold hover:underline hover:scale-110">
                  {user[0]?.username}
                </p>
                &apos;s Profile
              </Link>
            ) : (
              "No ID"
            )}
          </h2>
          <button
            onClick={onLogout}
            className="bg-transparent border border-white rounded-lg px-4 py-2 hover:bg-slate-400"
          >
            Logout
          </button>

          <button
            onClick={getUserDetails}
            className="bg-transparent border border-white rounded-lg px-4 py-2 hover:bg-slate-400"
          >
            Get User Details
          </button>
        </div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
    </>
  );
};

export default ProfilePage;
