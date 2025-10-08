'use server';

import { createClient } from "@/supabase/client";
import { Ambiance } from "@/types/recettes.types";

export const getAllAmbiances = async (): Promise<Ambiance[]> => {
  const supabase = createClient();

  const { data, error } = await (await supabase)
    .from('ambiance')
    .select('*')

  if (error) throw new Error(`Error fetching items: ${error}`);
  return data || [];
};

export const getAmbianceById = async (id: number): Promise<Ambiance> => {
  const supabase = createClient();

  const { data, error } = await (await supabase)
    .from('ambiance')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw new Error(`Error fetching item: ${error}`);
  return data || [];
};

export const createAmbiance = async ({ label }: { label: string }) => {
  const supabase = createClient();
  const { error } = await (await supabase)
    .from('ambiance')
    .insert({ label })

  if (error) throw new Error(`Error creating item: ${error}`);
}

export const updateAmbiance = async (
  {
    id, label
  }: {
    id: number;
    label: string;
  }
) => {
  const supabase = createClient();
  const { error } = await (await supabase)
    .from('ambiance')
    .update({
      label,
    })
    .match({ id })

  if (error) throw new Error(`Error creating item: ${error}`);
}

export const deleteAmbiance = async (id: number) => {
  const supabase = createClient();
  const { error } = await (await supabase)
    .from('ambiance')
    .delete()
    .match({ id })

  if (error) throw new Error(`Error deleting item: ${error}`);
}