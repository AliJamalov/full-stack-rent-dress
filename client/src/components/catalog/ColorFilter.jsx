import React from "react";

const colors = [
  { name: "Qara", css: "#000000" }, // Чёрный
  { name: "Ağ", css: "#FFFFFF" }, // Белый
  { name: "Qırmızı", css: "#FF0000" }, // Красный
  { name: "Mavi", css: "#0000FF" }, // Синий
  { name: "Yaşıl", css: "#008000" }, // Зелёный
  { name: "Sarı", css: "#FFFF00" }, // Жёлтый
  { name: "Narıncı", css: "#FFA500" }, // Оранжевый
  { name: "Boz", css: "#808080" }, // Серый
  { name: "Bənövşəyi", css: "#800080" }, // Фиолетовый
  { name: "Çəhrayı", css: "#FFC0CB" }, // Розовый
  { name: "Qəhvəyi", css: "#A52A2A" }, // Коричневый
  { name: "Bej", css: "#F5F5DC" }, // Бежевый
  { name: "Göy", css: "#87CEEB" }, // Голубой
  { name: "Zeytun", css: "#6B8E23" }, // Оливковый
  { name: "Tünd qırmızı", css: "#8B0000" }, // Бордовый
  { name: "Gümüşü", css: "#C0C0C0" }, // Серебряный
  { name: "Qızılı", css: "#FFD700" }, // Золотой
];

const ColorFilter = ({ setFilters, filters }) => {
  const handleColorChange = (color) => {
    // Если цвет уже выбран, сбрасываем его (удаляем из фильтров)
    if (filters?.color === color) {
      setFilters("color", null);
    } else {
      setFilters("color", color); // Устанавливаем выбранный цвет
    }
  };

  return (
    <div className="w-[250px] pb-[25px] border-b border-[#ab386e]">
      <h2 className="text-[22px] my-3">Rənglər</h2>
      <div className="flex flex-wrap gap-2">
        {colors.map((color) => (
          <button
            key={color.name}
            style={{ backgroundColor: color.css }}
            className={`w-[40px] h-[40px] border border-gray-300 ${
              filters?.color === color.name ? "border-4 border-[#ab386e]" : ""
            }`}
            aria-label={color.name}
            onClick={() => handleColorChange(color.name)}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorFilter;
