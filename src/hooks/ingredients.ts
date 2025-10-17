'use server';

import { Type_ingredient } from "@/constants/types_ingredient";
import { createClient } from "@/supabase/client";
import { Ingredient } from "@/types/recettes.types";
import slugify from "@/utils/slugify";

export const getIngredients = async (): Promise<Ingredient[]> => {

  const supabase = createClient();
  const { data, error } = await (await supabase)
    .from('ingredient')
    .select('*')

  if (error) throw new Error(`Error fetching categories: ${error}`);
  return data || [];
}

export const getIngredientById = async (id: number): Promise<Ingredient> => {

  const supabase = createClient();
  const { data, error } = await (await supabase)
    .from('ingredient')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw new Error(`Error fetching categories: ${error}`);
  return data || {};
}

export const createIngredient = async (
  { label, description, type_ingredient }: { label: string; description: string; type_ingredient: Type_ingredient; }
) => {
  const slug = slugify(label);

  const supabase = createClient();
  const { error } = await (await supabase)
    .from('ingredient')
    .insert({
      label,
      description,
      slug,
      type_ingredient
    })

  if (error) throw new Error(`Error creating ingredient: ${error}`);
}

export const updateIngredient = async (
  {
    id, label, description, type_ingredient
  }: {
    id: number;
    label: string;
    description: string;
    type_ingredient: Type_ingredient;
  }
) => {
  const slug = slugify(label);

  const supabase = createClient();
  const { error } = await (await supabase)
    .from('ingredient')
    .update({
      label,
      description,
      slug,
      type_ingredient,
    })
    .match({ id })

  if (error) throw new Error(`Error creating ingredient: ${error}`);
}

export const deleteIngredient = async (id: number) => {
  const supabase = createClient();
  const { error } = await (await supabase)
    .from('ingredient')
    .delete()
    .match({ id })

  if (error) throw new Error(`Error deleting category: ${error}`);
}