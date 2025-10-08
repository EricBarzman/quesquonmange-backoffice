'use server';

import { createClient } from "@/supabase/client";
import { Repas } from "@/types/recettes.types";

export const getAllRepas = async (): Promise<Repas[]> => {
  const supabase = createClient();

  const { data, error } = await (await supabase)
    .from('repas')
    .select('*')

  if (error) throw new Error(`Error fetching repas: ${error}`);
  return data || [];
};

export const getRepasById = async (id: number): Promise<Repas> => {
  const supabase = createClient();

  const { data, error } = await (await supabase)
    .from('repas')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw new Error(`Error fetching repas: ${error}`);
  return data || [];
};

export const createRepas = async ({ label }: { label: string }) => {
  const supabase = createClient();
  const { error } = await (await supabase)
    .from('repas')
    .insert({ label })

  if (error) throw new Error(`Error creating repas: ${error}`);
}

export const updateRepas = async (
  {
    id, label
  }: {
    id: number;
    label: string;
  }
) => {
  const supabase = createClient();
  const { error } = await (await supabase)
    .from('repas')
    .update({
      label,
    })
    .match({ id })

  if (error) throw new Error(`Error creating repas: ${error}`);
}

export const deleteRepas = async (id: number) => {
  const supabase = createClient();
  const { error } = await (await supabase)
    .from('repas')
    .delete()
    .match({ id })

  if (error) throw new Error(`Error deleting repas: ${error}`);
}