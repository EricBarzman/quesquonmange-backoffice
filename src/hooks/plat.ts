'use server';

import { createClient } from "@/supabase/client";
import { Plat } from "@/types/recettes.types";

export const getAllPlats = async (): Promise<Plat[]> => {
  const supabase = createClient();

  const { data, error } = await (await supabase)
    .from('plat')
    .select('*')

  if (error) throw new Error(`Error fetching items: ${error}`);
  return data || [];
};

export const getPlatById = async (id: number): Promise<Plat> => {
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
  cuisson,
  saison,
  type_plat,
  couleur_id
}: {
  label: string,
  cuisson : string;
  saison: string;
  type_plat: number;
  couleur_id: number;
}) => {

  const supabase = createClient();
  const { error } = await (await supabase)
    .from('plat')
    .insert({ label, cuisson, saison, type_plat })

  const { error } = await (await supabase)
    .from('plat_has_couleurs')
    .insert({ plat_id: id, couleur_id })

  if (error) throw new Error(`Error creating item: ${error}`);
}

export const updateTypePlat = async (
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