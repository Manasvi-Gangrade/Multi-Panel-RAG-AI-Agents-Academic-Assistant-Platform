import { motion } from "framer-motion";
import FileUploadZone from "@/components/FileUploadZone";
import { FolderOpen, FileText, BookOpen, Video } from "lucide-react";

const mockFiles = [
  { name: "Physics_Ch1_Notes.pdf", type: "PDF", size: "2.4 MB", date: "Mar 28, 2026", icon: FileText },
  { name: "Chemistry_Syllabus.docx", type: "DOC", size: "1.1 MB", date: "Mar 25, 2026", icon: BookOpen },
  { name: "Math_Lecture_Recording.txt", type: "TXT", size: "450 KB", date: "Mar 22, 2026", icon: Video },
  { name: "Biology_Lab_Manual.pdf", type: "PDF", size: "5.8 MB", date: "Mar 20, 2026", icon: FileText },
];

const StudentVault = () => (
  <div className="p-6 space-y-6">
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <h1 className="font-display text-2xl font-bold text-foreground mb-1">Knowledge Vault</h1>
      <p className="text-sm text-muted-foreground">Upload your notes, syllabus & lectures. The AI builds a personalized knowledge base from your materials.</p>
    </motion.div>

    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
      <FileUploadZone role="student" title="Upload Study Materials" />
    </motion.div>

    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
      <div className="flex items-center gap-2 mb-3">
        <FolderOpen className="w-4 h-4 text-student" />
        <h3 className="font-display font-semibold text-sm">Your Materials ({mockFiles.length})</h3>
      </div>
      <div className="grid gap-2">
        {mockFiles.map((file, i) => (
          <motion.div
            key={file.name}
            className="glass-card rounded-lg px-4 py-3 flex items-center gap-3 hover:shadow-md transition-shadow cursor-pointer"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.05 }}
          >
            <div className="w-10 h-10 rounded-lg bg-student-light flex items-center justify-center">
              <file.icon className="w-5 h-5 text-student" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{file.name}</p>
              <p className="text-xs text-muted-foreground">{file.type} • {file.size}</p>
            </div>
            <span className="text-xs text-muted-foreground">{file.date}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  </div>
);

export default StudentVault;
