"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    router.push("/");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="bg-white p-6 rounded-xl border w-80 space-y-3">
        <h1 className="text-xl font-bold">Admin Login</h1>

        <input
          className="border p-2 w-full"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="border p-2 w-full"
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="bg-black text-white w-full p-2 rounded"
          onClick={login}
        >
          Login
        </button>
      </div>
    </div>
  );
}