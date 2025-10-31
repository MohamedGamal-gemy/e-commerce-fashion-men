"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Shirt,
  Subscript,
  UserPlus2,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function AdminSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/products", label: "Products", icon: Shirt },
    { href: "/admin/users", label: "Users", icon: Users },
    { href: "/admin/subcategories", label: "Subcategories", icon: Subscript },
    { href: "/admin/categories", label: "Categories", icon: UserPlus2 },
    { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
    { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
    { href: "/admin/settings", label: "Settings", icon: Settings },
  ];

  const SidebarContent = (
    <div
      className={cn(
        "flex flex-col h-full border-r border-slate-800 bg-slate-900 text-slate-200 transition-all duration-300",
        collapsed ? "w-20" : "w-52"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-800 ">
        <h1
          className={cn(
            "font-bold text-lg tracking-wide text-cyan-400",
            collapsed && "hidden"
          )}
        >
          Admin Panel
        </h1>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden md:block p-1.5 hover:bg-slate-800 rounded-md transition-colors"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
        {/* Close on mobile */}
        <button
          onClick={() => setMobileOpen(false)}
          className="md:hidden p-2 hover:bg-slate-800 rounded-md"
        >
          <X size={20} />
        </button>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700">
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                active
                  ? "bg-cyan-600/20 text-cyan-400 font-medium"
                  : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
              )}
            >
              <Icon size={20} />
              {!collapsed && <span className="font-medium">{label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-800">
        <button
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 w-full transition-colors",
            collapsed && "justify-center"
          )}
        >
          <LogOut size={20} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Sidebar for desktop */}
      <div className="hidden md:flex">{SidebarContent}</div>

      {/* Sidebar Drawer for mobile */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden">
          <div className="absolute left-0 top-0 bottom-0 w-64">
            {SidebarContent}
          </div>
        </div>
      )}

      {/* Mobile toggle button */}
      {!mobileOpen && (
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden fixed top-3 left-3 z-50 bg-slate-900 border border-slate-700 rounded-md p-2 text-slate-200"
        >
          <Menu size={20} />
        </button>
      )}
    </>
  );
}
