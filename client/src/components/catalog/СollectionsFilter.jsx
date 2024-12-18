import React, { useState, useEffect } from "react";
import { ScrollArea } from "../ui/scroll-area"; // Используется для прокрутки, если нужно
import { Separator } from "../ui/separator"; // Разделитель для улучшения визуала
import instance from "@/utils/baseUrl"; // Подключение к API, если нужно

const CollectionsFilter = () => {
  const [collections, setCollections] = useState([]); // Хранение коллекций

  // Функция для получения коллекций с API
  const fetchCollections = async () => {
    try {
      const response = await instance.get("/clothingCollections");
      setCollections(response.data); // Заполняем состояние реальными коллекциями
    } catch (error) {
      console.log("Error fetching collections", error);
    }
  };

  useEffect(() => {
    fetchCollections(); // Загружаем коллекции при монтировании компонента
  }, []);

  return (
    <section className="w-[250px] pb-[25px] border-[#ab386e] border-b">
      <div>
        <h2 className="text-[22px] my-3">Collections</h2>
        <ScrollArea className="h-[150px]">
          <ul>
            {collections.length > 0 ? (
              collections.map((collection, index) => (
                <li key={index} className="p-2">
                  <span className="text-sm">{collection.title}</span>
                  {/* Отображаем только название коллекции */}
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
