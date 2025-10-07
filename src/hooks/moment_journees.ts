'use server';

import { createClient } from "@/supabase/client";
import { Moment_journee } from "@/types/recettes.types";

export const getMomentsAlimentaire = async (): Promise<Moment_journee[]> => {
  const supabase = createClient();

  const { data, error } = await (await supabase)
    .from('moment_journee')
    .select('*')

  if (error) throw new Error(`Error fetching moment journees: ${error}`);
  return data || [];
};

export const getMomentAlimentaireById = async (id: number): Promise<Moment_journee> => {
  const supabase = createClient();

  const { data, error } = await (await supabase)
    .from('moment_journee')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw new Error(`Error fetching moment journee: ${error}`);
  return data || [];
};

export const createMomentAlimentaire = async ({ label }: { label: string }) => {
  const supabase = createClient();
  const { error } = await (await supabase)
    .from('moment_journee')
    .insert({ label })

  if (error) throw new Error(`Error creating moment journee: ${error}`);
}

export const updateMomentAlimentaire = async (
  {
    id, label
  }: {
    id: number;
    label: string;
  }
) => {
  const supabase = createClient();
  const { error } = await (await supabase)
    .from('moment_journee')
    .update({
      label,
    })
    .match({ id })

  if (error) throw new Error(`Error creating moment journee: ${error}`);
}

export const deleteMomentAlimentaire = async (id: number) => {
  const supabase = createClient();
  const { error } = await (await supabase)
    .from('moment_journee')
    .delete()
    .match({ id })

  if (error) throw new Error(`Error deleting moment journee: ${error}`);
}