import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  const formData = await req.formData();

  const id = formData.get("id") as string;
  const action = formData.get("action") as string;

  if (!id || !action) {
    return NextResponse.json({ error: "Missing data" }, { status: 400 });
  }

  if (action === "ban") {
    const { error } = await supabase
      .from("users")
      .update({ banned: true })
      .eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.redirect(new URL("/users", req.url));
  }

  return NextResponse.json({ message: "No action" });
}