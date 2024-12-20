import React, { useState, useEffect } from "react";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

const GenderFilter = ({ filters, setFilters }) => {
  const [selectedGender, setSelectedGender] = useState(filters?.gender || "");

  // Обработчик изменения значения
  const handleGenderChange = (value) => {
    // Если выбранный пол совпадает с текущим, сбрасываем фильтр
    if (selectedGender === value) {
      setSelectedGender(""); // Сбрасываем выбранный пол
      setFilters("gender", null); // Убираем фильтр из URL
    } else {
      setSelectedGender(value); // Устанавливаем новый фильтр
      setFilters("gender", value); // Обновляем фильтр в URL
    }
  };

  useEffect(() => {
    // При изменении filters, синхронизируем его с состоянием компонента
    if (filters?.gender && filters.gender !== selectedGender) {
      setSelectedGender(filters.gender);
    }
  }, [filters, selectedGender]);

  return (
    <section className="border-b w-[250px] pb-[25px] border-[#ab386e]">
      <div>
        <RadioGroup
          className="mt-3"
          value={selectedGender}
          onValueChange={handleGenderChange}
        >
          <div className="flex gap-2">
            <RadioGroupItem value="Kişi" id="kisi" />
            <Label htmlFor="kisi">Kişi</Label>
          </div>
          <div className="flex gap-2 mt-1">
            <RadioGroupItem value="Qadın" id="qadin" />
            <Label htmlFor="qadin">Qadın</Label>
          </div>
          <div className="flex gap-2 mt-1">
            <RadioGroupItem value="Uşaq" id="qadin" />
            <Label htmlFor="qadin">Uşaq</Label>
          </div>
        </RadioGroup>
      </div>
    </section>
  );
};

export default GenderFilter;
