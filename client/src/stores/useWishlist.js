import instance from "@/utils/baseUrl";
import { create } from "zustand";

export const useWishlist = create((set) => ({
  isLoading: false,
  error: null,
  wishItems: [],

  // Функция для добавления или удаления товара из списка желаемого
  toggleWishList: async (productId) => {
    set({ isLoading: true, error: null });

    try {
      // Проверка, есть ли товар в списке желаемого
      const existingItem = set
        .getState()
        .wishItems.find((item) => item.productId === productId);

      if (existingItem) {
        // Если товар уже есть в списке, удаляем его
        await instance.delete(`/wishlist/${productId}`);
        set({
          wishItems: set
            .getState()
            .wishItems.filter((item) => item.productId !== productId),
        });
      } else {
        // Если товара нет в списке, добавляем его
        const response = await instance.post("/wishlist", { productId });
        set({
          wishItems: [...set.getState().wishItems, response.data],
        });
      }
    } catch (error) {
      set({ error: error.message || "Error toggling wishlist" });
    } finally {
      set({ isLoading: false });
    }
  },

  // Получаем все товары из списка желаемого
  getWishListItems: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await instance.get("/wishlist");
      set({ wishItems: response.data });
    } catch (error) {
      set({ error: error.message || "Error fetching wishlist" });
    } finally {
      set({ isLoading: false });
    }
  },

  // Удаление товара из списка желаемого
  removeFromWishList: async (productId) => {
    set({ isLoading: true, error: null });

    try {
      await instance.delete(`/wishlist/${productId}`);
      set({
        wishItems: set
          .getState()
          .wishItems.filter((item) => item.productId !== productId),
      });
    } catch (error) {
      set({ error: error.message || "Error deleting wishlist" });
    } finally {
      set({ isLoading: false });
    }
  },
}));
