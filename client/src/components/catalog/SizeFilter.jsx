import React from "react";

const SizeFilter = () => {
  const sizes = ["S", "M", "L", "XL", "XXL"]; // Массив размеров

  return (
    <section className="w-[250px] pb-[25px] border-b border-[#ab386e]">
      <div>
        <h2 className="text-[22px] my-3">Sizes</h2>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size, index) => (
            <button
              key={index}
              className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300"
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
