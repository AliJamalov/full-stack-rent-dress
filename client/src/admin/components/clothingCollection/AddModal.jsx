import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import instance from "@/utils/baseUrl";
import axios from "axios";
import toast from "react-hot-toast";

const AddModal = ({ fetchCollections, toggleAddModal }) => {
  const [formData, setFormData] = useState({
    title: "",
    image: null,
  });
  const [preview, setPreview] = useState(null); // Для предварительного просмотра
  const [isUploading, setIsUploading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      image: file,
    });

    // Устанавливаем URL для предварительного просмотра
    setPreview(URL.createObjectURL(file));
  };

  const uploadToCloudinary = async (imageFile) => {
    const cloudName = "dfdds09gi"; // Замените на ваше имя
    const uploadPreset = "qslbztwu"; // Замените на ваш upload preset

    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", uploadPreset);

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      formData
    );

    return response.data.secure_url; // Возвращает URL загруженного изображения
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsUploading(true);

      // Загрузка изображения в Cloudinary
      const imageUrl = await uploadToCloudinary(formData.image);

      // Отправляем данные на сервер
      await instance.post("/clothingCollections", {
        title: formData.title,
        image: imageUrl,
      });

      fetchCollections(); // Обновляем данные
      toggleAddModal(); // Закрываем модальное окно
      toast.success("коллеция успешна добавлена");
    } catch (error) {
      console.error("Ошибка при добавлении коллекции:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 w-1/3 max-h-[90vh] overflow-auto">
      <Card className="max-w-lg">
        <CardHeader>
          <CardTitle>Добавить коллекцию</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Название коллекции</Label>
              <Input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
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
                <div className="mt-4">
                  <img
                    src={preview}
                    alt="Предварительный просмотр"
                    className="w-full h-auto max-h-[200px] object-contain rounded-md border"
                  />
                </div>
              )}
            </div>
            <div className="flex justify-end gap-4">
              <Button type="button" variant="ghost" onClick={toggleAddModal}>
                Отмена
              </Button>
              <Button type="submit" disabled={isUploading}>
                {isUploading ? "Загрузка..." : "Добавить"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddModal;
