import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import Container from "@/components/common/Container";
import instance from "@/utils/baseUrl";
import toast from "react-hot-toast";
import { useAuthStore } from "@/stores/useAuthStore";
import { uploadImages } from "@/utils/cloudinary";
import { Label } from "@/components/ui/label";

const CreateAnnouncementForm = () => {
  const { user } = useAuthStore();
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

  const initialForm = {
    clothingCollection: "",
    category: "",
    size: "",
    gender: "",
    color: "",
    pricePerDay: "",
    city: "",
    description: "",
    images: [],
    userPhone: "",
  };

  // Общий state для формы
  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData((prevData) => ({
        ...prevData,
        userPhone: user.phone,
      }));
    }
  }, [user]);

  const [collections, setCollections] = useState([]);
  const [categories, setCategories] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  // Универсальная функция для обработки изменений в input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenderChange = (value) => {
    setFormData((prev) => ({ ...prev, gender: value }));
  };

  // Обработка выбора файлов с предварительным просмотром
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 4) {
      toast("Maksimum 4 şəkil yükləyə bilərsiniz!");
      return;
    }

    setFormData((prev) => ({ ...prev, images: files }));

    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const fetchCollections = async () => {
    try {
      const response = await instance.get("/clothingCollections");
      setCollections(response.data);
    } catch (error) {
      console.log("Error fetching collections", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await instance.get("/categories");
      setCategories(response.data);
    } catch (error) {
      console.log("Error fetching categories", error);
    }
  };

  useEffect(() => {
    fetchCollections();
    fetchCategories();
  }, []);

  const createAnnouncement = async (e) => {
    e.preventDefault();

    // Проверка заполненности всех обязательных полей
    if (
      !formData.clothingCollection ||
      !formData.category ||
      !formData.size ||
      !formData.color ||
      !formData.pricePerDay ||
      !formData.city ||
      !formData.gender ||
      !formData.description ||
      !formData.images ||
      !formData.userPhone
    ) {
      toast("Zəhmət olmasa bütün sahələri doldurun");
      return;
    }

    // Загрузка изображений на Cloudinary перед отправкой данных формы
    const uploadedImageUrls = await uploadImages(formData.images);

    // Обновление данных формы с URL изображений
    const updatedFormData = { ...formData, images: uploadedImageUrls };
    setLoading(true);

    try {
      // Отправка данных формы на сервер
      await instance.post("/announcements", updatedFormData);
      toast.success("Elan uğurla yaradıldı");

      // Сброс данных формы
      setFormData({
        ...initialForm,
        userPhone: user.phone, // Снова задаём userPhone
      });
      setImagePreviews([]);
    } catch (error) {
      console.log("Error creating announcement", error);
      toast.error("Elan yaradılarkən xəta baş verdi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto mb-[50px] lg:px-[350px]">
      <Container>
        <h1 className="text-2xl font-semibold mb-4">Elan Yaradın</h1>
        <form
          onSubmit={createAnnouncement}
          className="space-y-6 bg-white p-6 rounded-lg shadow-md bg-gradient-to-br from-blue-100 to-blue-200"
        >
          {/* Clothing Collection */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Paltar Kolleksiyası
            </label>
            <Select
              value={formData.clothingCollection}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, clothingCollection: value }))
              }
            >
              <SelectTrigger className="w-full p-2 border rounded-md">
                <SelectValue placeholder="Paltar kolleksiyasını seçin" />
              </SelectTrigger>
              <SelectContent>
                {collections.map((item, index) => (
                  <SelectItem key={index} value={item.title}>
                    {item.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">Kateqoriya</label>
            <Select
              value={formData.category}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, category: value }))
              }
            >
              <SelectTrigger className="w-full p-2 border rounded-md">
                <SelectValue placeholder="Kateqoriyanı seçin" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat, index) => (
                  <SelectItem key={index} value={cat.title}>
                    {cat.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Size */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">Ölçü</label>
            <Select
              value={formData.size}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, size: value }))
              }
            >
              <SelectTrigger className="w-full p-2 border rounded-md">
                <SelectValue placeholder="Ölçü seçin" />
              </SelectTrigger>
              <SelectContent>
                {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                  <SelectItem key={size} value={size}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Color */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">Rəng</label>
            <Select
              value={formData.color}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, color: value }))
              }
            >
              <SelectTrigger className="w-full p-2 border rounded-md">
                <SelectValue placeholder="Rəng seçin" />
              </SelectTrigger>
              <SelectContent>
                {colors.map((item) => (
                  <SelectItem key={item.name} value={item.css}>
                    <div className="flex items-center space-x-2">
                      <span
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: item.css }}
                      ></span>
                      <span>{item.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Price */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">Günlük qiymət</label>
            <Input
              name="pricePerDay"
              value={formData.pricePerDay}
              onChange={handleInputChange}
              placeholder="Günlük qiymət"
              type="number"
            />
          </div>

          {/* City */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">Şəhər</label>
            <Input
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              placeholder="Şəhər"
            />
          </div>
          {/* Gender */}
          <RadioGroup
            value={formData.gender}
            onValueChange={handleGenderChange}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Kişi" id="option-one" />
              <Label htmlFor="option-one">Kişi</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Qadın" id="option-two" />
              <Label htmlFor="option-two">Qadın</Label>
            </div>
          </RadioGroup>

          {/* Image Upload */}
          <div className="space-y-2">
            <label className="block ml-3 text-sm font-medium">
              Şəkillər (maks. 4)
            </label>
            <div className="w-full p-6 border-2 border-dashed border-gray-300 rounded-md cursor-pointer text-center hover:bg-gray-50">
              <span className="text-gray-600 font-medium">Şəkilləri seçin</span>
              <Input
                id="file-upload"
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="cursor-pointer"
              />
            </div>

            {/* Preview images */}
            <div className="flex flex-wrap gap-2 mt-5">
              {imagePreviews.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`preview ${index}`}
                  className="w-24 h-24 object-cover rounded-md border"
                />
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">Təsvir</label>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              placeholder="Elan təsviri"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-[#ab386e] text-white py-2 rounded-md"
            disabled={loading}
          >
            {loading ? <p>Yüklənir...</p> : <p>Elan Yarat</p>}
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default CreateAnnouncementForm;
