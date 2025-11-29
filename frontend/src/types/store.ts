import type { signupFormValues } from "@/types/form";
import type { User } from "@/types/user";

export interface AuthState {
  accessToken: string | null;
  user: User | null;
  loading: boolean;

  signUp: (data: signupFormValues) => Promise<void>;
}