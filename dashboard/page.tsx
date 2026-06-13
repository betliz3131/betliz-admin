import { supabase } from "@/lib/supabase";

export default async function Dashboard() {
  const { count: usersCount } = await supabase
    .from("users")
    .select("*", { count: "exact", head: true });

  const { count: logsCount } = await supabase
    .from("logs")
    .select("*", { count: "exact", head: true });

  const { data: latestLogs } = await supabase
    .from("logs")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(10);

  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ fontSize: 24, fontWeight: "bold" }}>
        Admin Dashboard
      </h1>

      {/* CARDS */}
      <div style={{ display: "flex", gap: 20, marginTop: 20 }}>
        <div style={{ padding: 20, background: "white", borderRadius: 8 }}>
          <h2>Users</h2>
          <p style={{ fontSize: 24 }}>{usersCount}</p>
        </div>

        <div style={{ padding: 20, background: "white", borderRadius: 8 }}>
          <h2>Logs</h2>
          <p style={{ fontSize: 24 }}>{logsCount}</p>
        </div>
      </div>

      {/* LATEST LOGS */}
      <div style={{ marginTop: 30 }}>
        <h2>Latest Logs</h2>

        <div style={{ marginTop: 10 }}>
          {latestLogs?.map((log: any) => (
            <div
              key={log.id}
              style={{
                padding: 10,
                background: "#fff",
                marginBottom: 8,
                borderRadius: 6,
              }}
            >
              {log.action}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}