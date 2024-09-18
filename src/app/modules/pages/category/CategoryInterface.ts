export interface CategoryInterface {
  id: number;
  name: string;
  description: string;
  observation: string;
  isActive: boolean;
  isSuggested: boolean;
  analizedByName: string;
  createdByName: string;
  approvalStatus: "pendente" | "aprovado" | "rejeitado";

  createdAt: Date;
  updatedAt: Date;
}

export interface CreateCategoryInterface {
  name: string;
  description: string;
}
export interface UpdateCategoryInterface {
  id: number | null;
  name: string;
  description?: string | null;
  observation?: string | null;
  isActive: boolean;
  approvalStatus: "pendente" | "aprovado" | "rejeitado";
}
