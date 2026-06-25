// lib/hooks/useInitAuth.ts
import { useEffect, useRef } from "react";
import { authApi } from "@/lib/hooks/useAuth";
import { setAccessToken } from "@/lib/axios";
import { useAuthStore } from "../store/auth.store";
import { usePathname } from "next/navigation";

const REFRESH_INTERVAL = 59 * 60 * 60 * 1000; // 1 giờ (accessToken hết hạn sau 60p)

const useInitAuth = () => {
  const { setUser, setAccessToken: setStoreToken, clear } = useAuthStore();
  const pathname = usePathname();
  const initialized = useRef(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const isAuthRoute = ["/login", "/register"].some((route) =>
    pathname.includes(route),
  );

  const refresh = async () => {
    try {
      const refreshRes = await authApi.refresh();
      const newToken = refreshRes.data.accessToken;
      setAccessToken(newToken);
      setStoreToken(newToken);
      return true;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    if (isAuthRoute) return;
    if (initialized.current) return;
    initialized.current = true;

    const init = async () => {
      const ok = await refresh();
      if (!ok) return;

      // Lấy thông tin user
      try {
        const meRes = await authApi.getMe();
        setUser(meRes.data);
      } catch {
        clear();
        return;
      }

      // Set timer tự refresh trước khi hết hạn
      timerRef.current = setInterval(async () => {
        const ok = await refresh();
        if (!ok) {
          // refresh thất bại → clear store, middleware tự redirect login
          clear();
          if (timerRef.current) clearInterval(timerRef.current);
        }
      }, REFRESH_INTERVAL);
    };

    init();

    // Cleanup khi unmount
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);
};

export default useInitAuth;
