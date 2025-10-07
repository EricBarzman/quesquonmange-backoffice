'use server';

import { createClient } from "@/supabase/client";
import { Ustensil } from "@/types/recettes.types";

export const getAllUstensils = async (): Promise<Ustensil[]> => {
  const supabase = createClient();

  const { data, error } = await (await supabase)
    .from('ustensil')
    .select('*')

  if (error) throw new Error(`Error fetching items: ${error}`);
  return data || [];
};

export const getUstensilById = async (id: number): Promise<Ustensil> => {
  const supabase = createClient();

  const { data, error } = await (await supabase)
    .from('ustensil')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw new Error(`Error fetching item: ${error}`);
  return data || [];
};

export const createUstensil = async ({ label }: { label: string }) => {
  const supabase = createClient();
  const { error } = await (await supabase)
    .from('ustensil')
    .insert({ label })

  if (error) throw new Error(`Error creating item: ${error}`);
}

export const updateUstensil = async (
  {
    id, label
  }: {
    id: number;
    label: string;
  }
) => {
  const supabase = createClient();
  const { error } = await (await supabase)
    .from('ustensil')
    .update({
      label,
    })
    .match({ id })

  if (error) throw new Error(`Error creating item: ${error}`);
}

export const deleteUstensil = async (id: number) => {
  const supabase = createClient();
  const { error } = await (await supabase)
    .from('ustensil')
    .delete()
    .match({ id })

  if (error) throw new Error(`Error deleting item: ${error}`);
}