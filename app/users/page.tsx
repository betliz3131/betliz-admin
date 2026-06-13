"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [currentUserRole, setCurrentUserRole] = useState("user");

  useEffect(() => {
    fetchUsers();
    checkRole();
  }, []);

  async function checkRole() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data } = await supabase
      .from("users")
      .select("role")
      .eq("id", user.id)
      .single();

    setCurrentUserRole(data?.role || "user");
  }

  async function fetchUsers() {
    const { data } = await supabase.from("users").select("*");
    setUsers(data || []);
  }

  async function deleteUser(id: string) {
    await supabase.from("users").delete().eq("id", id);
    fetchUsers();
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Users</h1>

      <div className="bg-white border rounded">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex justify-between items-center p-3 border-b"
          >
            <Link href={`/users/${user.id}`}>
              {user.email}
            </Link>

            <div className="flex gap-2 items-center">
              <span className="text-xs text-gray-500">
                {user.role}
              </span>

              {/* 🔥 SADECE ADMIN */}
              {currentUserRole === "admin" && (
                <>
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="text-red-600 text-sm"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}