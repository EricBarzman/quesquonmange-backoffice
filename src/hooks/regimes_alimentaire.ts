'use server';

import { createClient } from "@/supabase/client";
import { Regime_alimentaire } from "@/types/recettes.types";

export const getRegimesAlimentaire = async (): Promise<Regime_alimentaire[]> => {
  const supabase = createClient();

  const { data, error } = await (await supabase)
    .from('regime_alimentaire')
    .select('*')

  if (error) throw new Error(`Error fetching regimes: ${error}`);
  return data || [];
};

export const getRegimeAlimentaireById = async (id: number): Promise<Regime_alimentaire> => {
  const supabase = createClient();

  const { data, error } = await (await supabase)
    .from('regime_alimentaire')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw new Error(`Error fetching regime: ${error}`);
  return data || [];
};

export const createRegimeAlimentaire = async ({ label }: { label: string }) => {
  const supabase = createClient();
  const { error } = await (await supabase)
    .from('regime_alimentaire')
    .insert({ label })

  if (error) throw new Error(`Error creating regime: ${error}`);
}

export const updateRegimeAlimentaire = async (
  {
    id, label
  }: {
    id: number;
    label: string;
  }
) => {
  const supabase = createClient();
  const { error } = await (await supabase)
    .from('regime_alimentaire')
    .update({
      label,
    })
    .match({ id })

  if (error) throw new Error(`Error creating regime: ${error}`);
}

export const deleteRegimeAlimentaire = async (id: number) => {
  const supabase = createClient();
  const { error } = await (await supabase)
    .from('regime_alimentaire')
    .delete()
    .match({ id })

  if (error) throw new Error(`Error deleting regime: ${error}`);
}