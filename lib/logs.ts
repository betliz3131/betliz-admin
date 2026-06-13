import { supabase } from "@/lib/supabase";

export async function createLog(
  user_id: string,
  action: string,
  metadata: any = {}
) {
  await supabase.from("logs").insert([
    {
      user_id,
      action,
      metadata,
    },
  ]);
}