import React from "react";
import { Separator } from "@/components/ui/separator";
import { Link, NavLink } from "react-router-dom";

export const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-100 p-4 h-screen flex flex-col">
      <h1 className="text-xl font-bold mb-4">Админ Панель</h1>
      <Link className="w-[100px] mx-auto" to={"/"}>
        <img
          className="w-full rounded-md"
          src="/public/images/logo-best.jpg"
          alt="logo"
        />
      </Link>
      <Separator className="my-4" />
      <nav className="flex flex-col gap-4">
        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            `py-2 px-4 rounded-md ${
              isActive ? "bg-gray-300" : "hover:bg-gray-200"
            }`
          }
        >
          Пользователи
        </NavLink>
        <NavLink
          to="/admin/categories"
          className={({ isActive }) =>
            `py-2 px-4 rounded-md ${
              isActive ? "bg-gray-300" : "hover:bg-gray-200"
            }`
          }
        >
          Категории
        </NavLink>
        <NavLink
          to="/admin/hero-section"
          className={({ isActive }) =>
            `py-2 px-4 rounded-md ${
              isActive ? "bg-gray-300" : "hover:bg-gray-200"
            }`
          }
        >
          Главная Картина
        </NavLink>
        <NavLink
          to="/admin/clothing-collection"
          className={({ isActive }) =>
            `py-2 px-4 rounded-md ${
              isActive ? "bg-gray-300" : "hover:bg-gray-200"
            }`
          }
        >
          Коллекция одежд
        </NavLink>
        <NavLink
          to="/admin/announcements"
          className={({ isActive }) =>
            `py-2 px-4 rounded-md ${
              isActive ? "bg-gray-300" : "hover:bg-gray-200"
            }`
          }
        >
          Обьявления
        </NavLink>
        <NavLink
          to="/admin/stores"
          className={({ isActive }) =>
            `py-2 px-4 rounded-md ${
              isActive ? "bg-gray-300" : "hover:bg-gray-200"
            }`
          }
        >
          Магазины
        </NavLink>
      </nav>
    </aside>
  );
};
