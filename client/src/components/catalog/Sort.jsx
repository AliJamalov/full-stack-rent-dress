import React from "react";

const Sort = ({ filters, setFilters }) => {
  const handleSort = (value) => {
    if (filters?.sort === value) {
      setFilters("sortBy", null); // Убираем сортировку, если выбран тот же фильтр
    } else {
      setFilters("sortBy", value); // Устанавливаем выбранную сортировку
    }
  };

  return (
    <section>
      <div>
        <select
          className="py-3 px-2 cursor-pointer"
          onChange={(e) => handleSort(e.target.value)}
        >
          <option value="lowtohigh">Əvvəlcə ucuzlar</option>
          <option value="hightolow">Əvvəlcə bahalılar</option>
          <option value="newest">Əvvəlcə yenilər</option>
          <option value="oldest">Əvvəlcə köhnələr</option>
        </select>
      </div>
    </section>
  );
};

export default Sort;
