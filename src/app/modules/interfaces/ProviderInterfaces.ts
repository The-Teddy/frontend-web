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
}
