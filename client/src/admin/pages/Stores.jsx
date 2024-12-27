import instance from "@/utils/baseUrl";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";

const Stores = () => {
  const [stores, setStores] = useState([]);

  const fetchStores = async () => {
    try {
      const response = await instance.get("/store");
      setStores(response.data);
    } catch (error) {
      console.log("error fetching stores");
    }
  };

  const deleteStore = async (id) => {
    try {
      await instance.delete(`/store/delete/${id}`);
    } catch (error) {
      console.log("error deleting store");
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Управление Магазинами</h1>
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
            {stores &&
              stores.map((store, index) => (
                <TableRow key={index}>
                  <TableCell>{store._id}</TableCell>
                  <TableCell>{store.storeName}</TableCell>
                  <TableCell>
                    <div className="w-[40px]">
                      <img
                        className="w-full rounded-md"
                        src={store.storePhoto}
                        alt="store-image"
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => deleteStore(store._id)}
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

export default Stores;
