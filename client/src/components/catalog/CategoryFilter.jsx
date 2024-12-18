import React, { useState, useEffect } from "react";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import instance from "@/utils/baseUrl"; // Подключение к API, если нужно

const CategoryFilter = () => {
  const [categories, setCategories] = useState([]); // Хранение категорий

  // Функция для получения категорий с API
  const fetchCategories = async () => {
    try {
      const response = await instance.get("/categories");
      setCategories(response.data); // Заполняем состояние реальными категориями
    } catch (error) {
      console.log("Error fetching categories", error);
    }
  };

  useEffect(() => {
    fetchCategories(); // Загружаем категории при монтировании компонента
  }, []);

  return (
    <section className="w-[250px] border-[#ab386e] border-b">
      <div>
        <h2 className="text-[22px] my-3">Categories</h2>
        <ScrollArea className="h-[150px]">
          <ul>
            {categories.length > 0 ? (
              categories.map((category) => (
                <li key={category.id} className="p-2">
                  <span className="text-sm">{category.title}</span>
                  {/* Отображаем только название категории */}
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
