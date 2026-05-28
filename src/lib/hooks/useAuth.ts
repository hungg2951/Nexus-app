import { api } from "@/lib/api";
import { AuthUser } from "@/types/auth";

type LoginPayload = { identifier: string; password: string };
type RegisterPayload = {
  firstName: string;
  lastName: string;
  identifier: string;
  password: string;
  day: string;
  month: string;
  year: string;
  gender?: "female" | "male" | "other";
};

type LoginResponse = { user: AuthUser; accessToken: string };
type RegisterResponse = {
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
};

export const authApi = {
  login: (payload: LoginPayload) =>
    api.post<{ success: boolean; data: LoginResponse }>("/auth/login", payload),

  register: (payload: RegisterPayload) =>
    api.post<{ success: boolean; data: RegisterResponse }>(
      "/auth/register",
      payload,
    ),

  logout: () => api.post<{ success: boolean }>("/auth/logout", {}),

  getMe: () => api.get<{ success: boolean; data: AuthUser }>("/auth/me"),

  refresh: () =>
    api.post<{ success: boolean; data: { accessToken: string } }>(
      "/auth/refresh",
      {},
    ),
};
