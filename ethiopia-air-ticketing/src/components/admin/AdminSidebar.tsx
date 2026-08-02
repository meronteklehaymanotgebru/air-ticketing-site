"use client";

import { useState, ComponentType, SVGProps } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ReceiptText,
  Undo2,
  Wallet,
  FolderTree,
  ShieldAlert,
  Users,
  Settings,
  Menu,
  ChevronDown,
  Plane,
  Bell,
  Inbox,
} from "lucide-react";

type IconType = ComponentType<SVGProps<SVGSVGElement>>;

type NavChild = {
  label: string;
  href: string;
  icon?: IconType;
};

type NavItem = 
  | { label: string; href: string; icon: IconType; id?: never; children?: never }
  | { label: string; icon: IconType; id: string; children: NavChild[]; href?: never };

export default function AdminSidebar({ 
  role,
  isMobileOpen,
  setIsMobileOpen
}: { 
  role: string;
  isMobileOpen?: boolean;
  setIsMobileOpen?: (open: boolean) => void;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({ content: true });
  const pathname = usePathname();

  const toggleExpand = (menu: string) => {
    setExpandedMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
    if (isCollapsed) setIsCollapsed(false);
  };

  const navItems: NavItem[] = [
    { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Sales Register", href: "/admin/sales", icon: ReceiptText },
    { label: "Refund", href: "/admin/refunds", icon: Undo2 },
    { label: "Cash Out", href: "/admin/cashout", icon: Wallet },
    {
      label: "Content Management",
      icon: FolderTree,
      id: "content",
      children: [
        { label: "Manage Services", href: "/admin/services", icon: Plane },
        { label: "Announcements", href: "/admin/announcements", icon: Bell },
      ],
    },
    { label: "Audit Log", href: "/admin/audit", icon: ShieldAlert },
    { label: "User Management", href: "/admin/users", icon: Users },
    {
      label: "Settings",
      icon: Settings,
      id: "settings",
      children: [
        { label: "Branch Offices", href: "/admin/settings/branch-offices" },
        { label: "Payment Modes", href: "/admin/settings/payment-modes" },
        { label: "NON IATA", href: "/admin/settings/non-iata" },
        { label: "Agent Codes", href: "/admin/settings/agent-codes" },
      ],
    },
  ];

  // RBAC Navigation Filtering
  const filteredNavItems = navItems.filter((item) => {
    if (role === "ADMIN") return true; // Admin sees everything
    
    // Branch Manager sees Sales, Refunds, Cashout
    if (role === "MANAGER") {
      return ["Sales Register", "Refund", "Cash Out"].includes(item.label);
    }
    
    // Ticket Agent sees Sales, Refunds
    if (role === "AGENT") {
      return ["Sales Register", "Refund"].includes(item.label);
    }
    
    // Finance sees Cashout
    if (role === "FINANCE") {
      return ["Cash Out"].includes(item.label);
    }

    return false;
  });

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileOpen?.(false)}
        />
      )}
      
      <div
        className={`bg-brand-900 text-white transition-all duration-300 flex flex-col h-screen fixed md:relative z-50 ${
          isCollapsed ? "w-20" : "w-64"
        } ${isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
      <div className="h-14 flex items-center justify-between px-4 border-b border-white/10 shrink-0">
        {!isCollapsed && <span className="font-bold text-lg text-brand-gold truncate">Admin Panel</span>}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-gray-300 hover:text-white p-1 rounded hover:bg-white/10 mx-auto"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-4 space-y-1 custom-scrollbar">
        {filteredNavItems.map((item) => {
          const isActive = "href" in item && item.href ? pathname.startsWith(item.href) : false;
          
          if (item.children) {
            const isExpanded = expandedMenus[item.id];
            const hasActiveChild = item.children.some(c => pathname.startsWith(c.href));
            
            return (
              <div key={item.label} className="mb-1">
                <button
                  onClick={() => toggleExpand(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium transition-colors hover:bg-white/10 ${
                    hasActiveChild ? "text-brand-gold" : "text-gray-300"
                  } ${isCollapsed ? "justify-center" : ""}`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5 shrink-0" />
                    {!isCollapsed && <span>{item.label}</span>}
                  </div>
                  {!isCollapsed && (
                    <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                  )}
                </button>
                
                {!isCollapsed && isExpanded && (
                  <div className="bg-black/20 py-1">
                    {item.children.map((child) => {
                      const isChildActive = pathname === child.href;
                      return (
                        <Link
                          key={child.label}
                          href={child.href}
                          className={`flex items-center gap-3 px-12 py-2 text-sm transition-colors hover:text-white ${
                            isChildActive ? "text-brand-gold font-semibold" : "text-gray-400"
                          }`}
                        >
                          {child.icon && <child.icon className="w-4 h-4" />}
                          <span>{child.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }

          return (
            <Link
              key={item.label}
              href={item.href!}
              className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors hover:bg-white/10 ${
                isActive ? "bg-white/10 text-brand-gold border-r-4 border-brand-gold" : "text-gray-300"
              } ${isCollapsed ? "justify-center border-none" : ""}`}
              title={isCollapsed ? item.label : undefined}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </div>
    </div>
    </>
  );
}