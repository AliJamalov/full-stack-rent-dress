import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import instance from "@/utils/baseUrl";
import axios from "axios";
import toast from "react-hot-toast";

const AddModal = ({ togleAddModal, fetchHeroData }) => {
  const [formData, setFormData] = useState({
    description: "",
    image: null,
  });
  const [preview, setPreview] = useState(null); // Для предварительного просмотра
  const [isUploading, setIsUploading] = useState(false);

  // Обработка выбора файла
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      image: file,
    });

    // Устанавливаем URL для предварительного просмотра
    setPreview(URL.createObjectURL(file));
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const uploadToCloudinary = async (imageFile) => {
    const cloudName = "dfdds09gi"; // Замените на ваше имя из Cloudinary
    const uploadPreset = "qslbztwu"; // Замените на ваш upload preset

    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", uploadPreset);

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      formData
    );
    return response.data.secure_url; // URL загруженного изображения
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.image || !formData.description) {
      return;
    }

    try {
      setIsUploading(true);

      // Загружаем изображение в Cloudinary
      const imageUrl = await uploadToCloudinary(formData.image);

      // Отправляем данные на сервер
      await instance.post("/heroSections", {
        description: formData.description,
        image: imageUrl,
      });

      toast.success("Картина успешно добавлена!");
      setFormData({ description: "", image: null });
      setPreview(null); // Сбрасываем предварительный просмотр
      togleAddModal(false);
      fetchHeroData();
    } catch (error) {
      console.error("Ошибка при загрузке", error);
      toast.error("Не удалось загрузить картину.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 w-1/3 max-h-[90vh] overflow-auto">
      <Card className="max-w-lg">
        <CardHeader>
          <CardTitle>Создать новую картину</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="image">Картина</Label>
              <Input
                id="image"
                name="image"
                type="file"
                onChange={handleFileChange}
                className="cursor-pointer"
                required
              />
              {/* Предварительный просмотр */}
              {preview && (
                <div className="mt-2  border rounded-md p-2">
                  <img
                    src={preview}
                    alt="Предварительный просмотр"
                    className="w-full h-auto rounded-md"
                  />
                </div>
              )}
            </div>
            <div>
              <Label htmlFor="description">Описание</Label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Введите описание"
                required
                className="w-full border p-2 border-black rounded-md"
              />
            </div>
            <Button type="submit" className="w-full" disabled={isUploading}>
              {isUploading ? "Загрузка..." : "Создать"}
            </Button>
            <Button
              type="button"
              onClick={() => {
                togleAddModal(false);
                setPreview(null); // Сбрасываем предварительный просмотр
              }}
              className="w-full"
            >
              Закрыть
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddModal;
