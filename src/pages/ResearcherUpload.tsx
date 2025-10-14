import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { UploadZone } from "@/components/shared/UploadZone";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Quote, Network, Presentation } from "lucide-react";

const uploadTips = [
  {
    icon: FileText,
    title: "Paper Analysis",
    description: "Upload PDFs for automatic summarization and key insights",
  },
  {
    icon: Quote,
    title: "Citation Extraction",
    description: "Automatically extract and format references in any style",
  },
  {
    icon: Network,
    title: "Knowledge Graphs",
    description: "Visualize concept relationships across papers",
  },
  {
    icon: Presentation,
    title: "Slide Generation",
    description: "Convert papers into presentation-ready slides",
  },
];

export default function ResearcherUpload() {
  return (
    <DashboardLayout role="researcher">
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-display text-3xl font-bold">Upload Research Papers</h1>
          <p className="text-muted-foreground">
            Add papers for AI-powered analysis, summarization, and citation extraction
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Upload Zone - Takes 2 columns */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card variant="elevated">
              <CardHeader>
                <CardTitle>Upload Research Papers</CardTitle>
                <CardDescription>
                  Upload PDFs of research papers for comprehensive AI analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <UploadZone role="researcher" />
              </CardContent>
            </Card>
          </motion.div>

          {/* Tips Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            {uploadTips.map((tip, i) => (
              <motion.div
                key={tip.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
              >
                <Card variant="glass" className="p-4">
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-researcher/10">
                      <tip.icon className="h-5 w-5 text-researcher" />
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">{tip.title}</h3>
                      <p className="text-xs text-muted-foreground">{tip.description}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}
