import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Users, BookOpen } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";

const performanceData = [
  { name: "Quiz 1", avg: 72, high: 95, low: 45 },
  { name: "Quiz 2", avg: 68, high: 88, low: 40 },
  { name: "Quiz 3", avg: 78, high: 98, low: 52 },
  { name: "Midterm", avg: 71, high: 92, low: 38 },
  { name: "Quiz 4", avg: 82, high: 96, low: 55 },
  { name: "Quiz 5", avg: 85, high: 100, low: 60 },
];

const engagementData = [
  { week: "W1", students: 42 },
  { week: "W2", students: 38 },
  { week: "W3", students: 45 },
  { week: "W4", students: 41 },
  { week: "W5", students: 48 },
  { week: "W6", students: 50 },
];

const gradeDistribution = [
  { name: "A+", value: 8, color: "#10b981" },
  { name: "A", value: 12, color: "#34d399" },
  { name: "B", value: 15, color: "#fbbf24" },
  { name: "C", value: 10, color: "#f97316" },
  { name: "D", value: 5, color: "#ef4444" },
];

const stats = [
  { label: "Total Students", value: "50", icon: Users, trend: "+5" },
  { label: "Avg Score", value: "78%", icon: TrendingUp, trend: "+3%" },
  { label: "Quizzes Created", value: "12", icon: BookOpen, trend: "+2" },
  { label: "Completion Rate", value: "92%", icon: BarChart3, trend: "+4%" },
];

const TeacherAnalytics = () => (
  <div className="p-6 space-y-6">
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <h1 className="font-display text-2xl font-bold text-foreground mb-1">Analytics Dashboard</h1>
      <p className="text-sm text-muted-foreground">Track student engagement and performance across assessments.</p>
    </motion.div>

    {/* Stats row */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {stats.map((stat, i) => (
        <motion.div key={stat.label} className="glass-card-strong rounded-xl p-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-teacher-light flex items-center justify-center">
              <stat.icon className="w-4 h-4 text-teacher" />
            </div>
            <span className="text-xs text-teacher font-medium">{stat.trend}</span>
          </div>
          <p className="font-display text-xl font-bold">{stat.value}</p>
          <p className="text-xs text-muted-foreground">{stat.label}</p>
        </motion.div>
      ))}
    </div>

    {/* Charts */}
    <div className="grid md:grid-cols-2 gap-4">
      <motion.div className="glass-card-strong rounded-xl p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
        <h3 className="font-display font-semibold text-sm mb-3">Performance Over Time</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 13% 90%)" />
            <XAxis dataKey="name" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip />
            <Bar dataKey="avg" fill="hsl(160 84% 39%)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div className="glass-card-strong rounded-xl p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
        <h3 className="font-display font-semibold text-sm mb-3">Student Engagement</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={engagementData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 13% 90%)" />
            <XAxis dataKey="week" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip />
            <Line type="monotone" dataKey="students" stroke="hsl(160 84% 39%)" strokeWidth={2} dot={{ r: 4, fill: "hsl(160 84% 39%)" }} />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div className="glass-card-strong rounded-xl p-4 md:col-span-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
        <h3 className="font-display font-semibold text-sm mb-3">Grade Distribution</h3>
        <div className="flex items-center gap-8">
          <ResponsiveContainer width="40%" height={180}>
            <PieChart>
              <Pie data={gradeDistribution} cx="50%" cy="50%" outerRadius={70} dataKey="value" label={({ name }) => name}>
                {gradeDistribution.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex-1 grid grid-cols-2 gap-2">
            {gradeDistribution.map(g => (
              <div key={g.name} className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: g.color }} />
                <span>{g.name}: {g.value} students</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  </div>
);

export default TeacherAnalytics;
