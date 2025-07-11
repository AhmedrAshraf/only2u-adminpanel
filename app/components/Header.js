"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "../context/useContext";
import { ArrowLeft, Bell, LogOut, User } from "lucide-react";

const Header = ({ pageName }) => {
  const { user } = useAppContext();
  const [showDropdown, setShowDropdown] = useState(false);

  const router = useRouter();

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleLogout = () => {
    console.log("Logout clicked");
  };

  return (
    <header className="flex justify-between items-center px-4 py-4 bg-white border-b border-gray-200">
      <h1 className="text-xl md:pl-0 pl-10 flex items-center gap-2 font-[SairaSemibold]"><ArrowLeft size={18} className="md:block hidden cursor-pointer" onClick={() => router.back()} /> {pageName}</h1>
    </header>
  );
};

export default Header;