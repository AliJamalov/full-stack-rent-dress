import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import instance from "@/utils/baseUrl";
import toast from "react-hot-toast";
import { useEffect } from "react";

const EditModal = ({ setIsEditModal, user, fetchUsers }) => {
  const [formData, setFormData] = useState({
    role: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        role: user.role || "user",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await instance.patch(`/users/${user._id}`, formData);
      toast.success("Пользователь успешно обновлён!");
      setIsEditModal(false);
      fetchUsers();
    } catch (error) {
      console.error("Ошибка при обновлении пользователя", error);
      toast.error("Не удалось обновить пользователя");
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 w-1/3">
      <h1 className="text-xl font-bold mb-4">Редактировать пользователя</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="role" className="block font-medium">
            Роль
          </label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-md"
          >
            <option value="user">Пользователь</option>
            <option value="admin">Администратор</option>
            <option value="owner">Владелец</option>
          </select>
        </div>
        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            onClick={() => setIsEditModal(false)}
            variant="ghost"
          >
            Отмена
          </Button>
          <Button type="submit">Сохранить</Button>
        </div>
      </form>
    </div>
  );
};

export default EditModal;
