'use server';

import { createClient } from "@/supabase/server";
import { redirect } from "next/navigation";

export const login = async (email: string, password: string) => {
  try {
    const supabase = createClient();
    const { data, error } = await (await supabase).auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;
    return data;

  } catch (error) {
    console.log("Authentication error: ", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const supabase = createClient();
    const { error } = await (await supabase).auth.signOut();
    if (error) throw error;

  } catch (error) {
    console.log("Logout error: ", error);
    throw error;
  }
}

export const getUser = async () => {
  const supabase = createClient();
  const { data, error } = await (await supabase).auth.getUser();

  if (error || !data?.user) redirect('/auth');
  return data.user;
}