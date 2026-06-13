import { supabase } from "@/lib/supabase";

export default async function UserDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !user) {
    return <div>Kullanıcı bulunamadı</div>;
  }

  return (
    <div className="p-6 space-y-3">
      <h1 className="text-2xl font-bold">User Detail</h1>

      <div className="border p-4 rounded space-y-2">
        <p><b>ID:</b> {user.id}</p>
        <p><b>Email:</b> {user.email}</p>
        <p><b>Role:</b> {user.role}</p>
      </div>
    </div>
  );
}