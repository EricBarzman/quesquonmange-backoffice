'use server';

import { createClient } from "@/supabase/client";
import { Couleur_plat } from "@/types/recettes.types";

export const getCouleursPlat = async (): Promise<Couleur_plat[]> => {
  const supabase = createClient();

  const { data, error } = await (await supabase)
    .from('couleur_plat')
    .select('*')

  if (error) throw new Error(`Error fetching couleur: ${error}`);
  return data || [];
};

export const getCouleurPlatById = async (id: number): Promise<Couleur_plat> => {
  const supabase = createClient();

  const { data, error } = await (await supabase)
    .from('couleur_plat')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw new Error(`Error fetching couleur: ${error}`);
  return data || [];
};

export const createCouleurPlat = async ({ label }: { label: string }) => {
  const supabase = createClient();
  const { error } = await (await supabase)
    .from('couleur_plat')
    .insert({ label })

  if (error) throw new Error(`Error creating couleur: ${error}`);
}

export const updateCouleurPlat = async (
  {
    id, label
  }: {
    id: number;
    label: string;
  }
) => {
  const supabase = createClient();
  const { error } = await (await supabase)
    .from('couleur_plat')
    .update({
      label,
    })
    .match({ id })

  if (error) throw new Error(`Error creating couleur: ${error}`);
}

export const deleteCouleurPlat = async (id: number) => {
  const supabase = createClient();
  const { error } = await (await supabase)
    .from('couleur_plat')
    .delete()
    .match({ id })

  if (error) throw new Error(`Error deleting couleur: ${error}`);
}