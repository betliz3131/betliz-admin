"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function LogsPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [actionFilter, setActionFilter] = useState("");

  useEffect(() => {
    fetchLogs();
  }, []);

  async function fetchLogs() {
    const { data } = await supabase
      .from("logs")
      .select("*")
      .order("created_at", { ascending: false });

    setLogs(data || []);
  }

  async function filteredLogs() {
    let query = supabase
      .from("logs")
      .select("*")
      .order("created_at", { ascending: false });

    if (actionFilter) {
      query = query.eq("action", actionFilter);
    }

    const { data } = await query;
    setLogs(data || []);
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Logs</h1>

      {/* FILTER BAR */}
      <div className="flex gap-2">
        <input
          className="border p-2"
          placeholder="action filter (e.g login)"
          value={actionFilter}
          onChange={(e) => setActionFilter(e.target.value)}
        />

        <button
          onClick={filteredLogs}
          className="bg-black text-white px-4"
        >
          Filter
        </button>

        <button
          onClick={fetchLogs}
          className="border px-4"
        >
          Reset
        </button>
      </div>

      {/* LOG LIST */}
      <div className="bg-white border rounded">
        {logs.map((log) => (
          <div
            key={log.id}
            className="flex justify-between p-3 border-b text-sm"
          >
            <span>{log.action}</span>
            <span className="text-gray-500">
              {log.user_id?.slice(0, 8)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}