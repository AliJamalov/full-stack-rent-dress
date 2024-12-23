import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useStore } from "@/stores/useStore";
import { useNavigate } from "react-router-dom";

export function CreateStore() {
  const navigate = useNavigate();
  const { createStore } = useStore();
  const [storePhoto, setStorePhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    storeName: "",
    storeDescription: "",
    storePhoto: "",
    storeAddress: "",
    phone: "",
  });

  // Обработка изменений в текстовых полях
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Просто обновляем значение поля в formData
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Обработка выбора файла
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setStorePhoto(URL.createObjectURL(file)); // Отображаем превью изображения
    setFormData({
      ...formData,
      storePhoto: file,
    });
  };

  // Загрузка фото на Cloudinary
  const uploadToCloudinary = async (imageFile) => {
    const cloudName = "dfdds09gi"; // Замените на ваше имя
    const uploadPreset = "qslbztwu"; // Замените на ваш upload preset

    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", uploadPreset);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData
      );
      return response.data.secure_url; // Возвращает URL загруженного изображения
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      toast.error("Ошибка загрузки изображения!");
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      // Загрузка изображения на Cloudinary
      const imageUrl = await uploadToCloudinary(formData.storePhoto);
      if (imageUrl) {
        // Добавление URL изображения в данные формы
        const finalFormData = { ...formData, storePhoto: imageUrl };

        await createStore(finalFormData);
        toast.success("Mağaza uğurla yaradıldı!");
        navigate("/store-panel");
        setFormData({
          storeName: "",
          storeDescription: "",
          storePhoto: "",
          storeAddress: "",
          phone: "",
        });
        setStorePhoto(null);
      }
    } catch (error) {
      console.log("Ошибка создания магазина:", error.response || error.message);
      toast.error("Mağaza yaradılarkən xəta baş verdi!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 space-y-4">
      <h2 className="text-2xl font-semibold">Mağaza yarat</h2>
      <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
        {/* Store Name */}
        <div className="grid w-full items-center gap-2">
          <Label htmlFor="storeName">Mağaza adı</Label>
          <Input
            id="storeName"
            name="storeName"
            type="text"
            value={formData.storeName}
            onChange={handleChange}
            placeholder="Mağazanızın adını daxil edin"
            required
          />
        </div>

        {/* Store Description */}
        <div className="grid w-full items-center gap-2">
          <Label htmlFor="storeDescription">Mağaza təsviri</Label>
          <Textarea
            onChange={handleChange}
            value={formData.storeDescription}
            id="storeDescription"
            name="storeDescription"
            placeholder="Mağazanız haqqında məlumat verin"
            required
          />
        </div>

        {/* Store Photo */}
        <div className="grid w-full items-center gap-2">
          <Label htmlFor="storePhoto" className="flex items-center gap-2">
            <Camera size={20} className="text-gray-500" />
            Mağaza foto
          </Label>
          <div className="relative">
            <Input
              id="storePhoto"
              name="storePhoto"
              type="file"
              onChange={handleFileChange}
              required
              className="py-0 file:border-dashed file:border-2 file:border-gray-400 file:cursor-pointer file:rounded-md file:px-4 file:py-2 file:text-sm file:text-gray-700"
            />
            {/* Отображаем выбранное изображение, если оно есть */}
            {storePhoto && (
              <div className="mt-2">
                <img
                  src={storePhoto}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-md border border-gray-300"
                />
              </div>
            )}
          </div>
        </div>

        {/* Store Address */}
        <div className="grid w-full items-center gap-2">
          <Label htmlFor="storeAddress">Ünvan</Label>
          <Input
            id="storeAddress"
            onChange={handleChange}
            value={formData.storeAddress}
            name="storeAddress"
            type="text"
            placeholder="Ünvanınızı daxil edin"
            required
          />
        </div>

        {/* Store phone */}
        <div className="grid w-full items-center gap-2">
          <Label htmlFor="storeCity">Telefon nömrəsi</Label>
          <Input
            id="storeCity"
            onChange={handleChange}
            value={formData.phone}
            name="phone"
            type="text"
            placeholder="Telefon nömrəsini daxil edin"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-2">
          <Button type="submit" disabled={loading}>
            {loading ? "Yaradılır..." : "Mağaza yarat"}
          </Button>
          <Button
            onClick={() =>
              setFormData({
                storeName: "",
                storeDescription: "",
                storePhoto: "",
                storeAddress: "",
                phone: "",
              })
            }
            variant="outline"
            type="reset"
          >
            Təmizlə
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CreateStore;
