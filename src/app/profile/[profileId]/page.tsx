"use client";

import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

interface User {
  email: string;
  username: string;
}

const UserProfile = () => {
  const [user, setUser] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/users/my");
        console.log("Fetched Data: ", response.data); //return response object
        setUser([
          ...user,
          {
            email: response.data.data.email,
            username: response.data.data.username,
          },
        ]); //returns response object.user.id from route.ts
      } catch (error: any) {
        console.log(error.message);
        toast.error(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex justify-center min-h-screen f-full bg-slate-500">
      <div className="w-10/12 text-center">
        <h2 className="pt-8 font-bold text-xl">
          <span>{user[0]?.username}</span> &apos;s Profile Page
        </h2>
        <Image
          alt="logo"
          src="../profile.svg"
          width={200}
          height={200}
          className="mx-auto my-8"
        />
        <p className="text-left">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis,
          minus in possimus voluptates distinctio, qui fugiat saepe fugit cum,
          aperiam aut necessitatibus placeat voluptate quae enim delectus esse
          quod nemo.
        </p>
      </div>
      <Toaster position="top-center" />
    </div>
  );
};

export default UserProfile;
