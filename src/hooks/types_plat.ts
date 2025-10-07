'use server';

import { createClient } from "@/supabase/client";
import { Type_plat } from "@/types/recettes.types";

export const getAllTypesPlat = async (): Promise<Type_plat[]> => {
  const supabase = createClient();

  const { data, error } = await (await supabase)
    .from('type_plat')
    .select('*')

  if (error) throw new Error(`Error fetching items: ${error}`);
  return data || [];
};

export const getTypePlatById = async (id: number): Promise<Type_plat> => {
  const supabase = createClient();

  const { data, error } = await (await supabase)
    .from('type_plat')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw new Error(`Error fetching item: ${error}`);
  return data || [];
};

export const createTypePlat = async ({ label }: { label: string }) => {
  const supabase = createClient();
  const { error } = await (await supabase)
    .from('type_plat')
    .insert({ label })

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

export const deleteTypePlat = async (id: number) => {
  const supabase = createClient();
  const { error } = await (await supabase)
    .from('type_plat')
    .delete()
    .match({ id })

  if (error) throw new Error(`Error deleting item: ${error}`);
}