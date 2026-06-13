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
    .limit(5);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-xl border">
          <p className="text-gray-500">Users</p>
          <p className="text-3xl font-bold">{usersCount}</p>
        </div>

        <div className="bg-white p-5 rounded-xl border">
          <p className="text-gray-500">Logs</p>
          <p className="text-3xl font-bold">{logsCount}</p>
        </div>
      </div>

      {/* LATEST LOGS */}
      <div className="bg-white border rounded-xl p-5">
        <h2 className="font-semibold mb-3">Latest Logs</h2>

        <div className="space-y-2">
          {latestLogs?.map((log: any) => (
            <div
              key={log.id}
              className="flex justify-between text-sm border-b py-2"
            >
              <span>{log.action}</span>
              <span className="text-gray-400">
                {new Date(log.created_at).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}