import instance from "@/utils/baseUrl";
import { create } from "zustand";

export const useStore = create((set) => ({
  isLoading: false,
  error: null,
  store: null,

  fetchStore: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await instance.get("/store/get");
      if (response.data) {
        set({ store: response.data.store });
      } else {
        throw new Error("Store data is incomplete");
      }
    } catch (error) {
      set({ error: error.message || "Error fetching store data" });
    } finally {
      set({ isLoading: false });
    }
  },

  createStore: async (formData) => {
    set({ isLoading: true, error: null });

    try {
      await instance.post("/store/add", { ...formData });
    } catch (error) {
      set({ error: error.message || "Error creating store" });
    } finally {
      set({ isLoading: false });
    }
  },
}));
