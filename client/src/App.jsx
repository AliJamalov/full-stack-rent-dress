import { Route, Routes, useLocation } from "react-router-dom";
import { AdminLayout } from "./admin/layouts/AdminLayout";
import Users from "./admin/pages/Users";
import Categories from "./admin/pages/Categories";
import HeroSection from "./admin/pages/HeroSection";
import ClothingCollection from "./admin/pages/ClothingCollection";
import { useAuthStore } from "./stores/useAuthStore";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import Home from "./pages/home/Home";
import Header from "./components/layouts/Header";
import Register from "./pages/register/Register";
import CreateAnnouncement from "./pages/createAnnouncement/CreateAnnouncement";
import MyProfile from "./pages/myProfile/MyProfile";
import ElanDetail from "./pages/elanDetail/ElanDetail";
import Catalog from "./pages/catalog/Catalog";

function App() {
  const { getMe } = useAuthStore();
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const location = useLocation();

  const isAdminRoute =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/register");

  const handleOpenLogin = () => {
    setIsOpenLogin(!isOpenLogin);
  };

  useEffect(() => {
    getMe();
  }, [getMe]);

  return (
    <>
      {!isAdminRoute && (
        <Header handleOpenLogin={handleOpenLogin} isOpenLogin={isOpenLogin} />
      )}
      <Toaster toastOptions={{ duration: 3000 }} />
      <Routes>
        {/*Admin Routes*/}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="users" element={<Users />} />
          <Route path="categories" element={<Categories />} />
          <Route path="hero-section" element={<HeroSection />} />
          <Route path="clothing-collection" element={<ClothingCollection />} />
        </Route>
        {/*Client Routes*/}
        <Route
          path="/"
          element={
            <Home isOpenLogin={isOpenLogin} handleOpenLogin={handleOpenLogin} />
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/create-announcement" element={<CreateAnnouncement />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/elan/:elanId" element={<ElanDetail />} />
        <Route path="/catalog" element={<Catalog />} />
      </Routes>
    </>
  );
}

export default App;
