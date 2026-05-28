"use client";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AuthLayout from "@/components/auth-layout";
import { authApi } from "@/lib/hooks/useAuth";
import { toast } from "sonner";
import LoadingButton from "@/components/button";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/auth.store";

const loginSchema = z.object({
  identifier: z.string().min(1, { message: "errors.identifierRequired" }),
  password: z.string().min(6, { message: "errors.passwordMin" }),
});

type LoginValues = z.infer<typeof loginSchema>;

const LoginCard = () => {
  const t = useTranslations("Login.form");

  const router = useRouter();

  const { setUser, setAccessToken } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { identifier: "", password: "" },
  });

  const onSubmit = async (values: LoginValues) => {
    const toastId = toast.loading(t("submitting"));
    try {
      const res = await authApi.login(values);
      setAccessToken(res.data.accessToken);
      setUser(res.data.user);
      toast.success(t("loginSuccess"), { id: toastId });
      router.push("/");
    } catch (err: any) {
      toast.error(t(`apiErrors.${err.code ?? "SERVER_ERROR"}`), {
        id: toastId,
      });
    }
  };

  return (
    <div className="w-full max-w-[432px]">
      <div>
        <div className="mb-6">
          <h3 className="text-2xl font-bold">{t("title")}</h3>
          <p className="text-sm text-[#464554] mt-1">{t("subtitle")}</p>
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Email / Phone */}
          <div>
            <Input
              placeholder={t("emailOrPhone")}
              {...register("identifier")}
            />
            {errors.identifier && (
              <p className="text-xs text-red-500 mt-1">
                {t(errors.identifier.message as any)}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <Input
              type="password"
              placeholder={t("password")}
              {...register("password")}
            />
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">
                {t(errors.password.message as any)}
              </p>
            )}
          </div>

          {/* Forgot password */}
          <div className="flex justify-end -mt-1">
            <Link
              href="/forgot-password"
              className="text-xs text-[#4648d4] hover:underline"
            >
              {t("forgotPassword")}
            </Link>
          </div>
          <LoadingButton
            type="submit"
            loading={isSubmitting}
            className="w-full py-5 bg-[#4648d4] hover:bg-[#3a3bb8] text-white border-none rounded-xl text-lg font-semibold cursor-pointer transition-all duration-200 shadow-sm hover:shadow-[0_4px_12px_rgba(70,72,212,0.3)] active:scale-95"
          >
            {t("submit")}
          </LoadingButton>
        </form>

        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-[#c7c4d7]" />
          <span className="text-xs text-[#464554]">{t("or")}</span>
          <div className="flex-1 h-px bg-[#c7c4d7]" />
        </div>

        <div className="text-center">
          <span className="text-sm text-[#464554]">{t("noAccount")} </span>
          <Link
            href="/register"
            className="text-[#4648d4] no-underline text-sm font-semibold hover:underline"
          >
            {t("register")}
          </Link>
        </div>
      </div>
    </div>
  );
};

const LoginPage = () => {
  return (
    <AuthLayout>
      <LoginCard />
    </AuthLayout>
  );
};

export default LoginPage;
