'use server';

import { createClient } from "@/supabase/client";
import { IngredientWithQuantityAndUnity, PlatComplet, PlatSimple } from "@/types/recettes.types";
import slugify from "@/utils/slugify";

export const getAllPlats = async (): Promise<PlatSimple[]> => {
  const supabase = createClient();

  const { data, error } = await (await supabase)
    .from('plat')
    .select('*')

  if (error) throw new Error(`Error fetching items: ${error}`);
  return data || [];
};

export const getPlatById = async (id: number): Promise<PlatComplet> => {
  const supabase = createClient();

  const { data, error } = await (await supabase)
    .from('plat')
    .select(`
      id,
      created_at,
      label,
      slug,
      cuisson,
      saison,
      type_plat (id, label, created_at),
      repas (id, label),
      couleurs_plat:couleur_plat (id, label),
      regimes_alimentaire:regime_alimentaire (id, label),
      ustensils:ustensil (id, label),
      saveurs:saveur (id, label),
      ingredients:plat_has_ingredients!inner(ingredient(id, label), "quantité", "unité")
    `) // rename plat_has_ingredients to ingredients, inner join, do some magic to join ingredient as well
    .eq('id', id)
    .single()

  if (error) throw new Error('Error fetching item: ', error);

  if (data === null || data === undefined)
    throw new Error(`Error fetching item`)

  return data as unknown as PlatComplet;
};

export const createPlat = async ({
  label,
  cuissons,
  saisons,
  type_plat_id,
  list_repas_id,
  couleurs_id,
  regimes_alimentaire,
  saveurs,
  ustensils,
  ingredients,
  complexite_id,
}: {
  label: string,
  cuissons: string[] | null;
  saisons: string[] | null;
  type_plat_id: number;
  complexite_id: number;
  couleurs_id: number[];
  ingredients: IngredientWithQuantityAndUnity[];
  list_repas_id: number[];
  regimes_alimentaire: number[];
  saveurs: number[];
  ustensils: number[];
}) => {
  const slug = slugify(label);
  if (cuissons!.length === 0) cuissons = null;
  if (saisons!.length === 0) saisons = null;

  const supabase = createClient();

  // Create row in plat table
  const { data, error } = await (await supabase)
    .from('plat')
    .insert({
      label,
      slug,
      cuisson: cuissons,
      saison: saisons,
      type_plat: type_plat_id,
      complexite : complexite_id,
    })
    .select('*')
    .single()

  if (error) throw new Error(`Error creating item: ${error}`);
  if (!data) throw new Error(`Error creating item`);

  const plat_id = data.id;

  // Plat fits repas
  for (const repas_id of list_repas_id) {
    const { error } = await (await supabase)
      .from('plat_fits_repas')
      .insert({
        repas_id,
        plat_id,
      })

    if (error) throw new Error(`Error creating item: ${error}`);
  }

  // Plat has couleurs
  for (const couleur_id of couleurs_id) {
    const { error } = await (await supabase)
      .from('plat_has_couleurs')
      .insert({
        couleur_id,
        plat_id,
      })
    if (error) throw new Error(`Error creating item: ${error}`);
  }

  // Plat has regimes
  for (const regime_id of regimes_alimentaire) {
    const { error } = await (await supabase)
      .from('plat_has_regimes')
      .insert({
        regime_id,
        plat_id,
      })
    if (error) throw new Error(`Error creating item: ${error}`);
  }

  // Plat has saveurs
  for (const saveur_id of saveurs) {
    const { error } = await (await supabase)
      .from('plat_has_saveurs')
      .insert({
        saveur_id,
        plat_id,
      })
    if (error) throw new Error(`Error creating item: ${error}`);
  }

  // Plat requires ustensils
  for (const ustensil_id of ustensils) {
    const { error } = await (await supabase)
      .from('plat_requires_ustensils')
      .insert({
        ustensil_id,
        plat_id,
      })
    if (error) throw new Error(`Error creating item: ${error}`);
  }

  // Plat has ingredients
  for (const ingredient of ingredients) {
    const { error } = await (await supabase)
      .from('plat_has_ingredients')
      .insert({
        ingredient_id : ingredient.ingredient.id,
        plat_id,
        quantité: ingredient.quantité,
        unité: ingredient.unité,
      })
    if (error) throw new Error(`Error creating item: ${error}`);
  }
}


export const updatePlat = async (
  {
    id, label
  }: {
    id: number;
    label: string;
  }
) => {
  const supabase = createClient();
  const { error } = await (await supabase)
    .from('type_plat')
    .update({
      label,
    })
    .match({ id })

  if (error) throw new Error(`Error creating item: ${error}`);
}

export const deletePlat = async (id: number) => {
  const supabase = createClient();
  const { error } = await (await supabase)
    .from('plat')
    .delete()
    .match({ id })

  if (error) throw new Error(`Error deleting item: ${error}`);
}