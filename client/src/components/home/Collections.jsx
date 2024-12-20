import React, { useEffect, useState } from "react";
import Container from "../common/Container";
import instance from "@/utils/baseUrl";
import { SkeletonCard } from "../skeletons/CollectionsSkeleton";
import { Link } from "react-router-dom";

const Collections = () => {
  const [collections, setCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCollections = async () => {
    try {
      setIsLoading(true);
      const response = await instance.get("/clothingCollections");
      setCollections(response.data);
    } catch (error) {
      console.log("error fetching data", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  // Количество заглушек (по умолчанию, пока данные не загружены)
  const skeletonArray = Array(6).fill(null);

  return (
    <section className="my-[40px]">
      <Container>
        <h1 className="text-3xl font-semibold mb-4">Kolleksiyalar</h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading
            ? skeletonArray.map((_, index) => <SkeletonCard key={index} />)
            : collections.map((item, index) => (
                <Link
                  to={`/catalog?clothingCollection=${item.title}`}
                  key={index}
                  className="my-2"
                >
                  <div className="w-full h-[250px] sm:h-[300px] md:h-[300px] lg:h-[300px]">
                    <img
                      className="w-full h-full object-cover rounded-lg"
                      src={item.image}
                      alt={item.title}
                    />
                  </div>
                  <p className="mt-2">{item.title}</p>
                </Link>
              ))}
        </div>
      </Container>
    </section>
  );
};

export default Collections;
