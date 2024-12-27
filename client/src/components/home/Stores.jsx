import instance from "@/utils/baseUrl";
import React, { useEffect, useState } from "react";
import Container from "../common/Container";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router-dom";

const Stores = () => {
  const [stores, setStores] = useState([]);

  const fetchStores = async () => {
    try {
      const response = await instance.get("/store");
      setStores(response.data);
    } catch (error) {
      console.log("error fetching data", error);
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  return (
    <section>
      <Container>
        <h1 className="text-[30px] md:text-[40px] font-semibold my-5">
          Butiklər
        </h1>
        {/* Слайдер для мобильных устройств */}
        <div className="block md:hidden">
          <Swiper
            spaceBetween={10}
            slidesPerView={2} // Отображаем 3 элемента по умолчанию
            autoplay={{ delay: 2500 }} // Автопрокрутка
          >
            {stores &&
              stores.map((store, index) => (
                <SwiperSlide key={index}>
                  <Link
                    to={`/store-detail/${store.ownerId}`}
                    className="bg-slate-200 rounded-md"
                  >
                    <div className="max-w-[150px] bg-slate-200 p-3">
                      <img
                        className="w-full max-h-[100px] rounded-md object-cover"
                        src={store.storePhoto}
                        alt={store.storeName}
                      />
                    </div>
                    <p className="truncate mt-1">{store.storeName}</p>
                  </Link>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
        {/* Статический контент для десктопов */}
        <div className="hidden md:flex items-center gap-3">
          {stores &&
            stores.map((store, index) => (
              <Link
                to={`/store-detail/${store.ownerId}`}
                className="bg-slate-200 rounded-md p-2"
                key={index}
              >
                <div className="max-w-[150px] bg-slate-200 p-3">
                  <img
                    className="w-full max-h-[100px] rounded-md object-contain"
                    src={store.storePhoto}
                    alt={store.storeName}
                  />
                </div>
                <p className="truncate">{store.storeName}</p>
              </Link>
            ))}
        </div>
      </Container>
    </section>
  );
};

export default Stores;
