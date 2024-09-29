import { ProviderInterface } from "../interfaces/ProviderInterfaces";

export interface UserModel {
  id: Buffer;
  name: string;
  email: string;
  role: string;
  emailVerified: boolean;
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
