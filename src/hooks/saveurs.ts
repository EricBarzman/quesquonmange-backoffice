'use server';

import { createClient } from "@/supabase/client";
import { Saveur } from "@/types/recettes.types";
import slugify from "@/utils/slugify";

export const getSaveurs = async(): Promise<Saveur[]> => {
  const supabase = createClient();

  const { data, error } = await (await supabase)
    .from('saveur')
    .select('*')

  if (error) throw new Error(`Error fetching saveurs: ${error}`);
  return data || [];
};

export const getSaveurById = async(id: number): Promise<Saveur> => {
  const supabase = createClient();

  const { data, error } = await (await supabase)
    .from('saveur')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw new Error(`Error fetching saveurs: ${error}`);
  return data || [];
};