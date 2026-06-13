import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* SIDEBAR */}
      <aside className="w-64 min-h-screen bg-white border-r p-4 flex flex-col gap-4">
        <h1 className="font-bold text-lg">Admin Panel</h1>

        <nav className="flex flex-col gap-2">
          <Link href="/" className="hover:text-black text-gray-600">
            Dashboard
          </Link>

          <Link href="/users" className="hover:text-black text-gray-600">
            Users
          </Link>

          <Link href="/logs" className="hover:text-black text-gray-600">
            Logs
          </Link>
        </nav>
      </aside>

      {/* CONTENT */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}