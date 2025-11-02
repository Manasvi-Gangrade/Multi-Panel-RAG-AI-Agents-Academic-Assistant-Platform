import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  Upload,
  MessageSquare,
  FileText,
  Brain,
  FlaskConical,
  Users,
  BarChart3,
  Settings,
  Home,
  GraduationCap,
  ClipboardCheck,
  FileQuestion,
  Search,
  Network,
  Presentation,
  Quote,
  Moon,
  Sun,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

type Role = "student" | "teacher" | "researcher";

interface DashboardSidebarProps {
  role: Role;
}

const roleConfig = {
  student: {
    title: "Student Panel",
    icon: GraduationCap,
    color: "text-student",
    bgColor: "bg-student",
    hoverClass: "hover:bg-student/10 hover:text-student",
    items: [
      { label: "Dashboard", icon: Home, href: "/student" },
      { label: "Knowledge Vault", icon: BookOpen, href: "/student/vault" },
      { label: "Upload Documents", icon: Upload, href: "/student/upload" },
      { label: "AI Assistant", icon: MessageSquare, href: "/student/chat" },
      { label: "Summaries", icon: FileText, href: "/student/summaries" },
      { label: "Quizzes", icon: Brain, href: "/student/quizzes" },
      { label: "Flashcards", icon: FlaskConical, href: "/student/flashcards" },
    ],
  },
  teacher: {
    title: "Teacher Panel",
    icon: Users,
    color: "text-teacher",
    bgColor: "bg-teacher",
    hoverClass: "hover:bg-teacher/10 hover:text-teacher",
    items: [
      { label: "Dashboard", icon: Home, href: "/teacher" },
      { label: "Upload Materials", icon: Upload, href: "/teacher/upload" },
      { label: "Generate Papers", icon: FileQuestion, href: "/teacher/papers" },
      { label: "Assignments", icon: ClipboardCheck, href: "/teacher/assignments" },
      { label: "Evaluation", icon: BarChart3, href: "/teacher/evaluation" },
      { label: "Analytics", icon: BarChart3, href: "/teacher/analytics" },
    ],
  },
  researcher: {
    title: "Researcher Panel",
    icon: FlaskConical,
    color: "text-researcher",
    bgColor: "bg-researcher",
    hoverClass: "hover:bg-researcher/10 hover:text-researcher",
    items: [
      { label: "Dashboard", icon: Home, href: "/researcher" },
      { label: "Upload Papers", icon: Upload, href: "/researcher/upload" },
      { label: "Paper Search", icon: Search, href: "/researcher/search" },
      { label: "Summaries", icon: FileText, href: "/researcher/summaries" },
      { label: "Citations", icon: Quote, href: "/researcher/citations" },
      { label: "Knowledge Graph", icon: Network, href: "/researcher/graph" },
      { label: "Presentations", icon: Presentation, href: "/researcher/slides" },
    ],
  },
};

export function DashboardSidebar({ role }: DashboardSidebarProps) {
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const config = roleConfig[role];
  const RoleIcon = config.icon;

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-card border-r border-border">
      <div className="flex h-full flex-col">
        {/* Logo Section */}
        <div className="flex h-16 items-center gap-3 border-b border-border px-6">
          <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl", config.bgColor)}>
            <RoleIcon className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className={cn("font-display font-semibold", config.color)}>{config.title}</h2>
            <p className="text-xs text-muted-foreground">Academic AI Platform</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {config.items.map((item) => {
            const isActive = location.pathname === item.href;
            const ItemIcon = item.icon;

            return (
              <Link key={item.href} to={item.href}>
                <motion.div
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? cn(config.bgColor, "text-primary-foreground")
                      : cn("text-muted-foreground hover:text-foreground", config.hoverClass)
                  )}
                >
                  <ItemIcon className="h-4 w-4" />
                  {item.label}
                </motion.div>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-border p-4">
          <Link to="/">
            <motion.div
              whileHover={{ x: 4 }}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors",
                config.hoverClass
              )}
            >
              <Home className="h-4 w-4" />
              Back to Home
            </motion.div>
          </Link>
          <Link to={`/${role}/settings`}>
            <motion.div
              whileHover={{ x: 4 }}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors",
                config.hoverClass
              )}
            >
              <Settings className="h-4 w-4" />
              Settings
            </motion.div>
          </Link>
          <div className="mt-2 flex items-center justify-between px-3">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Appearance</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
}
