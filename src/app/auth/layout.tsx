import { createClient } from "@/supabase/server"
import { redirect } from "next/navigation"

export default async function AuthLayout(
  { children }: Readonly<{ children: React.ReactNode }>
) {
  const supabase = createClient();
  const { data: authData } = await (await supabase).auth.getUser();

  // First, check if already logged in
  if (authData.user) {
    const { data, error } = await (await supabase)
      .from('users')
      .select('*')
      .eq('id', authData.user.id)
      .single();

      if (error || !data) {
        console.log('Error fetching user data: ', error);
        return;
      }

      return redirect('/')
  }

  // Sinon, affiche la page
  return (
    <>
      {children}
    </>
  )
}