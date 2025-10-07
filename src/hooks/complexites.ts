'use server';

import { createClient } from "@/supabase/client";
import { Complexite } from "@/types/recettes.types";

export const getComplexites = async (): Promise<Complexite[]> => {
  const supabase = createClient();

  const { data, error } = await (await supabase)
    .from('complexite')
    .select('*')

  if (error) throw new Error(`Error fetching complexites: ${error}`);
  return data || [];
};

export const getComplexiteById = async (id: number): Promise<Complexite> => {
  const supabase = createClient();

  const { data, error } = await (await supabase)
    .from('complexite')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw new Error(`Error fetching complexites: ${error}`);
  return data || [];
};

export const createComplexite = async ({ label }: { label: string }) => {
  const supabase = createClient();
  const { error } = await (await supabase)
    .from('complexite')
    .insert({ label })

  if (error) throw new Error(`Error creating complexite: ${error}`);
}

export const updateComplexite = async (
  {
    id, label
  }: {
    id: number;
    label: string;
  }
) => {
  const supabase = createClient();
  const { error } = await (await supabase)
    .from('complexite')
    .update({
      label,
    })
    .match({ id })

  if (error) throw new Error(`Error creating complexite: ${error}`);
}

export const deleteComplexite = async (id: number) => {
  const supabase = createClient();
  const { error } = await (await supabase)
    .from('complexite')
    .delete()
    .match({ id })

  if (error) throw new Error(`Error deleting complexite: ${error}`);
}