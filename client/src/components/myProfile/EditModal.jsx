import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import instance from "@/utils/baseUrl";
import toast from "react-hot-toast";

const EditModal = ({ isOpen, onClose, announcement, onSave }) => {
  const [formData, setFormData] = useState({
    category: "",
    pricePerDay: "",
    images: [],
    clothingCollection: "",
    description: "", // добавлено поле для описания
  });
  const [previewImage, setImagePreview] = useState([]);
  const [loading, setLoading] = useState(false);
  const [collections, setCollections] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (announcement) {
      setFormData({
        category: announcement.category || "",
        pricePerDay: announcement.pricePerDay || "",
        clothingCollection: announcement.clothingCollection || "",
        description: announcement.description || "",
        images: announcement.images || [],
      });
    }
  }, [announcement]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await instance.patch(`/announcements/${announcement._id}`, formData);
      toast.success("Elan uğurla dəyişdirildi");
      onSave();
      onClose();
    } catch (error) {
      console.error("Error updating announcement:", error);
      toast.error("Elanı yeniləmək mümkün olmadı");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      if (files.length > 3) {
        toast.error("Sadəcə 3 şəkil əlavə edə bilərsiniz!");
        return;
      }
      const imageUrls = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setFormData({ ...formData, images: imageUrls });
      setImagePreview(imageUrls);
    }
  };

  const fetchCollections = async () => {
    try {
      const response = await instance.get("/clothingCollections");
      setCollections(response.data);
    } catch (error) {
      console.log("error fetching collections");
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await instance.get("/categories");
      setCategories(response.data);
    } catch (error) {
      console.log("error fetching categories");
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchCollections();
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Elanı düzəlt</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {/* Category select */}
          <div>
            <label className="block">Kateqoriya</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Seçin</option>
              {categories.map((category) => (
                <option key={category._id} value={category.title}>
                  {category.title}
                </option>
              ))}
            </select>
          </div>

          {/* Collection select */}
          <div>
            <label className="block">Kolleksiya</label>
            <select
              name="clothingCollection"
              value={formData.clothingCollection}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Seçin</option>
              {collections.map((collection) => (
                <option key={collection._id} value={collection.title}>
                  {collection.title}
                </option>
              ))}
            </select>
          </div>

          {/* Price input */}
          <Input
            label="Günlük qiymət"
            name="pricePerDay"
            value={formData.pricePerDay}
            onChange={handleChange}
            placeholder="Qiyməti daxil edin (AZN)"
            type="number"
          />

          {/* Description textarea */}
          <div>
            <label className="block">Təsvir</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Təsviri daxil edin"
            />
          </div>

          {/* File input */}
          <Input
            label="Şəkillər"
            name="images"
            multiple
            onChange={handleFileChange}
            placeholder="Şəkillərin linklərini vergüllə ayırın"
            type="file"
            className="cursor-pointer"
          />

          {/* Preview images */}
          <div className="flex items-center gap-3">
            {previewImage.map((image, index) => (
              <div className="w-[100px]" key={index}>
                <img
                  className="w-full object-cover rounded-md"
                  src={image}
                  alt="preview-image"
                />
              </div>
            ))}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={loading}>
            İmtina et
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "yüklənir" : "dəyişdir"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditModal;
