import React, { useState, useEffect } from "react";
import { ScrollArea } from "../ui/scroll-area";
import instance from "@/utils/baseUrl";

const CollectionsFilter = ({ setFilters, filters }) => {
  const [collections, setCollections] = useState([]);

  const fetchCollections = async () => {
    try {
      const response = await instance.get("/clothingCollections");
      setCollections(response.data);
    } catch (error) {
      console.log("Error fetching collections", error);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  const handleCollectionChange = (collection) => {
    if (filters?.clothingCollection === collection) {
      setFilters("clothingCollection", null);
    } else {
      setFilters("clothingCollection", collection);
    }
  };

  return (
    <section className="w-[250px] pb-[25px] border-[#ab386e] border-b">
      <div>
        <h2 className="text-[22px] my-3">Kolleksiyalar</h2>
        <ScrollArea className="h-[150px]">
          <ul>
            {collections.length > 0 ? (
              collections.map((collection, index) => (
                <li key={index} className="p-2">
                  <span
                    onClick={() => handleCollectionChange(collection.title)}
                    className={`${
                      filters?.clothingCollection === collection.title
                        ? "text-[#ab386e] text-[20px]"
                        : ""
                    } cursor-pointer text-sm`}
                  >
                    {collection.title}
                  </span>
                </li>
              ))
            ) : (
              <p>No collections available.</p>
            )}
          </ul>
        </ScrollArea>
      </div>
    </section>
  );
};

export default CollectionsFilter;
