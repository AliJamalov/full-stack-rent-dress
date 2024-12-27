import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "../common/Container";
import { Heart, LogOutIcon, Plus, Store, User } from "lucide-react";
import { useAuthStore } from "@/stores/useAuthStore";
import { TailSpin } from "react-loader-spinner";
import Login from "../home/Login";
import { RiAdminLine } from "react-icons/ri";

const Header = ({ handleOpenLogin, isOpenLogin }) => {
  const { user, isLoading, logout } = useAuthStore();

  const navigate = useNavigate();

  const categories = [
    { name: "Kişi", query: "gender=Kişi" },
    { name: "Qadın", query: "gender=Qadın" },
    { name: "Uşaq", query: "gender=Uşaq" },
    {
      name: "Gəlinlik paltarları",
      query: "clothingCollection=gəlinlik paltarları",
    },
    {
      name: "Korporativ geyimlər",
      query: "clothingCollection=Korporativ geyimlər",
    },
  ];

  // Обработчик клика по категории
  const handleCategoryClick = (category) => {
    // Преобразуем категорию в формат с дефисами и в нижний регистр
    const formattedCategory = category.replace(/\s+/g, "+");

    // Формируем query-параметр
    const query = `${formattedCategory}`;

    // Переходим по маршруту с query-параметром
    navigate(`/catalog?${query}`);
  };

  return (
    <header>
      <Container>
        {/* Desktop */}
        <div className="hidden lg:block">
          <div className="flex justify-between items-center">
            <Link to={"/"}>
              <div className="flex items-center gap-2">
                <div className="w-[100px]">
                  <img
                    className="w-full rounded-sm"
                    src="/images/logo-best.jpg"
                    alt="logo-image"
                  />
                </div>
                <h1 className="font-semibold text-[#ab386e] text-[26px] font-darker-grotesque">
                  Rent Dress
                </h1>
              </div>
            </Link>
            {user?.role === "admin" && (
              <Link to={"/admin"}>
                <RiAdminLine className="text-[30px]" />
              </Link>
            )}
            <div>
              <ul className="flex items-center gap-4">
                {categories.map((category) => (
                  <li
                    key={category.name}
                    onClick={() => handleCategoryClick(category.query)}
                    className="cursor-pointer hover:text-[#ab386e]"
                  >
                    {category.name}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                {user && (
                  <LogOutIcon className="cursor-pointer" onClick={logout} />
                )}
                <Link
                  className="p-2 rounded-full bg-[#ab386e]"
                  to={"/wishlist"}
                >
                  <Heart color="white" size={16} />
                </Link>
              </div>
              <Link
                onClick={(e) => {
                  if (!user) {
                    e.preventDefault(); // Останавливает переход на страницу
                    handleOpenLogin();
                  }
                }}
                to="/create-announcement"
              >
                <div className="flex items-center gap-2 bg-green-600 rounded-sm shadow-md text-white p-2 cursor-pointer">
                  <Plus />
                  <p>yeni elan</p>
                </div>
              </Link>
              {isLoading ? (
                <TailSpin height={30} width={30} color="#ab386e" />
              ) : (
                user && (
                  <Link
                    to={user.role === "owner" ? "/store-panel" : "/my-profile"}
                  >
                    <div className="flex items-center gap-1 ">
                      <div className="bg-black p-1 rounded-xl">
                        {user.role === "user" ? (
                          <User className="text-white" />
                        ) : (
                          <Store className="text-white" />
                        )}
                      </div>
                      <p>{user.firstName}</p>
                    </div>
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
        {/* Mobile */}
        <div className="lg:hidden">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              {isLoading ? (
                <TailSpin height={30} width={30} color="#ab386e" />
              ) : user ? (
                <Link
                  to={user.role === "owner" ? "/store-panel" : "/my-profile"}
                >
                  <div className="bg-black p-1 rounded-xl">
                    <User className="text-white" />
                  </div>
                </Link>
              ) : null}
              <div className="flex items-center gap-3">
                <Link
                  className="p-2 rounded-full bg-[#ab386e]"
                  to={"/wishlist"}
                >
                  <Heart color="white" size={16} />
                </Link>
                {user && <LogOutIcon onClick={logout} />}
              </div>
            </div>
            <Link to="/">
              <div className="flex items-center gap-1">
                <div className="w-[70px]">
                  <img
                    className="w-full rounded-sm"
                    src="/images/logo-best.jpg"
                    alt="logo"
                  />
                </div>
                <h1 className="font-semibold text-[19px] text-[#ab386e] font-darker-grotesque">
                  Rent Dress
                </h1>
              </div>
            </Link>
            <div className="flex items-center gap-2">
              <button
                className="flex items-center gap-1 bg-green-600 rounded-sm shadow-md text-white p-2"
                onClick={(e) => {
                  if (!user) {
                    e.preventDefault(); // Останавливаем переход по ссылке
                    handleOpenLogin(); // Открываем модальное окно для логина
                  }
                }}
              >
                <Plus size={14} />
                <Link to="/create-announcement" className="text-[14px]">
                  elan
                </Link>
              </button>
            </div>
          </div>
        </div>
      </Container>
      {isOpenLogin && (
        <div className="fixed z-50 inset-0 bg-black bg-opacity-50">
          <Login handleOpenLogin={handleOpenLogin} />
        </div>
      )}
    </header>
  );
};

export default Header;
