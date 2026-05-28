"use client";
import useInitAuth from "@/lib/hooks/useInitAuth";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  useInitAuth();
  return <>{children}</>;
};

export default AuthProvider;