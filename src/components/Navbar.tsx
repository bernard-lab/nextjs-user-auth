"use client";

import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useState } from "react";

const getToken = () => {
  const token = Cookies.get("token");
  return token;
};

const Navbar = ({ LoggedIn }: { LoggedIn: boolean }) => {
  const router = useRouter();
  const token = getToken();
  const [isLoggedIn, setIsLoggedIn] = useState(LoggedIn);

  const onLogout = async () => {
    await axios.get("/api/users/logout");
    toast.success("Successfully logged out!");
    setIsLoggedIn(false);
    router.push("/login");
  };

  return (
    <div className="w-full">
      <nav className="w-10/12 mx-auto">
        {isLoggedIn ? (
          <ul className="flex justify-end items-center gap-4 h-12">
            <li>
              <Link href="/" className="hover:opacity-80">
                Home
              </Link>
            </li>
            <li>
              <button className="hover:opacity-80" onClick={onLogout}>
                Logout
              </button>
            </li>
            <li>
              <Link href="/profile" className="hover:opacity-80">
                Profile
              </Link>
            </li>
          </ul>
        ) : (
          <ul className="flex justify-end items-center gap-4 h-12">
            <li>
              <Link href="/login" className="hover:opacity-80">
                Login
              </Link>
            </li>
            <li>
              <Link href="/signup" className="hover:opacity-80">
                Sign Up
              </Link>
            </li>
          </ul>
        )}
      </nav>
      <hr />
    </div>
  );
};

export default Navbar;
