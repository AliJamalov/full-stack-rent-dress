import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import instance from "@/utils/baseUrl";
import axios from "axios";

const EditModal = ({ toggleEditModal, fetchCollections, item }) => {
  const [formData, setFormData] = useState({
    title: "",
    image: null,
  });
  const [preview, setPreview] = useState(null); // Для предварительного просмотра
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (item) {
      setFormData({
        title: item.title,
        image: item.image,
      });
      setPreview(item.image); // Устанавливаем текущее изображение в превью
    }
  }, [item]);

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
    setPreview(URL.createObjectURL(file)); // Предварительный просмотр нового изображения
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

      let imageUrl = formData.image;
      // Если пользователь выбрал новый файл, загружаем его на Cloudinary
      if (formData.image && typeof formData.image !== "string") {
        imageUrl = await uploadToCloudinary(formData.image);
      }

      // Отправляем обновлённые данные на сервер
      await instance.patch(`/clothingCollections/${item._id}`, {
        title: formData.title,
        image: imageUrl,
      });

      fetchCollections(); // Обновляем данные коллекций
      toggleEditModal(); // Закрываем модальное окно
    } catch (error) {
      console.error("Ошибка при редактировании коллекции:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 w-1/3 max-h-[90vh] overflow-auto">
      <Card>
        <CardHeader>
          <CardTitle>Редактировать коллекцию</CardTitle>
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
              />
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
              <Button type="button" variant="ghost" onClick={toggleEditModal}>
                Отмена
              </Button>
              <Button type="submit" disabled={isUploading}>
                {isUploading ? "Сохранение..." : "Сохранить"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditModal;
