import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import instance from "@/utils/baseUrl";
import toast from "react-hot-toast";

const AddModal = ({ setIsOpenModal, fetchUsers }) => {
  const [formData, setFormData] = useState({
    userName: "",
    firstName: "",
    phone: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await instance.post("/auth/register", formData);
    } catch (error) {
      console.log("error creating user", error);
    }
    toast.success("Пользователь успешно создан!");
    setIsOpenModal();
    fetchUsers();
  };

  return (
    <div>
      <Card className="max-w-lg">
        <CardHeader>
          <CardTitle>Создать нового пользователя</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="userName">Никнейм</Label>
              <Input
                id="userName"
                name="userName"
                type="text"
                value={formData.userName}
                onChange={handleChange}
                placeholder="Введите никнейм"
                required
              />
            </div>
            <div>
              <Label htmlFor="userName">Имя</Label>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Введите имя"
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">Телефон</Label>
              <Input
                id="phone"
                name="phone"
                type="text"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Введите телефон"
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Введите пароль"
                required
              />
            </div>
            <div>
              <Label htmlFor="role">Роль</Label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-md"
              >
                <option value="owner">Владелец</option>
                <option value="admin">Администратор</option>
                <option value="user">Пользователь</option>
              </select>
            </div>
            <Button type="submit" className="w-full">
              Создать
            </Button>
            <Button
              type="button"
              onClick={() => setIsOpenModal(false)}
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
