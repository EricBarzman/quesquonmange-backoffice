'use server';

import { createClient } from "@/supabase/client";
import { Type_repas } from "@/types/recettes.types";

export const getAllTypesRepas = async (): Promise<Type_repas[]> => {
  const supabase = createClient();

  const { data, error } = await (await supabase)
    .from('type_repas')
    .select('*')

  if (error) throw new Error(`Error fetching items: ${error}`);
  return data || [];
};

export const getTypeRepasById = async (id: number): Promise<Type_repas> => {
  const supabase = createClient();

  const { data, error } = await (await supabase)
    .from('type_repas')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw new Error(`Error fetching item: ${error}`);
  return data || [];
};

export const createTypeRepas = async ({ label }: { label: string }) => {
  const supabase = createClient();
  const { error } = await (await supabase)
    .from('type_repas')
    .insert({ label })

  if (error) throw new Error(`Error creating item: ${error}`);
}

export const updateTypeRepas = async (
  {
    id, label
  }: {
    id: number;
    label: string;
  }
) => {
  const supabase = createClient();
  const { error } = await (await supabase)
    .from('type_repas')
    .update({
      label,
    })
    .match({ id })

  if (error) throw new Error(`Error creating item: ${error}`);
}

export const deleteTypeRepas = async (id: number) => {
  const supabase = createClient();
  const { error } = await (await supabase)
    .from('type_repas')
    .delete()
    .match({ id })

  if (error) throw new Error(`Error deleting item: ${error}`);
}