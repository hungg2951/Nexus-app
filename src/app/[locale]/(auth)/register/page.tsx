"use client";
import Logo from "@/components/logo/Logo";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AuthLayout from "@/components/auth-layout";
import { authApi } from "@/lib/hooks/useAuth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const registerSchema = z.object({
  lastName: z.string().min(1, { message: "errors.lastNameRequired" }),
  firstName: z.string().min(1, { message: "errors.firstNameRequired" }),
  identifier: z.string().min(1, { message: "errors.identifierRequired" }),
  password: z.string().min(6, { message: "errors.passwordMin" }),
  day: z.string().min(1, { message: "errors.dayRequired" }),
  month: z.string().min(1, { message: "errors.monthRequired" }),
  year: z.string().min(1, { message: "errors.yearRequired" }),
  gender: z
    .enum(["female", "male", "other"], {
      message: "errors.genderRequired",
    })
    .optional(),
});

type RegisterValues = z.infer<typeof registerSchema>;

const RegistrationCard = () => {
  const t = useTranslations("Register.form");

  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      lastName: "",
      firstName: "",
      identifier: "",
      password: "",
      day: "",
      month: "",
      year: "",
    },
  });

  const onSubmit = async (values: RegisterValues) => {
    const toastId = toast.loading(t("submitting"));
    try {
      await authApi.register(values);
      toast.success(t("registerSuccess"), { id: toastId });
      router.push("/");
    } catch (err: any) {
      toast.error(t(`apiErrors.${err.code ?? "SERVER_ERROR"}`), {
        id: toastId,
      });
    }
  };

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = Array.from({ length: 12 }, (_, i) => ({
    value: String(i + 1),
    label: t(`months.${i + 1}`),
  }));
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

  const genders: Array<{ key: "female" | "male" | "other"; label: string }> = [
    { key: "female", label: t("genders.female") },
    { key: "male", label: t("genders.male") },
    { key: "other", label: t("genders.other") },
  ];

  return (
    <div className="w-full max-w-[432px]">
      <div>
        <div className="mb-6">
          <h3 className="text-2xl font-bold">{t("title")}</h3>
          <p className="text-sm text-[#464554] mt-1">{t("subtitle")}</p>
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Name row */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Input placeholder={t("lastName")} {...register("lastName")} />
              {errors.lastName && (
                <p className="text-xs text-red-500 mt-1">
                  {t(errors.lastName.message as any)}
                </p>
              )}
            </div>
            <div>
              <Input placeholder={t("firstName")} {...register("firstName")} />
              {errors.firstName && (
                <p className="text-xs text-red-500 mt-1">
                  {t(errors.firstName.message as any)}
                </p>
              )}
            </div>
          </div>

          {/* Email / Phone */}
          <div>
            <Input
              placeholder={t("emailOrPhone")}
              type="text"
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
              placeholder={t("newPassword")}
              type="password"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">
                {t(errors.password.message as any)}
              </p>
            )}
          </div>

          {/* Birthday */}
          <div>
            <Label className="text-xs font-medium text-[#464554] flex items-center gap-1 mb-1">
              {t("birthday")}
            </Label>
            <div className="grid grid-cols-3 gap-2">
              <Controller
                control={control}
                name="day"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={t("day")} />
                    </SelectTrigger>
                    <SelectContent position="popper" sideOffset={4}>
                      {days.map((d) => (
                        <SelectItem key={d} value={String(d)}>
                          {d}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              <Controller
                control={control}
                name="month"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={t("month")} />
                    </SelectTrigger>
                    <SelectContent position="popper" sideOffset={4}>
                      {months.map(({ value, label }) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              <Controller
                control={control}
                name="year"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={t("year")} />
                    </SelectTrigger>
                    <SelectContent position="popper" sideOffset={4}>
                      {years.map((y) => (
                        <SelectItem key={y} value={String(y)}>
                          {y}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            {(errors.day || errors.month || errors.year) && (
              <p className="text-xs text-red-500 mt-1">
                {t("errors.birthdayRequired")}
              </p>
            )}
          </div>

          {/* Gender */}
          <div>
            <Label className="text-xs font-medium text-[#464554] flex items-center gap-1 mb-1">
              {t("gender")}
            </Label>
            <div className="grid grid-cols-3 gap-2">
              <Controller
                control={control}
                name="gender"
                render={({ field }) =>
                  genders?.map(({ key, label }) => (
                    <label
                      key={key}
                      className="flex items-center justify-between px-4 py-2 border border-[#c7c4d7] rounded-lg cursor-pointer transition-colors duration-200 hover:bg-[#f1f3ff]"
                    >
                      <span className="text-sm">{label}</span>
                      <input
                        name="gender"
                        type="radio"
                        value={key}
                        checked={field.value === key}
                        onChange={() => field.onChange(key)}
                        className="w-auto accent-[#4648d4]"
                      />
                    </label>
                  ))
                }
              />
            </div>
            {errors.gender && (
              <p className="text-xs text-red-500 mt-1">
                {t(errors.gender.message as any)}
              </p>
            )}
          </div>

          {/* Terms */}
          <p className="text-[11px] leading-[1.3] text-[#464554] [&_a]:text-[#4648d4] [&_a]:no-underline [&_a:hover]:underline">
            {t.rich("terms", {
              termsLink: (chunks) => <Link href="/terms">{chunks}</Link>,
              privacyLink: (chunks) => <Link href="/privacy">{chunks}</Link>,
              cookieLink: (chunks) => <Link href="/cookies">{chunks}</Link>,
            })}
          </p>

          {/* Submit */}
          <div className="flex justify-center pt-4 w-full">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-5 bg-[#4648d4] hover:bg-[#3a3bb8] text-white border-none rounded-b-xl text-lg font-semibold cursor-pointer transition-all duration-200 shadow-sm hover:shadow-[0_4px_12px_rgba(70,72,212,0.3)] active:scale-95"
            >
              {isSubmitting ? t("submitting") : t("submit")}
            </Button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <Link
            href="/login"
            className="text-[#4648d4] no-underline text-base hover:underline"
          >
            {t("alreadyHaveAccount")}
          </Link>
        </div>
      </div>
    </div>
  );
};

const RegisterPage = () => (
  <AuthLayout>
    <RegistrationCard />
  </AuthLayout>
);

export default RegisterPage;
