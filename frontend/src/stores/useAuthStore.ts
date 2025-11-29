import { create } from "zustand";
import { toast } from "sonner";
import { authService } from "@/services/authService";
import type { AuthState } from "@/types/store";
import type { signupFormValues } from "@/types/form";

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  user: null,
  loading: false,

  signUp: async ({ password, email, firstName, lastName }: signupFormValues) => {
    try {
      set({ loading: true });
      await authService.signUp(password, email, firstName, lastName);

      toast.success("Đăng ký thành công!");
    } catch (error) {
      toast.error("Đăng ký thất bại");
    } finally {
      set({ loading: false });
    }
  },

  signIn: async ({ email, password }: { email: string; password: string }) => {
    try {
      set({ loading: true });
      const response = await authService.signIn(email, password);
      set({ accessToken: response.accessToken, user: response.user });
      toast.success("Đăng nhập thành công!");
    } catch (error) {
      toast.error("Đăng nhập thất bại");
    } finally {
      set({ loading: false });
    }
  },

  signOut: async () => {
    try {
      set({ loading: true });
      await authService.signOut();
      set({ accessToken: null, user: null });
      toast.success("Đăng xuất thành công!");
    } catch (error) {
      toast.error("Đăng xuất thất bại");
    } finally {
      set({ loading: false });
    }
  },



}))