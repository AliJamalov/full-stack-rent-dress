import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import AddModal from "../components/heroSection/AddModal";
import instance from "@/utils/baseUrl";
import { useEffect } from "react";
import EditModal from "../components/heroSection/EditModal";

const HeroSection = () => {
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [heroData, setHeroData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);

  const toggleEditModal = () => {
    setIsOpenEditModal(!isOpenEditModal);
  };

  const togleAddModal = () => {
    setIsOpenAddModal(!isOpenAddModal);
  };

  const handleEdit = (item) => {
    setSelectedItem(item); // Устанавливаем текущую запись
    toggleEditModal(); // Открываем модальное окно
  };

  const fetchHeroData = async () => {
    try {
      const response = await instance.get("/heroSections");
      setHeroData(response.data);
    } catch (error) {
      console.log("error fetching data", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await instance.delete(`/heroSections/${id}`);
    } catch (error) {
      console.log("error deleting", error);
    }
    fetchHeroData();
  };

  useEffect(() => {
    fetchHeroData();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Управление главной картиной</h1>
      <div className="flex justify-end mb-4">
        <Button onClick={togleAddModal}>Добавить картину</Button>
      </div>
      {/* Контейнер с прокруткой */}
      <div className="max-h-[500px] overflow-y-auto border border-gray-200 rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Описание</TableCell>
              <TableCell>Картина</TableCell>
              <TableCell>Действия</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {heroData &&
              heroData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item._id}</TableCell>
                  <TableCell className="truncate max-w-[200px] overflow-hidden whitespace-nowrap">
                    {item.description}
                  </TableCell>
                  <TableCell>
                    <div className="w-[40px]">
                      <img
                        className="w-full rounded-md"
                        src={item.image}
                        alt="hero-image"
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(item)}
                      >
                        Редактировать
                      </Button>
                      <Button
                        onClick={() => handleDelete(item._id)}
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
            fetchHeroData={fetchHeroData}
            togleAddModal={togleAddModal}
          />
        </div>
      )}
      {isOpenEditModal && (
        <div className="z-50 inset-0 fixed flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-sm">
          <EditModal
            toggleEditModal={toggleEditModal}
            item={selectedItem}
            fetchHeroData={fetchHeroData}
          />
        </div>
      )}
    </div>
  );
};

export default HeroSection;
