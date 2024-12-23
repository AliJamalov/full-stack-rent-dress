import instance from "@/utils/baseUrl";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

const Store = () => {
  const navigate = useNavigate();
  const [storeInform, setStoreInform] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStoredata = async () => {
      setLoading(true);
      try {
        const response = await instance.get("/store/get");
        setStoreInform(response.data);
      } catch (error) {
        console.log("error fetching store data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStoredata();
  }, []);

  if (!storeInform?.length) {
    return (
      <div className="flex items-center justify-center">
        <Button onClick={() => navigate("/create-store")}>Mağaza yarat.</Button>
      </div>
    );
  }

  return (
    <section className="flex justify-center bg-slate-100 py-6">
      {storeInform &&
        storeInform.map((store, index) => (
          <div key={index}>
            <div className="max-w-[300px]">
              <img
                className="w-full object-contain rounded-md"
                src={store.storePhoto}
                alt={store.storeName}
              />
            </div>
            <ol className="list-disc pl-5 my-3">
              <li>{store.storeDescription}</li>
              <li>{store.storeAddress}</li>
              <li>{store.phone}</li>
            </ol>
          </div>
        ))}
    </section>
  );
};

export default Store;
