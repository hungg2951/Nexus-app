// lib/hooks/useInitAuth.ts
import { useEffect } from "react";
import { authApi } from "@/lib/hooks/useAuth";
import { setAccessToken } from "@/lib/axios";
import { useAuthStore } from "../store/auth.store";

const useInitAuth = () => {
  const { setUser, setAccessToken: setStoreToken } = useAuthStore();

  useEffect(() => {
    const init = async () => {
      try {
        // 1. Refresh trước để lấy accessToken mới
        const refreshRes = await authApi.refresh();
        const newToken = refreshRes.data.accessToken;

        setAccessToken(newToken);
        setStoreToken(newToken);

        const meRes = await authApi.getMe();
        setUser(meRes.data);
      } catch (err) {
        console.log("LỖI INIT AUTH:", err);
        // Xóa store
        useAuthStore.getState().clear();
        // Redirect
        window.location.href = "/login";
      }
    };

    init();
  }, []);
};

export default useInitAuth;
