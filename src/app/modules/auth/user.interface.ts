import { ProviderInterface } from "../interfaces/ProviderInterfaces";

export interface UserModel {
  id: Buffer;
  name: string;
  email: string;
  role: string;
  emailVerified: boolean;
  birthDate: Date;
  createdAt: Date;
  isActive: boolean;
  business: ProviderInterface;
}
export interface LoginInterface {
  email: string;
  password: string;
}
export interface RecoveryPasswordInterface {
  email: string;
  password: string;
  codeEmail: string | null;
}
export interface updateDataUserInterface {
  name: string;
  birthDate: Date | string | null;
}
export interface UpdateEmaiUserInterface {
  email: string;
  codeEmail: string | null;
  password: string;
}
export interface UpdatePasswordUserInterface {
  password: string;
  newPassword: string;
}
