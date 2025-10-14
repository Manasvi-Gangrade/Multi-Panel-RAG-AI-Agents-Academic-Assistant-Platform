import { motion } from "framer-motion";
import {
  Users,
  FileQuestion,
  ClipboardCheck,
  BarChart3,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/shared/StatCard";
import { AIChatInterface } from "@/components/shared/AIChatInterface";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const stats = [
  {
    title: "Question Papers",
    value: 12,
    subtitle: "Created this semester",
    icon: FileQuestion,
    trend: { value: 25, isPositive: true },
  },
  {
    title: "Assignments",
    value: 34,
    subtitle: "Active assignments",
    icon: ClipboardCheck,
  },
  {
    title: "Students",
    value: 156,
    subtitle: "Across 4 classes",
    icon: Users,
    trend: { value: 8, isPositive: true },
  },
  {
    title: "Avg. Score",
    value: "78%",
    subtitle: "Class average",
    icon: TrendingUp,
    trend: { value: 5, isPositive: true },
  },
];

const recentPapers = [
  { name: "Mid-Term Physics Exam", difficulty: "Medium", questions: 50, status: "Draft" },
  { name: "Chemistry Quiz Unit 3", difficulty: "Easy", questions: 25, status: "Published" },
  { name: "Mathematics Final", difficulty: "Hard", questions: 40, status: "Draft" },
];

const pendingEvaluations = [
  { name: "Physics Assignment 5", submissions: 45, pending: 12 },
  { name: "Chemistry Lab Report", submissions: 38, pending: 8 },
  { name: "Math Problem Set 3", submissions: 52, pending: 20 },
];

export default function TeacherDashboard() {
  return (
    <DashboardLayout role="teacher">
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="font-display text-3xl font-bold">Teacher Dashboard 📚</h1>
            <p className="text-muted-foreground">
              Automate assessments and track student performance with AI.
            </p>
          </div>
          <Button variant="teacher" size="lg">
            <FileQuestion className="mr-2 h-4 w-4" />
            Create Question Paper
          </Button>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <StatCard key={stat.title} {...stat} role="teacher" delay={i * 0.1} />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-5">
          {/* AI Chat - Takes 3 columns */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-3"
          >
            <AIChatInterface
              role="teacher"
              placeholder="Generate questions, create assignments, or analyze student performance..."
            />
          </motion.div>

          {/* Side Panel - Takes 2 columns */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Papers */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card variant="elevated">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileQuestion className="h-5 w-5 text-teacher" />
                    Recent Papers
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {recentPapers.map((paper) => (
                    <div
                      key={paper.name}
                      className="flex items-center justify-between rounded-lg bg-muted/50 p-3"
                    >
                      <div>
                        <p className="text-sm font-medium">{paper.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {paper.questions} Qs • {paper.difficulty}
                        </p>
                      </div>
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-medium ${
                          paper.status === "Published"
                            ? "bg-teacher/10 text-teacher"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {paper.status}
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Pending Evaluations */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card variant="elevated">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-teacher" />
                    Pending Evaluations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {pendingEvaluations.map((item) => (
                    <div key={item.name}>
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium">{item.name}</p>
                        <span className="text-xs text-muted-foreground">
                          {item.pending}/{item.submissions}
                        </span>
                      </div>
                      <Progress
                        value={((item.submissions - item.pending) / item.submissions) * 100}
                        className="h-2"
                      />
                    </div>
                  ))}
                  <Button variant="outline" className="w-full">
                    Start AI Evaluation
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card variant="teacher" className="p-6">
            <h3 className="font-display font-semibold mb-4">Quick Actions</h3>
            <div className="grid gap-4 md:grid-cols-4">
              {[
                { label: "Generate MCQs", icon: FileQuestion },
                { label: "Create Assignment", icon: ClipboardCheck },
                { label: "Check Plagiarism", icon: AlertCircle },
                { label: "View Analytics", icon: BarChart3 },
              ].map((action) => (
                <Button key={action.label} variant="outline" className="h-auto py-4 flex-col gap-2">
                  <action.icon className="h-6 w-6 text-teacher" />
                  <span className="text-sm">{action.label}</span>
                </Button>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
