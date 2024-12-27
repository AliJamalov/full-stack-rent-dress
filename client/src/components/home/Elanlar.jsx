import React, { useEffect, useState, useRef } from "react";
import Container from "../common/Container";
import { TailSpin } from "react-loader-spinner";
import { Link } from "react-router-dom";
import instance from "@/utils/baseUrl";
import { Heart } from "lucide-react";
import { useWishlist } from "@/stores/useWishlist";

const Elanlar = () => {
  const { toggleWishList, wishItems } = useWishlist(); // Добавляем wishItems для отображения статуса в избранном
  const [elanlar, setElanlar] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const observer = useRef(null);

  const fetchElanlar = async (page) => {
    setLoading(true);
    try {
      const response = await instance.get(
        `/announcements?page=${page}&limit=12`
      );
      const { announcements, totalPages } = response.data;
      setElanlar((prev) => [...prev, ...announcements]);
      setTotalPages(totalPages);
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

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

  const handleTogleWishlist = async (e, itemId) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      await toggleWishList(itemId); // Тогглинг для добавления или удаления из wishlist
    } catch (error) {
      console.log("error adding to wishlist", error);
    }
  };

  return (
    <section id="announcements-section" className="bg-[#f1f3f7] py-12">
      <Container>
        <h1 className="text-4xl text-[#ab386e] font-semibold mb-8 text-center">
          Elanlar
        </h1>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:gap-6">
          {elanlar.map((elan, index) => {
            const isWishlisted = wishItems.some(
              (item) => item.productId === elan._id
            ); // Проверяем, есть ли товар в списке избранных

            return (
              <Link
                className="relative"
                key={index}
                to={`/elan/${elan._id}`}
                ref={index === elanlar.length - 1 ? lastElementRef : null}
              >
                <div
                  onClick={(e) => handleTogleWishlist(e, elan._id)}
                  className="absolute right-4 top-2"
                >
                  <Heart
                    color={isWishlisted ? "red" : "gray"} // Меняем цвет в зависимости от того, в избранном ли товар
                  />
                </div>
                <div className="bg-white shadow-md rounded-lg mx-auto w-full max-w-[170px] sm:max-w-[230px] md:max-w-[250px] lg:max-w-[310px] overflow-hidden">
                  <div className="h-[150px] sm:h-[200px] md:h-[220px] lg:h-[250px]">
                    <img
                      className="w-full h-full object-contain"
                      src={elan.images[0]}
                      alt="elan-image"
                    />
                  </div>
                  <div className="my-3 px-4">
                    <p className="font-semibold text-sm sm:text-base md:text-lg">
                      {elan.city}
                    </p>
                    <p className="text-sm md:text-base">
                      {elan.pricePerDay} AZN
                    </p>
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
            );
          })}
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
