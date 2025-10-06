'use server';

import { createClient } from "@/supabase/server";

export const auth = async (email: string, password: string) => {
  try {
    const supabase = createClient();
    const { error } = await (await supabase).auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;

  } catch (error) {
    console.log("Authentication error: ", error);
    throw error;
  }
};