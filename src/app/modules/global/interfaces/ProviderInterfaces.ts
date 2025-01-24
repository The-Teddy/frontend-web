export interface ContentIdentityInterface {
  businessName: string;
  document: string;
  category: string;
  url: string;
}
export interface ProviderInterface {
  name: string;
  document: string;
  about: string | null;
  category: string | null;
  url: string;
  rating: number;
  logo: string | null;
  cover: string | null;
  hasAutomaticUpdate: boolean;
  phoneNumberCommercial: string;
  postalCode: string;
  street: string;
  number: string | null;
  complement: string | null;
  neighborhood: string;
  city: string;
  state: string;
  reference: string | null;
}
export interface ContentProfileInterface {
  about: string;
  phoneNumber: string;
  postalCode: string;
  street: string;
  number: string;
  complement: string | null;
  neighborhood: string;
  city: string;
  state: string;
  reference: string | null;
}
