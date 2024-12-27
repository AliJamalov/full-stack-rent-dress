import instance from "@/utils/baseUrl"; // Импорт axios instance
import { create } from "zustand";

// Создание хранилища с использованием zustand
export const useWishlist = create((set) => ({
  isLoading: false,
  error: null,
  wishItems: [],

  // Получение wishlist
  fetchWishlist: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await instance.get("/wishlist");
      set({ wishItems: response.data.items, isLoading: false });
    } catch (error) {
      set({ error: "Ошибка при получении wishlist", isLoading: false });
      console.error("Ошибка при получении wishlist:", error);
    }
  },

  // Добавление предмета в wishlist
  addItemToWishlist: async (itemId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await instance.post("/wishlist/add-item", { itemId });
      set({ wishItems: response.data.items, isLoading: false });
    } catch (error) {
      set({
        error: "Ошибка при добавлении предмета в wishlist",
        isLoading: false,
      });
      console.error("Ошибка при добавлении предмета в wishlist:", error);
    }
  },

  // Удаление предмета из wishlist
  removeItemFromWishlist: async (itemId) => {
    set({ isLoading: true, error: null });
    try {
      // Отправляем запрос на удаление элемента из wishlist
      const response = await instance.post("/wishlist/remove-item", { itemId });

      // Обновляем локальное состояние с актуальными данными wishlist
      set({
        wishItems: response.data.items,
        isLoading: false,
      });

      // Обновляем данные в localStorage для синхронизации
      localStorage.setItem("wishItems", JSON.stringify(response.data.items));
    } catch (error) {
      set({
        error: "Ошибка при удалении предмета из wishlist",
        isLoading: false,
      });
      console.error("Ошибка при удалении предмета из wishlist:", error);
    }
  },
}));
