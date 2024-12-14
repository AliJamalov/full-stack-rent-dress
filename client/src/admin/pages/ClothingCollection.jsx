import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import AddModal from "../components/clothingCollection/AddModal";
import EditModal from "../components/clothingCollection/EditModal";
import instance from "@/utils/baseUrl";

const ClothingCollection = () => {
  const [collections, setCollections] = useState([]);
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const toggleAddModal = () => {
    setIsOpenAddModal(!isOpenAddModal);
  };

  const toggleEditModal = () => {
    setIsOpenEditModal(!isOpenEditModal);
  };

  const fetchCollections = async () => {
    try {
      const response = await instance.get("/clothingCollections");
      setCollections(response.data);
    } catch (error) {
      console.error("Ошибка при загрузке данных коллекций:", error);
    }
  };

  const handleDeleteCollection = async (id) => {
    try {
      await instance.delete(`/clothingCollections/${id}`);
      fetchCollections();
    } catch (error) {
      console.error("Ошибка при удалении коллекции:", error);
    }
  };

  const handleEditCollection = (item) => {
    setSelectedItem(item);
    toggleEditModal();
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Управление коллекциями</h1>
      <div className="flex justify-end mb-4">
        <Button onClick={toggleAddModal}>Добавить коллекцию</Button>
      </div>
      <div className="max-h-[500px] overflow-y-auto border border-gray-200 rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Название</TableCell>
              <TableCell>Картина</TableCell>
              <TableCell>Действия</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {collections &&
              collections.map((collection, index) => (
                <TableRow key={index}>
                  <TableCell>{collection._id}</TableCell>
                  <TableCell>{collection.title}</TableCell>
                  <TableCell>
                    <div className="w-[40px]">
                      <img
                        className="w-full rounded-md"
                        src={collection.image}
                        alt="collection-image"
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditCollection(collection)}
                      >
                        Редактировать
                      </Button>
                      <Button
                        onClick={() => handleDeleteCollection(collection._id)}
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
            fetchCollections={fetchCollections}
            toggleAddModal={toggleAddModal}
          />
        </div>
      )}
      {isOpenEditModal && (
        <div className="z-50 inset-0 fixed flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-sm">
          <EditModal
            fetchCollections={fetchCollections}
            toggleEditModal={toggleEditModal}
            item={selectedItem}
          />
        </div>
      )}
    </div>
  );
};

export default ClothingCollection;
