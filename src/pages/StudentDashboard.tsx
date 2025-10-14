import { motion } from "framer-motion";
import { BookOpen, FileText, Brain, FlaskConical, MessageSquare, TrendingUp } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/shared/StatCard";
import { AIChatInterface } from "@/components/shared/AIChatInterface";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const stats = [
  {
    title: "Documents Uploaded",
    value: 24,
    subtitle: "PDFs, notes & textbooks",
    icon: FileText,
    trend: { value: 12, isPositive: true },
  },
  {
    title: "Quizzes Completed",
    value: 18,
    subtitle: "Average score: 85%",
    icon: Brain,
    trend: { value: 8, isPositive: true },
  },
  {
    title: "Flashcards Created",
    value: 156,
    subtitle: "Across 12 topics",
    icon: FlaskConical,
  },
  {
    title: "Study Time",
    value: "42h",
    subtitle: "This month",
    icon: TrendingUp,
    trend: { value: 15, isPositive: true },
  },
];

const recentDocuments = [
  { name: "Physics Chapter 5 - Thermodynamics.pdf", date: "2 hours ago", pages: 24 },
  { name: "Chemistry Notes - Organic Compounds.docx", date: "Yesterday", pages: 18 },
  { name: "Mathematics Integration Formulas.pdf", date: "3 days ago", pages: 12 },
  { name: "Biology - Cell Structure.pptx", date: "1 week ago", pages: 32 },
];

export default function StudentDashboard() {
  return (
    <DashboardLayout role="student">
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="font-display text-3xl font-bold">Welcome back, Student! 👋</h1>
            <p className="text-muted-foreground">
              Your AI-powered learning assistant is ready to help you excel.
            </p>
          </div>
          <Button variant="student" size="lg">
            <BookOpen className="mr-2 h-4 w-4" />
            Quick Revision Mode
          </Button>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <StatCard key={stat.title} {...stat} role="student" delay={i * 0.1} />
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
              role="student"
              placeholder="Ask about your documents, request summaries, or generate quizzes..."
            />
          </motion.div>

          {/* Recent Documents - Takes 2 columns */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-2"
          >
            <Card variant="elevated" className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-student" />
                  Knowledge Vault
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentDocuments.map((doc) => (
                  <motion.div
                    key={doc.name}
                    whileHover={{ x: 4 }}
                    className="flex items-center justify-between rounded-lg bg-muted/50 p-3 cursor-pointer hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-student/10">
                        <FileText className="h-5 w-5 text-student" />
                      </div>
                      <div>
                        <p className="text-sm font-medium truncate max-w-[200px]">{doc.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {doc.pages} pages • {doc.date}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  </motion.div>
                ))}
                <Button variant="outline" className="w-full mt-4">
                  View All Documents
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card variant="student" className="p-6">
            <h3 className="font-display font-semibold mb-4">Quick Actions</h3>
            <div className="grid gap-4 md:grid-cols-4">
              {[
                { label: "Generate Summary", icon: FileText },
                { label: "Create Quiz", icon: Brain },
                { label: "Make Flashcards", icon: FlaskConical },
                { label: "Start Revision", icon: BookOpen },
              ].map((action) => (
                <Button key={action.label} variant="outline" className="h-auto py-4 flex-col gap-2">
                  <action.icon className="h-6 w-6 text-student" />
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
