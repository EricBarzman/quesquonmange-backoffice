export type Ingredient = {
  id: number;
  label: string;
  description: string;
}

export type Complexite = {
  id: number;
  created_at: string;
  label: string;
}

export type Saveur = {
  id: number | null;
  label: string;
  created_at: string;
}