import React, { useEffect, useState } from "react";
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

const Catalog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({});
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpenFilter, setIsOpenFilter] = useState(false);

  // Загружаем фильтры из URL при первой загрузке
  useEffect(() => {
    const initialFilters = {};
    searchParams.forEach((value, key) => {
      initialFilters[key] = value;
    });
    setFilters(initialFilters);
  }, [searchParams]);

  // Получение данных с учетом фильтров
  const fetchFilteredData = async (filters) => {
    try {
      setLoading(true);
      const response = await instance.get("/announcements", {
        params: filters,
      });
      setAnnouncements(response.data.announcements);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Обновление данных при изменении фильтров
  useEffect(() => {
    if (Object.keys(filters).length > 0) {
      fetchFilteredData(filters);
    }
  }, [filters]);

  // Обновление состояния фильтров и URL
  const handleFilterChange = (key, value) => {
    const updatedFilters = {
      ...filters,
      [key]: value,
    };

    setFilters(updatedFilters); // Обновление состояния фильтров

    // Обновление параметров в URL
    if (value) {
      searchParams.set(key, value); // Добавляем параметр в URL
    } else {
      searchParams.delete(key); // Удаляем параметр из URL, если значение пустое
    }

    setSearchParams(searchParams); // Обновляем URL с новыми параметрами
  };

  // Инициализация данных при первом рендере
  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      fetchFilteredData(filters);
    }
  }, [filters]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth", // Добавляем плавную прокрутку
    });
  }, [filters]);

  return (
    <div className="bg-[#f5f5f5] py-[40px]">
      <Container>
        <div className="flex justify-end items-center mb-3 lg:hidden">
          <Filter onClick={() => setIsOpenFilter(!isOpenFilter)} />
        </div>
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
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {loading ? (
              <div className="flex justify-center items-center h-[300px] col-span-full">
                <TailSpin color="#ab386e" />
              </div>
            ) : announcements.length === 0 ? (
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
        </div>
      </Container>
      {isOpenFilter && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] md:w-[400px] h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">Filtrlər</h2>
              <button
                onClick={() => setIsOpenFilter(false)}
                className="text-[#ab386e] text-lg font-bold"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4 h-full overflow-y-auto pr-2">
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Catalog;
