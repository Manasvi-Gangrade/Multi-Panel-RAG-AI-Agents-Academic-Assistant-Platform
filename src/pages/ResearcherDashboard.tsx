import { motion } from "framer-motion";
import {
  FlaskConical,
  FileText,
  Quote,
  Network,
  Presentation,
  Search,
  TrendingUp,
  BookOpen,
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/shared/StatCard";
import { AIChatInterface } from "@/components/shared/AIChatInterface";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { KnowledgeGraph } from "@/components/shared/KnowledgeGraph";

const stats = [
  {
    title: "Papers Analyzed",
    value: 47,
    subtitle: "Research papers processed",
    icon: FileText,
    trend: { value: 18, isPositive: true },
  },
  {
    title: "Citations Extracted",
    value: 892,
    subtitle: "Auto-formatted references",
    icon: Quote,
    trend: { value: 32, isPositive: true },
  },
  {
    title: "Knowledge Graphs",
    value: 12,
    subtitle: "Visual concept maps",
    icon: Network,
  },
  {
    title: "Presentations",
    value: 8,
    subtitle: "AI-generated slides",
    icon: Presentation,
    trend: { value: 15, isPositive: true },
  },
];

const recentPapers = [
  {
    title: "Deep Learning for Natural Language Processing",
    authors: "Smith et al.",
    year: 2024,
    citations: 156,
    status: "Analyzed",
  },
  {
    title: "Advances in Computer Vision: A Survey",
    authors: "Johnson & Lee",
    year: 2023,
    citations: 234,
    status: "Processing",
  },
  {
    title: "Quantum Computing Applications in ML",
    authors: "Chen et al.",
    year: 2024,
    citations: 89,
    status: "Analyzed",
  },
];

const relatedPapers = [
  { title: "Transformer Architecture Evolution", relevance: 95 },
  { title: "BERT and Beyond: Modern NLP Models", relevance: 92 },
  { title: "Attention Mechanisms in Deep Learning", relevance: 88 },
  { title: "Large Language Models: A Comprehensive Review", relevance: 85 },
];

export default function ResearcherDashboard() {
  return (
    <DashboardLayout role="researcher">
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="font-display text-3xl font-bold">Research Workspace 🔬</h1>
            <p className="text-muted-foreground">
              AI-powered research assistant for paper analysis and knowledge discovery.
            </p>
          </div>
          <Button variant="researcher" size="lg">
            <Search className="mr-2 h-4 w-4" />
            Find Related Papers
          </Button>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <StatCard key={stat.title} {...stat} role="researcher" delay={i * 0.1} />
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
              role="researcher"
              placeholder="Analyze papers, extract citations, or generate summaries..."
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
                    <BookOpen className="h-5 w-5 text-researcher" />
                    Recent Papers
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {recentPapers.map((paper) => (
                    <div
                      key={paper.title}
                      className="rounded-lg bg-muted/50 p-3"
                    >
                      <p className="text-sm font-medium line-clamp-1">{paper.title}</p>
                      <p className="text-xs text-muted-foreground mb-2">
                        {paper.authors} • {paper.year}
                      </p>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">
                          {paper.citations} citations
                        </Badge>
                        <span
                          className={`rounded-full px-2 py-1 text-xs font-medium ${
                            paper.status === "Analyzed"
                              ? "bg-researcher/10 text-researcher"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {paper.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Related Papers */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card variant="elevated">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-researcher" />
                    AI Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {relatedPapers.map((paper) => (
                    <div
                      key={paper.title}
                      className="flex items-center justify-between rounded-lg bg-muted/50 p-3"
                    >
                      <p className="text-sm font-medium line-clamp-1 flex-1">{paper.title}</p>
                      <Badge className="bg-researcher/10 text-researcher ml-2">
                        {paper.relevance}%
                      </Badge>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full">
                    View All Recommendations
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Knowledge Graph Preview */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Card variant="elevated">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Network className="h-5 w-5 text-researcher" />
                    Knowledge Map
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <KnowledgeGraph />
                  <Button variant="ghost" size="sm" className="w-full mt-2 text-xs">
                    Expand Full Graph
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
          <Card variant="researcher" className="p-6">
            <h3 className="font-display font-semibold mb-4">Quick Actions</h3>
            <div className="grid gap-4 md:grid-cols-5">
              {[
                { label: "Summarize Paper", icon: FileText },
                { label: "Extract Citations", icon: Quote },
                { label: "Knowledge Graph", icon: Network },
                { label: "Generate Slides", icon: Presentation },
                { label: "Find Papers", icon: Search },
              ].map((action) => (
                <Button key={action.label} variant="outline" className="h-auto py-4 flex-col gap-2">
                  <action.icon className="h-6 w-6 text-researcher" />
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
