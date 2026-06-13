import { supabase } from "@/lib/supabase";

export default async function Dashboard() {
  const { count: usersCount } = await supabase
    .from("users")
    .select("*", { count: "exact", head: true });

  const { count: logsCount } = await supabase
    .from("logs")
    .select("*", { count: "exact", head: true });

  return (
    <div>
      <h1>Admin Dashboard</h1>

      <div style={{ display: "flex", gap: 20 }}>
        <div>
          <h2>Users</h2>
          <p>{usersCount}</p>
        </div>

        <div>
          <h2>Logs</h2>
          <p>{logsCount}</p>
        </div>
      </div>
    </div>
  );
}
const { data: latestLogs } = await supabase
  .from("logs")
  .select("*")
  .order("created_at", { ascending: false })
  .limit(10);