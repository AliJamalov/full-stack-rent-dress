import React, { useEffect, useState, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Container from "@/components/common/Container";
import GenderFilter from "@/components/catalog/GenderFilter";
import CategoryFilter from "@/components/catalog/CategoryFilter";
import CollectionsFilter from "@/components/catalog/СollectionsFilter";
import SizeFilter from "@/components/catalog/SizeFilter";
import ColorFilter from "@/components/catalog/ColorFilter";
import instance from "@/utils/baseUrl";
import { TailSpin } from "react-loader-spinner";
import { Filter } from "lucide-react";
import BrandFilter from "@/components/catalog/BrandFilter";
import Search from "@/components/catalog/Search";
import Sort from "@/components/catalog/Sort";

const Catalog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({});
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef();

  useEffect(() => {
    const initialFilters = {};
    searchParams.forEach((value, key) => {
      initialFilters[key] = value;
    });
    setFilters(initialFilters);
  }, [searchParams]);

  const fetchFilteredData = async (
    filters,
    pageNumber = 1,
    isAppend = false
  ) => {
    try {
      setLoading(true);
      const response = await instance.get("/announcements", {
        params: { ...filters, page: pageNumber, limit: 10 },
      });
      const newAnnouncements = response.data.announcements;

      setAnnouncements((prev) =>
        isAppend ? [...prev, ...newAnnouncements] : newAnnouncements
      );
      setHasMore(newAnnouncements.length > 0); // Останавливаем бесконечную прокрутку, если данных нет
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (Object.keys(filters).length > 0) {
      fetchFilteredData(filters, 1, false); // Загружаем данные при изменении фильтров
      setPage(1); // Сбрасываем страницу
    }
  }, [filters]);

  const handleFilterChange = (key, value) => {
    const updatedFilters = {
      ...filters,
      [key]: value,
    };

    if (value) {
      searchParams.set(key, value);
    } else {
      searchParams.delete(key);
    }

    setSearchParams(searchParams); // Обновляем URL
    setFilters(updatedFilters); // Обновляем состояние фильтров
  };

  const observerCallback = (entries) => {
    const target = entries[0];
    if (target.isIntersecting && hasMore && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      threshold: 0.1,
    });
    if (observerRef.current) observer.observe(observerRef.current);

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [hasMore, loading]);

  useEffect(() => {
    if (page > 1) {
      fetchFilteredData(filters, page, true); // Загрузка новых страниц
    }
  }, [page]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [filters]);

  const resetFilters = () => {
    setFilters({});
    setSearchParams({});
  };

  useEffect(() => {
    if (isOpenFilter) {
      // Блокировка прокрутки страницы
      document.body.style.overflow = "hidden";
    } else {
      // Восстановление прокрутки страницы
      document.body.style.overflow = "auto";
    }
  }, [isOpenFilter]);

  return (
    <div className="bg-[#f5f5f5] py-[40px]">
      <Container>
        <div className="flex gap-[100px]">
          <section className="hidden lg:block">
            <GenderFilter setFilters={handleFilterChange} filters={filters} />
            <CategoryFilter setFilters={handleFilterChange} filters={filters} />
            <CollectionsFilter
              setFilters={handleFilterChange}
              filters={filters}
            />
            <BrandFilter setFilters={handleFilterChange} filters={filters} />
            <SizeFilter setFilters={handleFilterChange} filters={filters} />
            <ColorFilter setFilters={handleFilterChange} filters={filters} />
          </section>
          <section>
            <div className="flex-col mb-5 items-center gap-3 md:flex md:flex-row">
              <Search setFilters={handleFilterChange} filters={filters} />
              <div className="flex items-center justify-between mt-3 md:mt-0">
                <div>
                  <Sort setFilters={handleFilterChange} filters={filters} />
                </div>
                <div className="lg:hidden">
                  <Filter onClick={() => setIsOpenFilter(!isOpenFilter)} />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {loading && page === 1 ? (
                <div className="flex justify-center items-center h-[300px] col-span-full">
                  <TailSpin color="#ab386e" />
                </div>
              ) : announcements.length === 0 && page === 1 ? (
                <div className="col-span-full text-center text-gray-500">
                  <p>Seçdiyiniz filtrlərə uyğun elan tapılmadı.</p>
                </div>
              ) : (
                announcements.map((announcement) => (
                  <Link
                    to={`/elan/${announcement._id}`}
                    key={announcement._id}
                    className="bg-white mx-[2px] lg:mx-0 p-4 shadow-lg rounded-lg flex flex-col transition-transform duration-300 hover:scale-105 lg:max-h-[400px]"
                  >
                    {announcement.userName === "store" && (
                      <div className="bg-[#ab386e] p-1 w-[90px] text-white rounded-md flex justify-center">
                        magaza
                      </div>
                    )}
                    <img
                      src={announcement.images[0]}
                      alt="image-elan"
                      className="w-full h-[130px] md:h-[250px] object-contain rounded-lg"
                    />
                    <h3 className="text-sm font-medium mt-4 md:text-[16px]">
                      {announcement.clothingCollection}
                    </h3>
                    <p className="text-sm text-gray-800 font-bold mt-2">
                      {announcement.pricePerDay} AZN
                    </p>
                    <div className="text-sm md:text-base text-[#ab386e] text-end">
                      <span>
                        {new Date(announcement.createdAt).toLocaleDateString(
                          "az-AZ"
                        )}{" "}
                        {new Date(announcement.createdAt).toLocaleTimeString(
                          "az-AZ",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </span>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </section>
        </div>
      </Container>
      {loading && page > 1 && (
        <div className="flex justify-center items-center my-5">
          <TailSpin height={30} width={30} color="#ab386e" />
        </div>
      )}
      {!hasMore && page > 1 && (
        <div className="text-center text-gray-500 mt-5">
          <p>Əlavə elan yoxdur.</p>
        </div>
      )}
      {/* Элемент для наблюдения */}
      <div ref={observerRef}></div>
      {isOpenFilter && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-[400px] h-full overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">Filtrlər</h2>
              <button
                onClick={() => setIsOpenFilter(false)}
                className="text-[#ab386e] text-lg font-bold"
              >
                ✕
              </button>
            </div>
            <div className="space-y-6 h-full pr-2">
              <GenderFilter setFilters={handleFilterChange} filters={filters} />
              <CategoryFilter
                setFilters={handleFilterChange}
                filters={filters}
              />
              <CollectionsFilter
                setFilters={handleFilterChange}
                filters={filters}
              />
              <BrandFilter setFilters={handleFilterChange} filters={filters} />
              <SizeFilter setFilters={handleFilterChange} filters={filters} />
              <ColorFilter setFilters={handleFilterChange} filters={filters} />
              <button
                onClick={resetFilters}
                className="rounded-md bg-black text-white px-3 py-1"
              >
                filtrləri sıfırlamaq
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Catalog;
