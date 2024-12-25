import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import instance from "@/utils/baseUrl";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuthStore } from "@/stores/useAuthStore";

const StoreEditModal = ({ store, onUpdate }) => {
  const { user } = useAuthStore();

  const [formData, setFormData] = useState({
    name: store.storeName || "",
    address: store.storeAddress || "",
    photo: "",
    description: store.storeDescription || "",
  });
  const [storePhotoPreview, setStorePhotoPreview] = useState(
    store.storePhoto || null
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (store) {
      setFormData({
        name: store.storeName || "",
        address: store.storeAddress || "",
        photo: "",
        description: store.storeDescription || "",
      });
    }
  }, [store]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setStorePhotoPreview(URL.createObjectURL(file)); // Отображение превью изображения
      setFormData({ ...formData, photo: file });
    }
  };

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
      return response.data.secure_url;
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
      let photoUrl = store.storePhoto; // Сохраняем старое фото, если новое не загружено

      if (formData.photo) {
        photoUrl = await uploadToCloudinary(formData.photo);
        if (!photoUrl) throw new Error("Image upload failed");
      }

      const response = await instance.patch(`/store/update/${store._id}`, {
        storeName: formData.name,
        storeAddress: formData.address,
        storeDescription: formData.description,
        storePhoto: photoUrl,
      });

      toast.success("Mağaza məlumatları uğurla yeniləndi!");
      onUpdate(response.data.store);
    } catch (error) {
      console.error("Error updating store:", error);
      toast.error("Mağaza məlumatlarını yeniləmək mümkün olmadı!");
    } finally {
      setLoading(false);
    }
  };

  const isOwner = user && user._id === store.ownerId;
  return (
    <div>
      {isOwner && (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Mağazanı redaktə edin</Button>
          </DialogTrigger>
          <DialogContent aria-labelledby="dialog-title">
            <DialogHeader>
              <DialogHeader>
                <DialogTitle>Mağaza məlumatlarını redaktə edin</DialogTitle>
              </DialogHeader>
            </DialogHeader>
            <form
              className="space-y-4"
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Ad
                </label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Mağaza adı"
                />
              </div>
              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Ünvan
                </label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Mağaza ünvanı"
                />
              </div>
              <div>
                <label
                  htmlFor="photo"
                  className="block text-sm font-medium text-gray-700"
                >
                  Şəkil
                </label>
                <Input id="photo" type="file" onChange={handleFileChange} />
                {storePhotoPreview && (
                  <img
                    src={storePhotoPreview}
                    alt="Preview"
                    className="mt-2 w-40 h-40 object-cover rounded-md"
                  />
                )}
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Təsvir
                </label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Mağaza haqqında məlumat"
                />
              </div>
              <DialogFooter>
                <Button
                  variant="secondary"
                  onClick={() =>
                    setFormData({
                      name: store.storeName || "",
                      address: store.storeAddress || "",
                      photo: "",
                      description: store.storeDescription || "",
                    })
                  }
                  disabled={loading}
                >
                  Ləğv et
                </Button>
                <Button type="submit" variant="primary" disabled={loading}>
                  {loading ? "Yüklənir..." : "Yadda saxla"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default StoreEditModal;
