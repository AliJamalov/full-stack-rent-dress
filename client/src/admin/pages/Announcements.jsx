import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import instance from "@/utils/baseUrl";

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);

  const fetchAnnouncements = async () => {
    try {
      const response = await instance.get("/announcements");
      setAnnouncements(response.data.announcements);
    } catch (error) {
      console.log("error fethcing data", error);
    }
  };

  const deleteAnnouncements = async (id) => {
    try {
      await instance.delete(`/announcements/${id}`);
      fetchAnnouncements();
    } catch (error) {
      console.log("error deleting", error);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);
  console.log(announcements);
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Управление объявлениями</h1>
      <div className="max-h-[500px] overflow-y-auto border border-gray-200 rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>Категория</TableCell>
              <TableCell>Цена</TableCell>
              <TableCell>Коллекция</TableCell>
              <TableCell>Размер</TableCell>
              <TableCell>Картина</TableCell>
              <TableCell>Действия</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {announcements.map((item, index) => (
              <TableRow key={index} className="hover:bg-gray-50">
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.pricePerDay} AZN</TableCell>
                <TableCell>{item.clothingCollection}</TableCell>
                <TableCell>{item.size}</TableCell>
                <TableCell>
                  <div className="w-[40px]">
                    <img
                      className="w-full h-auto rounded-md"
                      src={item.images[0]}
                      alt="announcements-image"
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => deleteAnnouncements(item._id)}
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
    </div>
  );
};

export default Announcements;
