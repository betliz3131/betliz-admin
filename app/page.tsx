import { supabase } from "@/lib/supabase";
import UserChart from "@/components/UserChart";

export default async function HomePage() {
  const { data: users } = await supabase.from("users").select("*");
  const { data: logs } = await supabase.from("logs").select("*");

  const chartData =
    users?.map((u, i) => ({
      name: `U${i + 1}`,
      users: i + 1,
    })) || [];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white border p-4 rounded">
          Users: {users?.length || 0}
        </div>

        <div className="bg-white border p-4 rounded">
          Logs: {logs?.length || 0}
        </div>

        <div className="bg-white border p-4 rounded">
          Status: OK
        </div>
      </div>

      <div className="bg-white border rounded p-4 h-80">
        <UserChart data={chartData} />
      </div>
    </div>
  );
}