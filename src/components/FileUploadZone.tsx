import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, FileText, X, CheckCircle } from "lucide-react";

interface FileUploadZoneProps {
  role: "student" | "teacher" | "researcher";
  title?: string;
  accept?: string;
}

const roleGradient = {
  student: "gradient-student",
  teacher: "gradient-teacher",
  researcher: "gradient-researcher",
};

const FileUploadZone = ({ role, title = "Upload Materials", accept = ".pdf,.doc,.docx,.txt,.pptx" }: FileUploadZoneProps) => {
  const [files, setFiles] = useState<{ name: string; size: string; status: "uploading" | "done" }[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleFiles = (fileList: FileList) => {
    const newFiles = Array.from(fileList).map((f) => ({
      name: f.name,
      size: (f.size / 1024).toFixed(1) + " KB",
      status: "uploading" as const,
    }));
    setFiles((prev) => [...prev, ...newFiles]);

    newFiles.forEach((f, i) => {
      setTimeout(() => {
        setFiles((prev) => prev.map((file) => (file.name === f.name ? { ...file, status: "done" } : file)));
      }, 1000 + i * 500);
    });
  };

  return (
    <div className="space-y-3">
      <h3 className="font-display font-semibold text-sm">{title}</h3>
      <div
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
          isDragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
        }`}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleFiles(e.dataTransfer.files); }}
      >
        <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
        <p className="text-sm text-muted-foreground mb-1">Drag & drop files here or</p>
        <label className={`inline-block px-4 py-1.5 rounded-lg ${roleGradient[role]} text-primary-foreground text-sm cursor-pointer font-medium`}>
          Browse Files
          <input type="file" className="hidden" accept={accept} multiple onChange={(e) => e.target.files && handleFiles(e.target.files)} />
        </label>
        <p className="text-xs text-muted-foreground mt-2">PDF, DOC, TXT, PPTX supported</p>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, i) => (
            <motion.div
              key={file.name + i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 glass-card rounded-lg px-3 py-2"
            >
              <FileText className="w-4 h-4 text-muted-foreground shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{file.name}</p>
                <p className="text-xs text-muted-foreground">{file.size}</p>
              </div>
              {file.status === "done" ? (
                <CheckCircle className="w-4 h-4 text-teacher shrink-0" />
              ) : (
                <motion.div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
              )}
              <button onClick={() => setFiles((prev) => prev.filter((_, idx) => idx !== i))}>
                <X className="w-3.5 h-3.5 text-muted-foreground hover:text-destructive" />
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUploadZone;
