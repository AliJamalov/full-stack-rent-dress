import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import instance from "@/utils/baseUrl";
import toast from "react-hot-toast";

const AddModal = ({ togleAddModal, fetchCategories }) => {
  const [formData, setFormData] = useState({
    title: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      await instance.post("/categories", formData);
    } catch (error) {
      console.log("error creating category", error);
    }
    toast.success("Категория успешно создана!");
    fetchCategories();
    togleAddModal(false);
    setFormData({
      title: "",
    });
  };

  return (
    <div>
      <Card className="max-w-lg">
        <CardHeader>
          <CardTitle>Создать новую категорию</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddCategory} className="space-y-4">
            <div>
              <Label htmlFor="title">Категория</Label>
              <Input
                id="title"
                name="title"
                type="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Введите категорию"
              />
            </div>
            <Button type="submit" className="w-full">
              Создать
            </Button>
            <Button
              type="button"
              onClick={() => togleAddModal(false)}
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
