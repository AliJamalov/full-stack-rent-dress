import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import instance from "@/utils/baseUrl";
import toast from "react-hot-toast";

const EditModal = ({ toggleEditModal, item, fetchHeroData }) => {
  const [formData, setFormData] = useState({
    description: "",
    image: null,
  });
  const [preview, setPreview] = useState(null); // Для предварительного просмотра

  useEffect(() => {
    if (item) {
      setFormData({
        description: item.description,
        image: item.image,
      });
      setPreview(item.image); // Устанавливаем текущее изображение как превью
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
    setPreview(URL.createObjectURL(file)); // Устанавливаем предварительное изображение
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = formData.image;

      // Если файл изображения был изменён, загружаем его в Cloudinary
      if (formData.image && typeof formData.image !== "string") {
        const cloudName = "dfdds09gi"; // Ваш cloudName
        const uploadPreset = "qslbztwu"; // Ваш upload preset

        const fileData = new FormData();
        fileData.append("file", formData.image);
        fileData.append("upload_preset", uploadPreset);

        const response = await instance.post(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          fileData
        );

        imageUrl = response.data.secure_url;
      }

      // Отправляем обновлённые данные на сервер
      await instance.patch(`/heroSections/${item._id}`, {
        description: formData.description,
        image: imageUrl,
      });

      toast.success("Данные успешно обновлены!");
      toggleEditModal(); // Закрываем модальное окно
      fetchHeroData(); // Обновляем таблицу
    } catch (error) {
      console.error("Ошибка при обновлении данных", error);
      toast.error("Не удалось обновить данные.");
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 w-1/3 max-h-[90vh] overflow-auto">
      <Card>
        <CardHeader>
          <CardTitle>Редактировать картину</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="description">Описание</Label>
              <Input
                id="description"
                name="description"
                type="text"
                value={formData.description}
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
                <div className="mt-2">
                  <img
                    src={preview}
                    alt="Предварительный просмотр"
                    className="w-full max-h-[200px] rounded-md object-contain border"
                  />
                </div>
              )}
            </div>
            <div className="flex justify-end gap-4">
              <Button type="button" variant="ghost" onClick={toggleEditModal}>
                Отмена
              </Button>
              <Button type="submit">Сохранить</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditModal;
