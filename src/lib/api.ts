import instance from "./axios";

export const api = {
  get: <T>(endpoint: string) =>
    instance.get<T>(endpoint).then((res) => res.data),

  post: <T>(endpoint: string, body: Record<string, unknown>) =>
    instance.post<T>(endpoint, body).then((res) => res.data),

  put: <T>(endpoint: string, body: Record<string, unknown>) =>
    instance.put<T>(endpoint, body).then((res) => res.data),

  patch: <T>(endpoint: string, body: Record<string, unknown>) =>
    instance.patch<T>(endpoint, body).then((res) => res.data),

  delete: <T>(endpoint: string) =>
    instance.delete<T>(endpoint).then((res) => res.data),
};