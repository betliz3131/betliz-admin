import Link from "next/link";
import LogoutButton from "./LogoutButton";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* SIDEBAR */}
      <aside className="w-64 min-h-screen bg-white border-r p-4 flex flex-col">
        <h1 className="font-bold text-lg mb-6">Admin Panel</h1>

        <nav className="flex flex-col gap-2 flex-1">
          <Link
            href="/"
            className="hover:text-black text-gray-600"
          >
            Dashboard
          </Link>

          <Link
            href="/users"
            className="hover:text-black text-gray-600"
          >
            Users
          </Link>

          <Link
            href="/logs"
            className="hover:text-black text-gray-600"
          >
            Logs
          </Link>

          <Link
            href="/settings"
            className="hover:text-black text-gray-600"
          >
            Settings
          </Link>
        </nav>

        {/* ALT KISIM */}
        <div className="pt-4 border-t">
          <LogoutButton />
        </div>
      </aside>

      {/* CONTENT */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}