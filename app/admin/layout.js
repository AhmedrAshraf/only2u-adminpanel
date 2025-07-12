"use client";
import { usePathname } from "next/navigation";
import Sidebar from "../components/Sidebar.js";
import Header from "../components/Header";

// Define route-to-title mapping (must match Sidebar links)
const pageTitleMap = {
  Dashboard: "Dashboard",
  OrderMang: "Order Management",
  UserMang: "User Management",
  ProductMang: "Product Catalog",
  CatMang: "Category Management",
  // Add more as needed
};

export default function Layout({ children }) {
  const pathname = usePathname();

  // Extract the page key after /admin/
  const pageKey = pathname.split("/admin/")[1]?.split("/")[0] || "";

  // Use the mapped title or fallback
  const pageName = pageTitleMap[pageKey] || "Admin Panel";

  return (
    <div className="md:flex">
      <div className="md:w-64 w-0">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col">
        <Header pageName={pageName} />
        <main className="flex-1 overflow-y-auto md:p-4 py-4">{children}</main>
      </div>
    </div>
  );
}
