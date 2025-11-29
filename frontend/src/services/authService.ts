import api from "@/lib/axios";

export const authService = {
  signUp: async (password: string, email: string, firstName: string, lastName: string) => {
    try {
      const response = await api.post("/auth/register", { password, email, firstName, lastName }, { withCredentials: true });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  signIn: async (email: string, password: string) => {
    try {
      const response = await api.post("/auth/login", { email, password }, { withCredentials: true });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  signOut: async () => {
    try {
      const response = await api.post("/auth/logout", { withCredentials: true });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
}