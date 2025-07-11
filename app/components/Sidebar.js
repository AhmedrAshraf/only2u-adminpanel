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
  X
} from "lucide-react";
// import { auth } from "../utils/firebaseConfig";
import { usePathname, useRouter } from "next/navigation";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const router = useRouter();
  const path = usePathname();
  const pageName = path.split("/").pop();

  const menuItems = [
    { name: "Dashboard", icon: Home, link: "/admin/Dashboard", path: "Dashboard" },
    { name: "Color Management", icon: FileCheck, link: "/admin/ColorMang", path: "ColorMangement" },
    { name: "Order Management", icon: UserPlus, link: "/admin/OrderMang", path: "OrderManagement" },
    { name: "Product Management", icon: HandHeart, link: "/admin/ProductMang", path: "ProductManagement" },
    { name: "Category Management", icon: Contact, link: "/admin/CatMang", path: "CategoryMangement" },
    // { name: "Notifications", icon: Bell, link: "/admin/Notification", path: "Notification" },
    // { name: "Users", icon: Users, link: "/admin/Users", path: "Users" },
    // { name: "Settings", icon: Settings2, link: "/admin/Settings", path: "Settings" },

  ];

  const handleMenuClick = () => {
    setIsSidebarOpen(false);
  };

  const handleLogout = () => {
    // auth.signOut();
    // localStorage.removeItem("users");
    router.push("/auth/Login");
  };

  return (
    <div>
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="block md:hidden p-2 text-black md:fixed absolute top-3 left-2 z-10"
      >
        {/* {isSidebarOpen ? <X size={32} /> : <Menu size={24} color="black" />} */}
        <Menu size={24} color="black" />
      </button>

      <aside
          className={`fixed top-0 left-0 w-64 overflow-y-auto flex flex-col border-r h-full z-40 bg-white transform transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div onClick={() => setIsSidebarOpen(!isSidebarOpen)} className=" md:hidden fixed top-3 left-4">
          <X size={32} /> 
        </div>

        <div className="p-8">
          <img src="/logo-donation.png" alt="Logo" />
        </div>

        <nav className="flex-1">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.link}
              onClick={handleMenuClick}
              className={`flex items-center gap-4 px-6 cursor-pointer md:py-3 py-4 text-sm font-[SairaMedium] ${
                pageName === item.path
                  ? "bg-gray-50"
                  : "bg-amber-300"
              }`}
            >
              <item.icon size={20} />
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="p-6">
          <button
            className="flex items-center font-[SairaMedium] gap-4 hover:text-red-500 text-sm "
            onClick={handleLogout}
          >
            <LogOut size={20} />
            Log out
          </button>
        </div>
      </aside>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Sidebar;
