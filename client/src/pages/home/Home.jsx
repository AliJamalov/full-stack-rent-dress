import Collections from "@/components/home/Collections";
import Elanlar from "@/components/home/Elanlar";
import HeroSection from "@/components/home/HeroSection";
import Login from "@/components/home/Login";
import Stores from "@/components/home/Stores";

const Home = ({ isOpenLogin, handleOpenLogin }) => {
  return (
    <div>
      <HeroSection />
      <Stores />
      <Collections />
      <Elanlar />
      {isOpenLogin && (
        <div className="fixed z-50 inset-0 bg-black bg-opacity-50">
          <Login handleOpenLogin={handleOpenLogin} />
        </div>
      )}
    </div>
  );
};

export default Home;
