import { Route, Routes } from "react-router-dom";
import { AdminLayout } from "./admin/layouts/AdminLayout";
import Users from "./admin/pages/Users";
import Categories from "./admin/pages/Categories";
import HeroSection from "./admin/pages/HeroSection";
import ClothingCollection from "./admin/pages/ClothingCollection";
import { useAuthStore } from "./stores/useAuthStore";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import Home from "./pages/home/Home";

function App() {
  return (
    <>
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
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
