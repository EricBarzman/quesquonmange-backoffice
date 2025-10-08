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
}: {
  label: string,
  cuissons: string[] | null;
  saisons: string[] | null;
  type_plat_id: number;
  // couleurs_plat_id: number[];
  //ingredients: number[];
  // moments_journee_id: number[];
  // regimes_alimentaire_id: number[];
  // saveurs_id: number[];
  // ustensils_id: number[];
}) => {
  const slug = slugify(label);
  if (cuissons!.length === 0) cuissons = null;
  if (saisons!.length === 0) saisons = null;

  // console.log({
  //     label,
  //     slug,
  //     cuissons,
  //     saisons,
  //     type_plat: type_plat_id
  //   })

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

  console.log("data");
  console.log(data);

  // if (error) throw new Error(`Error creating item: ${error}`);

  // console.log(data);

  // const { error } = await (await supabase)
  //   .from('plat_has_couleurs')
  //   .insert({ plat_id: id, couleur_id })
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