import React, { useState, useEffect } from "react";

const SizeFilter = ({ filters, setFilters }) => {
  const sizes = ["S", "M", "L", "XL", "XXL"];
  const [selectedSize, setSelectedSize] = useState(filters?.size || "");

  // Обработчик изменения размера
  const handleSizeChange = (size) => {
    // Если выбранный размер совпадает с текущим, сбрасываем фильтр
    if (selectedSize === size) {
      setSelectedSize(""); // Сбрасываем выбранный размер
      setFilters("size", null); // Убираем фильтр из URL
    } else {
      setSelectedSize(size); // Устанавливаем новый фильтр
      setFilters("size", size); // Обновляем фильтр в URL
    }
  };

  useEffect(() => {
    // При изменении filters, синхронизируем его с состоянием компонента
    if (filters?.size && filters.size !== selectedSize) {
      setSelectedSize(filters.size);
    }
  }, [filters, selectedSize]);

  return (
    <section className="w-[250px] pb-[25px] border-b border-[#ab386e]">
      <div>
        <h2 className="text-[22px] my-3">Ölçülər</h2>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              className={`px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300 ${
                selectedSize === size ? "bg-[#ab386e] text-white" : ""
              }`}
              onClick={() => handleSizeChange(size)}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SizeFilter;
