export type AuthUser = {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string | null;
  phone: string | null;
  avatarUrl: string | null;
  bio: string | null;
  gender: string | null;
  birthday: string | null;
  isVerified: boolean;
  role: string;
  createdAt: string;
};