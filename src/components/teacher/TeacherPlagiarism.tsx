import { useState } from "react";
import { motion } from "framer-motion";
import FileUploadZone from "@/components/FileUploadZone";
import { ShieldCheck, AlertTriangle, CheckCircle, Sparkles } from "lucide-react";

const results = [
  { doc: "Student_A_Assignment.docx", score: 98, status: "original" as const, flags: 0 },
  { doc: "Student_B_Assignment.docx", score: 72, status: "flagged" as const, flags: 3 },
  { doc: "Student_C_Assignment.docx", score: 95, status: "original" as const, flags: 1 },
  { doc: "Student_D_Assignment.docx", score: 45, status: "plagiarized" as const, flags: 8 },
  { doc: "Student_E_Assignment.docx", score: 91, status: "original" as const, flags: 0 },
];

const statusConfig = {
  original: { icon: CheckCircle, label: "Original", color: "text-teacher" },
  flagged: { icon: AlertTriangle, label: "Flagged", color: "text-amber-500" },
  plagiarized: { icon: ShieldCheck, label: "Plagiarized", color: "text-destructive" },
};

const TeacherPlagiarism = () => {
  const [checked, setChecked] = useState(false);

  return (
    <div className="p-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-2xl font-bold text-foreground mb-1">Plagiarism Detection</h1>
        <p className="text-sm text-muted-foreground">Upload student submissions to check for academic integrity.</p>
      </motion.div>

      <FileUploadZone role="teacher" title="Upload Submissions" />

      {!checked && (
        <button onClick={() => setChecked(true)} className="px-6 py-3 rounded-xl gradient-teacher text-primary-foreground font-semibold flex items-center gap-2 hover:opacity-90">
          <Sparkles className="w-4 h-4" /> Run Plagiarism Check
        </button>
      )}

      {checked && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
          <h3 className="font-display font-semibold text-sm">Results</h3>
          {results.map((r, i) => {
            const cfg = statusConfig[r.status];
            return (
              <motion.div key={i} className="glass-card rounded-lg p-4 flex items-center gap-4" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}>
                <cfg.icon className={`w-5 h-5 ${cfg.color} shrink-0`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{r.doc}</p>
                  <p className="text-xs text-muted-foreground">{r.flags} flagged passages</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold font-display">{r.score}%</p>
                  <p className={`text-xs font-medium ${cfg.color}`}>{cfg.label}</p>
                </div>
                {/* Originality bar */}
                <div className="w-24 h-2 rounded-full bg-secondary overflow-hidden">
                  <div className={`h-full rounded-full ${r.score > 90 ? "bg-teacher" : r.score > 70 ? "bg-amber-400" : "bg-destructive"}`} style={{ width: `${r.score}%` }} />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
};

export default TeacherPlagiarism;
