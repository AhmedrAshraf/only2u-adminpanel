"use client";

import React, { useEffect, useState } from "react";

import {
  ArrowUpDown,
  ClipboardList,
  Download,
  FileText,
  HandHeart,
  HeartPulse,
  Newspaper,
  Users,
  Loader2,
  FileCheck,
  LogOut,
} from "lucide-react";
// import { collection, onSnapshot, query, where, getDocs } from "firebase/firestore";
// import { db } from "@/app/utils/firebaseConfig";
import { useAppContext } from "@/app/context/useContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function DashboardPage() {
  const {
   user,
   productMangement,
   userManagement,
   productManagement,
   categoryManagement,
   colorManagement,

  } = useAppContext();

  const router = useRouter();
 
  const [loading, setLoading] = useState(false);

  


  const handleLogout = () => {
    localStorage.removeItem("adminId");
    router.push("/auth/Login");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin h-8 w-8 text-gray-800" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Image
                src="/logo-donation.png"
                alt="Logo"
                width={40}
                height={40}
                className="mr-3"
              />
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 text-sm font-medium text-red-600 hover:text-red-800"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      
    </div>
  );
}
