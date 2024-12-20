import React, { useState, useEffect } from "react";
import { ScrollArea } from "../ui/scroll-area";
import instance from "@/utils/baseUrl";

const CategoryFilter = ({ setFilters, filters }) => {
  const [categories, setCategories] = useState([]);

  // Функция для получения категорий с API
  const fetchCategories = async () => {
    try {
      const response = await instance.get("/categories");
      setCategories(response.data);
    } catch (error) {
      console.log("Error fetching categories", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Обработчик изменения фильтра
  const handleCategoryChange = (category) => {
    if (filters?.category === category) {
      // Если категория уже выбрана, убираем фильтр
      setFilters("category", null);
    } else {
      // Устанавливаем выбранную категорию
      setFilters("category", category);
    }
  };

  return (
    <section className="w-[250px] border-[#ab386e] border-b pb-[25px]">
      <div>
        <h2 className="text-[22px] my-3">Kateqoriyalar</h2>
        <ScrollArea className="h-[150px]">
          <ul>
            {categories.length > 0 ? (
              categories.map((category) => (
                <li key={category._id} className="p-2">
                  <span
                    onClick={() => handleCategoryChange(category.title)}
                    className={`${
                      filters?.category === category.title
                        ? "text-[#ab386e] text-[20px]"
                        : ""
                    } cursor-pointer text-sm`}
                  >
                    {category.title}
                  </span>
                </li>
              ))
            ) : (
              <p>No categories available.</p>
            )}
          </ul>
        </ScrollArea>
      </div>
    </section>
  );
};

export default CategoryFilter;
