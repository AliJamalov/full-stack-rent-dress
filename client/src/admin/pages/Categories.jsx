import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import AddModal from "../components/categories/AddModal";
import instance from "@/utils/baseUrl";
import toast from "react-hot-toast";

const Categories = () => {
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [categories, setCategories] = useState([]);

  const togleAddModal = () => {
    setIsOpenAddModal(!isOpenAddModal);
  };

  const fetchCategories = async () => {
    try {
      const respone = await instance.get("/categories");
      setCategories(respone.data);
    } catch (error) {
      console.log("error fetching categories", error);
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await instance.delete(`/categories/${id}`);
    } catch (error) {
      console.log("error fetching categories", error);
    }
    toast.success("категория была успешна удалена!");
    fetchCategories();
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Управление категориями</h1>
      <div className="flex justify-end mb-4">
        <Button onClick={togleAddModal}>Добавить категорию</Button>
      </div>
      <div className="max-h-[500px] overflow-y-auto border border-gray-200 rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Название</TableCell>
              <TableCell>Действия</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories &&
              categories.map((category, index) => (
                <TableRow key={index}>
                  <TableCell>{category._id}</TableCell>
                  <TableCell>{category.title}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleDeleteCategory(category._id)}
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
            fetchCategories={fetchCategories}
            togleAddModal={togleAddModal}
          />
        </div>
      )}
    </div>
  );
};

export default Categories;
