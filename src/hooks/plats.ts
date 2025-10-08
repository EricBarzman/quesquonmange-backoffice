'use server';

import { createClient } from "@/supabase/client";
import { PlatComplet, PlatSimple } from "@/types/recettes.types";
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
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw new Error(`Error fetching item: ${error}`);
  return data || [];
};

export const createPlat = async ({
  label,
  cuissons,
  saisons,
  type_plat_id,
  list_repas_id,
  couleurs_id,
}: {
  label: string,
  cuissons: string[] | null;
  saisons: string[] | null;
  type_plat_id: number;
  couleurs_id: number[];
  //ingredients: number[];
  list_repas_id: number[];
  // regimes_alimentaire_id: number[];
  // saveurs_id: number[];
  // ustensils_id: number[];
}) => {
  const slug = slugify(label);
  if (cuissons!.length === 0) cuissons = null;
  if (saisons!.length === 0) saisons = null;

  const supabase = createClient();
  const { data, error } = await (await supabase)
    .from('plat')
    .insert({
      label,
      slug,
      cuisson: cuissons,
      saison: saisons,
      type_plat: type_plat_id
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