import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { UploadZone } from "@/components/shared/UploadZone";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Mic, Camera, Lightbulb } from "lucide-react";

const uploadTips = [
  {
    icon: FileText,
    title: "Supported Formats",
    description: "PDF, DOC, DOCX, TXT, PPT, PPTX files up to 50MB each",
  },
  {
    icon: Mic,
    title: "Voice Upload",
    description: "Record lecture audio and we'll transcribe it automatically",
  },
  {
    icon: Camera,
    title: "Image Upload",
    description: "Upload handwritten notes - our AI can read them too!",
  },
  {
    icon: Lightbulb,
    title: "Pro Tip",
    description: "Upload related documents together for better AI understanding",
  },
];

export default function StudentUpload() {
  return (
    <DashboardLayout role="student">
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-display text-3xl font-bold">Upload Documents</h1>
          <p className="text-muted-foreground">
            Add your study materials to your personal Knowledge Vault
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
                <CardTitle>Upload Study Materials</CardTitle>
                <CardDescription>
                  Upload your PDFs, notes, textbooks, and lecture transcripts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <UploadZone role="student" />
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
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-student/10">
                      <tip.icon className="h-5 w-5 text-student" />
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
