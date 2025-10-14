import { ReactNode } from "react";
import { DashboardSidebar } from "./DashboardSidebar";

type Role = "student" | "teacher" | "researcher";

interface DashboardLayoutProps {
  children: ReactNode;
  role: Role;
}

export function DashboardLayout({ children, role }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar role={role} />
      <main className="ml-64 min-h-screen">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
