import React, { useState, useEffect } from "react";

const Search = ({ filters, setFilters }) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    // При изменении фильтра, обновляем состояние value
    if (filters?.search) {
      setValue(filters.search);
    }
  }, [filters]);

  const handleSearch = (search) => {
    if (search) {
      setFilters("search", search); // Обновляем фильтр в родителе
    } else {
      setFilters("search", null); // Убираем фильтр поиска, если строка пустая
    }
  };

  return (
    <section>
      <div className="w-full md:w-[500px]">
        <input
          value={value}
          onChange={(e) => {
            setValue(e.target.value); // Обновляем локальное состояние для поиска
            handleSearch(e.target.value); // Вызываем функцию для обновления фильтров
          }}
          className="border border-gray-400 rounded-sm p-3 outline-none w-full"
          placeholder="axtar..."
        />
      </div>
    </section>
  );
};

export default Search;
