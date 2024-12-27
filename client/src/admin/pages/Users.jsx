import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import AddModal from "../components/users/AddModal";
import EditModal from "../components/users/EditModal";
import instance from "@/utils/baseUrl";
import toast from "react-hot-toast";

const Users = () => {
  const [isOpenAddModal, setIsOpenModal] = useState(false);
  const [isOpenEditModal, setIsEditModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleOpenAddModal = () => {
    setIsOpenModal(!isOpenAddModal);
  };

  const fetchUsers = async () => {
    try {
      const response = await instance.get("/users");
      setUsers(response.data);
    } catch (error) {
      console.log("error fetching users", error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await instance.delete(`/users/${id}`);
      fetchUsers();
      toast.success("пользователь был удален");
    } catch (error) {
      console.log("error deleting", error);
    }
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setIsEditModal(true);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Управление пользователями</h1>
      <div className="flex justify-end mb-4">
        <Button onClick={handleOpenAddModal}>Добавить пользователя</Button>
      </div>
      {/* Контейнер с прокруткой */}
      <div className="max-h-[500px] overflow-y-auto border border-gray-200 rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Имя</TableCell>
              <TableCell>Никнейм</TableCell>
              <TableCell>Роль</TableCell>
              <TableCell>Действия</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users &&
              users.map((user, index) => (
                <TableRow key={index}>
                  <TableCell>{user._id}</TableCell>
                  <TableCell>{user.firstName}</TableCell>
                  <TableCell>{user.userName}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleEditUser(user)}
                        variant="ghost"
                        size="sm"
                      >
                        Редактировать
                      </Button>
                      <Button
                        onClick={() => handleDeleteUser(user._id)}
                        variant="destructive"
                        size="sm"
                      >
                        Удалить
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
      {isOpenAddModal && (
        <div className="z-50 inset-0 fixed flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-sm">
          <AddModal
            fetchUsers={fetchUsers}
            setIsOpenModal={handleOpenAddModal}
          />
        </div>
      )}
      {isOpenEditModal && (
        <div className="z-50 inset-0 fixed flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-sm">
          <EditModal
            user={selectedUser}
            fetchUsers={fetchUsers}
            setIsEditModal={setIsEditModal}
          />
        </div>
      )}
    </div>
  );
};

export default Users;
