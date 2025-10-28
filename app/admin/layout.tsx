import AdminSidebar from "./AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-600">
      <AdminSidebar />
      <main className="flex-1 p-6 md:ml-4 transition-all duration-300">
        {children}
      </main>
    </div>
  );
}
