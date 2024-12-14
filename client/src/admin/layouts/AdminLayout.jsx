import React from "react";
import { Sidebar } from "../components/Sidebar";
import { Outlet } from "react-router-dom"; // Важно!

export const AdminLayout = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 p-6 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
};
