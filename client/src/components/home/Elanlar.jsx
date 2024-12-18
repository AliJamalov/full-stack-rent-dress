import React, { useEffect, useState, useRef } from "react";
import Container from "../common/Container";
import { TailSpin } from "react-loader-spinner";
import { Link } from "react-router-dom";
import instance from "@/utils/baseUrl";

const Elanlar = () => {
  const [elanlar, setElanlar] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const observer = useRef(null); // для отслеживания скролла

  const fetchElanlar = async (page) => {
    setLoading(true);
    try {
      const response = await instance.get(
        `/announcements?page=${page}&limit=10`
      );
      const { announcements, totalPages } = response.data;
      setElanlar((prev) => [...prev, ...announcements]); // Добавляем новые данные
      setTotalPages(totalPages);
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  // Для наблюдения за скроллом
  const lastElementRef = (node) => {
    if (loading) return;

    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && currentPage < totalPages) {
        setCurrentPage((prevPage) => prevPage + 1);
      }
    });

    if (node) observer.current.observe(node);
  };

  useEffect(() => {
    fetchElanlar(currentPage);
  }, [currentPage]);

  return (
    <section className="bg-[#f1f3f7] py-12">
      <Container>
        <h1 className="text-4xl text-[#ab386e] font-semibold mb-8 text-center">
          Elanlar
        </h1>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:gap-6">
          {elanlar.map((elan, index) => (
            <Link
              key={elan._id}
              to={`/elan/${elan._id}`}
              ref={index === elanlar.length - 1 ? lastElementRef : null}
            >
              <div className="bg-white shadow-md rounded-lg mx-auto w-full max-w-[170px] sm:max-w-[230px] md:max-w-[250px] lg:max-w-[310px] overflow-hidden">
                <div className="h-[150px] sm:h-[200px] md:h-[220px] lg:h-[250px]">
                  <img
                    className="w-full h-full object-cover"
                    src={elan.images[0]}
                    alt="elan-image"
                  />
                </div>
                <div className="my-3 px-4">
                  <p className="font-semibold text-sm sm:text-base md:text-lg">
                    {elan.city}
                  </p>
                  <p className="text-sm md:text-base">{elan.pricePerDay} AZN</p>
                  <div className="text-sm md:text-base text-[#ab386e] text-end">
                    <span className="text-[#ab386e]">
                      {new Date(elan.createdAt).toLocaleDateString("az-AZ")}{" "}
                      {new Date(elan.createdAt).toLocaleTimeString("az-AZ", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        {loading && (
          <div className="flex justify-center items-center w-full">
            <TailSpin color="#ab386e" />
          </div>
        )}
      </Container>
    </section>
  );
};

export default Elanlar;
