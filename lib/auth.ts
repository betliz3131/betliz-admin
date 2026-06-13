import { supabase } from "@/lib/supabase";

export async function getUserRole(userId: string) {
  const { data } = await supabase
    .from("users")
    .select("role")
    .eq("id", userId)
    .single();

  return data?.role || "user";
}