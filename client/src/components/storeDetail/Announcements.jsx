import React, { useEffect, useState } from "react";
import Container from "../common/Container";
import instance from "@/utils/baseUrl";
import { TailSpin } from "react-loader-spinner";

const Announcements = ({ storeId }) => {
  const [announcement, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAnnonuncements = async () => {
    setLoading(true);
    try {
      const response = await instance.get(`/announcements/${storeId}`);
      setAnnouncements(response.data.announcements);
    } catch (error) {
      console.log("error fetching data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnonuncements();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <TailSpin color="#ab386e" />
      </div>
    );
  }

  return (
    <section className="md:px-[200px]">
      <Container>
        <section>
          <h1 className="text-[32px] font-medium my-5">Elanlar</h1>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
            {announcement &&
              announcement.map((elan, index) => (
                <div key={index}>
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
                          {new Date(elan.createdAt).toLocaleTimeString(
                            "az-AZ",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </section>
      </Container>
    </section>
  );
};

export default Announcements;
