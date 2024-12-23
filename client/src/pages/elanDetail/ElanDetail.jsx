import instance from "@/utils/baseUrl";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "@/components/common/Container";
import { TailSpin } from "react-loader-spinner";

const ElanDetail = () => {
  const { elanId } = useParams();

  const [elan, setElan] = useState({});
  const [activeImage, setActiveImage] = useState(null);

  const fetchElanById = async () => {
    try {
      const response = await instance.get(`/announcements/annId/${elanId}`);
      setElan(response.data);
      setActiveImage(response.data.images);
      console.log(response);
    } catch (error) {
      console.log("error fetching", error);
    }
  };

  useEffect(() => {
    fetchElanById();
  }, []);

  if (!elan) {
    return (
      <div className="flex justify-center items-center h-screen">
        <TailSpin color="#ab386e" />
      </div>
    );
  }

  return (
    <div>
      <Container>
        <div className="container mx-auto py-10">
          <div className="lg:flex justify-between items-start">
            <div className="lg:w-1/2 p-5">
              {/* active image */}
              <div className="border p-3 rounded-md overflow-hidden shadow-lg">
                <img
                  src={activeImage}
                  loading="lazy"
                  alt="elan-image"
                  className="w-full h-64 object-contain"
                />
              </div>
              {/* images */}
              <div className="flex mt-3 space-x-2">
                {Array.isArray(elan?.images) && elan.images.length > 0 ? (
                  elan.images.map((image, index) => (
                    <div key={index}>
                      <img
                        onClick={() => setActiveImage(image)}
                        className={`w-16 h-16 object-cover cursor-pointer border ${
                          activeImage === image
                            ? "border-[#ab386e]"
                            : "border-gray-300"
                        }`}
                        src={image}
                        alt="image"
                      />
                    </div>
                  ))
                ) : (
                  <p>No images available</p>
                )}
              </div>
            </div>
            <div className="lg:w-1/2 lg:pl-10 mt-8 lg:mt-0">
              <h2 className="text-2xl font-bold">Təsvir</h2>
              <p className="text-gray-700 mt-4">{elan.description}</p>

              <p className="text-lg font-semibold text-gray-800 mt-4">
                Kolleksiya: {elan.clothingCollection}
              </p>
              <p className="text-lg text-gray-800 mt-2">
                Kateqoriya: {elan.category}
              </p>
              <p className="text-lg text-gray-800 mt-2">Brend: {elan.brand}</p>
              <p className="text-lg text-gray-800 mt-2">Ölçü: {elan.size}</p>
              <p className="text-lg text-gray-800 mt-2">
                Günlük qiymət: {elan.pricePerDay} AZN
              </p>
              <p className="text-lg text-gray-800 mt-2">Şəhər: {elan.city}</p>
              <p className="text-lg text-gray-800 mt-2">
                Telefon: {elan.userPhone}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ElanDetail;
