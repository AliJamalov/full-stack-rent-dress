import React, { useEffect, useState } from "react";
import Container from "../common/Container";
import instance from "@/utils/baseUrl";
import { MapPinHouse, Phone } from "lucide-react";
import { TailSpin } from "react-loader-spinner";

const Store = ({ storeId }) => {
  const [store, setStore] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchStore = async () => {
    setLoading(true);
    try {
      const response = await instance.get(`/store/${storeId}`);
      setStore(response.data[0]);
    } catch (error) {
      console.log("error fetchin data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStore();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <TailSpin color="#ab386e" />
      </div>
    );
  }

  return (
    <section className="my-5 md:px-[200px]">
      <Container>
        <section className="flex justify-center rounded-md items-center flex-col bg-slate-100 py-7">
          <div className="max-w-[600px]">
            <img
              className="rounded-md w-full h-[300px] object-contain"
              src={store.storePhoto}
              alt={store.storeName}
            />
          </div>
          <p className="my-4">{store.storeDescription}</p>
          <div className="flex items-center gap-3 mr-[54px]">
            <MapPinHouse />
            <p className="my-4">{store.storeAddress}</p>
          </div>
          <div className="flex items-center gap-3">
            <Phone />
            <p>{store.phone}</p>
          </div>
        </section>
      </Container>
    </section>
  );
};

export default Store;
