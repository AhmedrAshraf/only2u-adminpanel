"use client";
import Link from "next/link";
import { useState } from "react";
import {
  Home,
  Users,
  Menu,
  HandHeart,
  Contact,
  UserPlus,
  Bell,
  Settings2,
  FileCheck,
  LogOut,
  X,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();
  const path = usePathname();
  const pageName = path.split("/").pop();

  const menuItems = [
    {
      name: "Dashboard",
      icon: Home,
      link: "/admin/Dashboard",
      path: "Dashboard",
    },
    {
      name: "Color Management",
      icon: FileCheck,
      link: "/admin/ColorMang",
      path: "ColorMang",
    },
    {
      name: "Order Management",
      icon: UserPlus,
      link: "/admin/OrderMang",
      path: "OrderMang",
    },
    {
      name: "Product Management",
      icon: HandHeart,
      link: "/admin/ProductMang",
      path: "ProductMang",
    },
    {
      name: "Category Management",
      icon: Contact,
      link: "/admin/CatMang",
      path: "CatMang",
    },
    {
      name: "User Management",
      icon: Bell,
      link: "/admin/UserMang",
      path: "UserMang",
    },
  ];

  const handleLogout = () => {
    router.push("/auth/Login");
  };

  const handleMenuClick = () => setIsSidebarOpen(false);

  return (
    <div>
      {/* Toggle Button for Mobile */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="md:hidden p-2 fixed top-4 left-4 z-50 bg-white shadow-lg rounded-full"
      >
        <Menu size={24} />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r shadow-xl z-40 transform transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        {/* Close on mobile */}
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="md:hidden absolute top-4 right-4 cursor-pointer"
        >
          <X size={28} className="text-gray-700" />
        </div>

        {/* Logo */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-center">
          <img src="/logo.jpg" alt="Logo" height={50} />
        </div>

        {/* Navigation */}
        <nav className="flex flex-col py-6 px-4 space-y-2">
          {menuItems.map((item, index) => {
            const isActive = pageName === item.path;
            return (
              <Link
                key={index}
                href={item.link}
                onClick={handleMenuClick}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm font-medium ${
                  isActive
                    ? "bg-indigo-100 text-indigo-700 font-semibold"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <item.icon size={20} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="mt-auto p-6 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 text-sm text-red-600 hover:text-red-700 transition"
          >
            <LogOut size={20} />
            Log out
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Sidebar;
