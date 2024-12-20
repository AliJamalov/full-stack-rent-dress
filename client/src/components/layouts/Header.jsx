import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "../common/Container";
import { Heart, Plus, User } from "lucide-react";
import { useAuthStore } from "@/stores/useAuthStore";
import { TailSpin } from "react-loader-spinner";
import toast from "react-hot-toast";
import Login from "../home/Login";

const Header = ({ handleOpenLogin, isOpenLogin }) => {
  const { user, isLoading } = useAuthStore();

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
  const handleCategoryClick = (query) => {
    navigate(`/catalog?${query}`); // Переход с передачей query-параметра
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
                    src="/public/images/logo-best.jpg"
                    alt="logo-image"
                  />
                </div>
                <h1 className="font-semibold text-[#ab386e] text-[26px] font-darker-grotesque">
                  Rent Dress
                </h1>
              </div>
            </Link>
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
              <Heart />
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
                  <Link to={"/my-profile"}>
                    <div className="flex items-center gap-1 ">
                      <div className="bg-[#ab386e] p-1 rounded-xl">
                        <User className="text-white" />
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
            {isLoading ? (
              <TailSpin height={30} width={30} color="#ab386e" />
            ) : user ? (
              <Link to={"/my-profile"}>
                <div className="bg-[#ab386e] p-1 rounded-xl">
                  <User className="text-white" />
                </div>
              </Link>
            ) : (
              <button
                onClick={handleOpenLogin}
                className="bg-[#ab386e] py-1 px-2 text-white rounded-md shadow-md"
              >
                <p className="text-[14px]">giriş</p>
              </button>
            )}
            <Link to={"/"}>
              <div className="flex items-center gap-1">
                <div className="w-[70px]">
                  <img
                    className="w-full rounded-sm"
                    src="/public/images/logo-best.jpg"
                    alt="logo-image"
                  />
                </div>
                <h1 className="font-semibold text-[16px] text-[#ab386e] font-darker-grotesque">
                  Rent Dress
                </h1>
              </div>
            </Link>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-green-600 rounded-sm shadow-md text-white p-2 cursor-pointer">
                <Plus size={14} />
                <Link
                  onClick={(e) => {
                    if (!user) {
                      e.preventDefault(); // Останавливает переход на страницу
                      toast("Elan yaratmaq üçün daxil olun.");
                    }
                  }}
                  to="/create-announcement"
                >
                  <p className="text-[14px]">yeni elan</p>
                </Link>
              </div>
              <Heart size={16} />
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
