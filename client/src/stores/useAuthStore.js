import instance from "@/utils/baseUrl";
import { create } from "zustand";

export const useAuthStore = create((set) => ({
  isLoading: false,
  error: null,
  isAuthenticated: false,
  user: null,

  register: async (formData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await instance.post("/auth/register", {
        ...formData,
      });
      window.localStorage.setItem("token", response.data.token);
      set({ user: response.data.user, isAuthenticated: true });

      // Возвращаем объект с success: true
      return { success: true, user: response.data.user };
    } catch (error) {
      const errorMessage = error.response?.data?.message || "error";
      set({ error: errorMessage, isAuthenticated: false, user: null });

      // Возвращаем объект с success: false и сообщением об ошибке
      return { success: false, message: errorMessage };
    } finally {
      set({ isLoading: false });
    }
  },

  login: async (userName, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await instance.post("/auth/login", {
        userName,
        password,
      });
      if (response.data.success) {
        window.localStorage.setItem("token", response.data.token);
        set({ user: response.data.user, isAuthenticated: true });
        return { success: true, user: response.data.user }; // Успех
      } else {
        return { success: false, message: response.data.message }; // Ошибка с сообщением
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "error";
      set({ error: errorMessage, isAuthenticated: false, user: null });
      return { success: false, message: errorMessage }; // Ошибка при запросе
    } finally {
      set({ isLoading: false });
    }
  },

  getMe: async () => {
    set({ isLoading: true });
    try {
      const response = await instance.get("/auth/getMe");
      set({ user: response.data.user, isAuthenticated: true });
    } catch (error) {
      set({ isAuthenticated: false, user: null });
    } finally {
      set({ isLoading: false });
    }
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
    localStorage.removeItem("token");
  },
}));
