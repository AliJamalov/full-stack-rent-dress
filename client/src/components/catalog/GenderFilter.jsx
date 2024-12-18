import React, { useState } from "react";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

const GenderFilter = () => {
  // Состояние для выбранного пола
  const [selectedGender, setSelectedGender] = useState("");

  // Обработчик изменения значения
  const handleGenderChange = (value) => {
    setSelectedGender(value);
  };

  return (
    <section className="border-b w-[250px] pb-[25px] border-[#ab386e]">
      <div>
        <Label className="text-[22px]">Gender</Label>
        <RadioGroup
          className="mt-3"
          value={selectedGender}
          onValueChange={handleGenderChange}
        >
          <div className="flex gap-2">
            <RadioGroupItem value="kisi" id="kisi" />
            <Label htmlFor="kisi">Kişi</Label>
          </div>
          <div className="flex gap-2 mt-1">
            <RadioGroupItem value="qadin" id="qadin" />
            <Label htmlFor="qadin">Qadın</Label>
          </div>
        </RadioGroup>
      </div>
    </section>
  );
};

export default GenderFilter;
