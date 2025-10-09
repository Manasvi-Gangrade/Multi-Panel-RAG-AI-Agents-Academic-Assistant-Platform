import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface PanelLayoutProps {
  children: React.ReactNode;
  title: string;
  role: "student" | "teacher" | "researcher";
  icon: LucideIcon;
  navItems: { label: string; path: string; icon: LucideIcon }[];
}

const roleStyles = {
  student: { gradient: "gradient-student", text: "text-gradient-student", bg: "bg-student-light", border: "border-student/20" },
  teacher: { gradient: "gradient-teacher", text: "text-gradient-teacher", bg: "bg-teacher-light", border: "border-teacher/20" },
  researcher: { gradient: "gradient-researcher", text: "text-gradient-researcher", bg: "bg-researcher-light", border: "border-researcher/20" },
};

const PanelLayout = ({ children, title, role, icon: Icon, navItems }: PanelLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const styles = roleStyles[role];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <motion.aside
        className="w-64 glass-card-strong border-r flex flex-col shrink-0"
        initial={{ x: -64, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Logo */}
        <div className="p-4 border-b border-border">
          <button onClick={() => navigate("/")} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm mb-3">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl ${styles.gradient} flex items-center justify-center`}>
              <Icon className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h2 className={`font-display font-bold ${styles.text}`}>{title}</h2>
              <p className="text-xs text-muted-foreground">AI Assistant Panel</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                  isActive
                    ? `${styles.bg} font-medium text-foreground`
                    : "text-muted-foreground hover:bg-secondary"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* User badge */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full ${styles.gradient} flex items-center justify-center text-xs font-bold text-primary-foreground`}>
              {title[0]}
            </div>
            <div>
              <p className="text-sm font-medium">{title} User</p>
              <p className="text-xs text-muted-foreground">Demo Mode</p>
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Main content */}
      <motion.main
        className="flex-1 overflow-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {children}
      </motion.main>
    </div>
  );
};

export default PanelLayout;
