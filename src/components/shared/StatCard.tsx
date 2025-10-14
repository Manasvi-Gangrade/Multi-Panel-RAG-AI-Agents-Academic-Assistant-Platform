import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

type Role = "student" | "teacher" | "researcher";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  role: Role;
  delay?: number;
}

const roleStyles = {
  student: {
    iconBg: "bg-student/10",
    iconColor: "text-student",
    trendPositive: "text-student",
  },
  teacher: {
    iconBg: "bg-teacher/10",
    iconColor: "text-teacher",
    trendPositive: "text-teacher",
  },
  researcher: {
    iconBg: "bg-researcher/10",
    iconColor: "text-researcher",
    trendPositive: "text-researcher",
  },
};

export function StatCard({ title, value, subtitle, icon: Icon, trend, role, delay = 0 }: StatCardProps) {
  const styles = roleStyles[role];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
    >
      <Card variant="elevated" className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-3xl font-display font-bold">{value}</p>
            {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
            {trend && (
              <p className={cn("text-xs font-medium", trend.isPositive ? styles.trendPositive : "text-destructive")}>
                {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}% from last week
              </p>
            )}
          </div>
          <div className={cn("rounded-xl p-3", styles.iconBg)}>
            <Icon className={cn("h-6 w-6", styles.iconColor)} />
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
