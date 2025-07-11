"use client";

import React, { useEffect, useState } from "react";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("adminId");
    router.push("/auth/Login");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin h-8 w-8 text-gray-800">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
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

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg p-4 shadow">
          <p className="text-gray-500 text-sm">Revenue</p>
          <h2 className="text-xl font-semibold">$65,804</h2>
          <p className="text-xs text-green-500 mt-1">+2.5%</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow">
          <p className="text-gray-500 text-sm">Users</p>
          <h2 className="text-xl font-semibold">05</h2>
          <p className="text-xs text-red-500 mt-1">-5.4%</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow">
          <p className="text-gray-500 text-sm">Total Sales</p>
          <h2 className="text-xl font-semibold">05</h2>
          <p className="text-xs text-green-500 mt-1">+6.1%</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow">
          <p className="text-gray-500 text-sm">Web Subscribers</p>
          <h2 className="text-xl font-semibold">03</h2>
          <p className="text-xs text-blue-500 mt-1">+3.5%</p>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Items</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Order</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap flex items-center gap-2">
                  <Image src="/logo.jpg" alt="Vintage" width={40} height={40} className="rounded-full" />
                  Vintage
                </td>
                <td className="px-6 py-4">2</td>
                <td className="px-6 py-4">15,901</td>
                <td className="px-6 py-4">
                  <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">Pending</span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap flex items-center gap-2">
                  <Image src="/logo.jpg" alt="Cartier" width={40} height={40} className="rounded-full" />
                  Santos de Cartier watch
                </td>
                <td className="px-6 py-4">1</td>
                <td className="px-6 py-4">7,551</td>
                <td className="px-6 py-4">
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">Delivered</span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap flex items-center gap-2">
                  <Image src="/logo.jpg" alt="Vintage" width={40} height={40} className="rounded-full" />
                  Vintage
                </td>
                <td className="px-6 py-4">2</td>
                <td className="px-6 py-4">15,901</td>
                <td className="px-6 py-4">
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">Shipped</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
