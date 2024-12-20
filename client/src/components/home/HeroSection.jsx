import React, { useEffect, useState } from "react";
import instance from "@/utils/baseUrl";
import { TailSpin } from "react-loader-spinner";

const HeroSection = () => {
  const [heroSection, setHeroSection] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHeroSection = async () => {
    try {
      const response = await instance.get("/heroSections");
      setHeroSection(response.data[0]);
    } catch (error) {
      console.log("error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHeroSection();
  }, []);

  const showAnnouncements = () => {
    window.scrollTo({
      top: document.getElementById("announcements-section").offsetTop,
      behavior: "smooth",
    });
  };

  return (
    <section>
      <div className="h-64 relative overflow-hidden md:w-full md:h-[430px]">
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <TailSpin color="#ab386e" height={80} width={80} />
          </div>
        ) : (
          <img
            className="w-full h-full object-cover object-center"
            src={heroSection.image}
            alt="hero-image"
          />
        )}
        <div className="text-white absolute top-2 p-[30px] md:p-[100px]">
          <h1 className="mb-3 text-[26px] font-semibold md:text-[36px] md:font-bold">
            Baha alma, günlük götür!
          </h1>
          <p className="mb-4 text-[16px] md:text-[19px]">
            {heroSection.description}
          </p>
          <button
            onClick={showAnnouncements}
            className="bg-[#ab386e] py-2 px-4 rounded-md md:py-3 md:px-6"
          >
            elanlara bax
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
