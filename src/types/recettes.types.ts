import { Type_ingredient } from "@/constants/types_ingredient";

export type Ingredient = {
  id: number | null;  // null, to pass an empty object for create pages
  label: string;
  description: string;
  type_ingredient: Type_ingredient;
  created_at: string;
}

export type IngredientWithQuantityAndUnity = {
  quantité: number;
  unité: string;
  ingredient: Ingredient
}

export type Couleur_plat = {
  id: number | null;
  created_at: string;
  label: string;
}

export type Regime_alimentaire = {
  id: number | null;
  created_at: string;
  label: string;
}

export type Complexite = {
  id: number | null;
  created_at: string;
  label: string;
}

export type Saveur = {
  id: number | null;
  label: string;
  created_at: string;
}

export type Ustensil = {
  id: number | null;
  label: string;
  created_at: string;
}

export type Type_plat = {
  id: number | null;
  label: string;
  created_at: string;
}

export type Ambiance = {
  id: number | null;
  label: string;
  created_at: string;
}

export type Repas = {
  id: number | null;
  label: string;
  created_at: string;
}

export interface PlatSimple {
  id: number;
  created_at : string;
  label: string;
  slug: string;
  saison: 'printemps' | 'été' | 'automne' | 'hiver';
  cuisson: 'cru' | 'cuit' | 'mi-cuit';
  type_plat: number;
}

export interface PlatToSend {
  id: number;
  created_at : string;
  label: string;
  slug: string;
  saison: 'printemps' | 'été' | 'automne' | 'hiver';
  cuisson: 'cru' | 'cuit' | 'mi-cuit';
  type_plat: number;
}

export interface PlatComplet {
  id: number;
  created_at : string;
  label: string;
  slug: string;
  saison: ['printemps' | 'été' | 'automne' | 'hiver'] | [];
  cuisson: ['cru' | 'cuit' | 'mi-cuit'] | [];
  type_plat: Type_plat;
  ingredients : IngredientWithQuantityAndUnity[] | [];
  repas: Repas[] | [];
  couleurs_plat: Couleur_plat[] | [];
  regimes_alimentaire: Regime_alimentaire[] | [];
  saveurs: Saveur[] | [];
  ustensils: Ustensil[]| [];
}