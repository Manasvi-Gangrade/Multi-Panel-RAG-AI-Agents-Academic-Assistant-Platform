import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, X, Check, Loader2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast";

type Role = "student" | "teacher" | "researcher";

interface UploadedFile {
  file: File;
  id: string;
  progress: number;
  status: "uploading" | "processing" | "complete" | "error";
}

interface UploadZoneProps {
  role: Role;
  onFilesSelect?: (files: File[]) => void;
  onFilesProcessed?: (files: File[]) => void;
  acceptedTypes?: string;
  maxFiles?: number;
}

const roleStyles = {
  student: {
    border: "border-student/30 hover:border-student",
    bg: "bg-student/5",
    icon: "text-student",
    button: "bg-student hover:bg-student/90 text-student-foreground",
  },
  teacher: {
    border: "border-teacher/30 hover:border-teacher",
    bg: "bg-teacher/5",
    icon: "text-teacher",
    button: "bg-teacher hover:bg-teacher/90 text-teacher-foreground",
  },
  researcher: {
    border: "border-researcher/30 hover:border-researcher",
    bg: "bg-researcher/5",
    icon: "text-researcher",
    button: "bg-researcher hover:bg-researcher/90 text-researcher-foreground",
  },
};

export function UploadZone({
  role,
  onFilesSelect,
  onFilesProcessed,
  acceptedTypes = ".pdf,.doc,.docx,.txt,.ppt,.pptx",
  maxFiles = 10,
}: UploadZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const styles = roleStyles[role];

  const simulateUpload = (file: File): Promise<void> => {
    return new Promise((resolve) => {
      const id = Math.random().toString(36).substr(2, 9);
      const newFile: UploadedFile = {
        file,
        id,
        progress: 0,
        status: "uploading",
      };
      
      setFiles((prev) => [...prev, newFile]);

      // Simulate upload progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          setFiles((prev) =>
            prev.map((f) =>
              f.id === id ? { ...f, progress: 100, status: "processing" } : f
            )
          );
          
          // Simulate processing
          setTimeout(() => {
            setFiles((prev) =>
              prev.map((f) =>
                f.id === id ? { ...f, status: "complete" } : f
              )
            );
            resolve();
          }, 800);
        } else {
          setFiles((prev) =>
            prev.map((f) => (f.id === id ? { ...f, progress } : f))
          );
        }
      }, 200);
    });
  };

  const handleFiles = async (newFiles: File[]) => {
    const validFiles = newFiles.filter((file) => {
      const ext = "." + file.name.split(".").pop()?.toLowerCase();
      return acceptedTypes.includes(ext);
    });

    if (validFiles.length !== newFiles.length) {
      toast({
        title: "Invalid file type",
        description: "Some files were skipped. Supported: PDF, DOC, DOCX, TXT, PPT",
        variant: "destructive",
      });
    }

    if (files.length + validFiles.length > maxFiles) {
      toast({
        title: "Too many files",
        description: `Maximum ${maxFiles} files allowed`,
        variant: "destructive",
      });
      return;
    }

    onFilesSelect?.(validFiles);

    for (const file of validFiles) {
      await simulateUpload(file);
    }
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      const droppedFiles = Array.from(e.dataTransfer.files);
      handleFiles(droppedFiles);
    },
    [maxFiles]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const selectedFiles = Array.from(e.target.files);
        handleFiles(selectedFiles);
      }
    },
    [maxFiles]
  );

  const removeFile = useCallback((id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  }, []);

  const processFiles = async () => {
    setIsProcessing(true);
    
    // Simulate processing
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    const completedFiles = files.filter((f) => f.status === "complete").map((f) => f.file);
    onFilesProcessed?.(completedFiles);
    
    toast({
      title: "Files processed successfully! 🎉",
      description: `${completedFiles.length} file(s) are now in your knowledge vault`,
    });
    
    setIsProcessing(false);
  };

  const completedCount = files.filter((f) => f.status === "complete").length;
  const currentStep = files.length === 0 ? 1 : isProcessing ? 3 : completedCount === files.length ? 3 : 2;

  const steps = [
    { id: 1, label: "Select" },
    { id: 2, label: "Upload" },
    { id: 3, label: "Ready" },
  ];

  return (
    <div className="space-y-6">
      {/* Stepper */}
      <div className="flex items-center justify-between px-2 mb-8">
        {steps.map((step, i) => (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center gap-2">
              <div className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full border-2 transition-colors",
                currentStep >= step.id ? cn(styles.icon, styles.border, "bg-background") : "border-muted text-muted-foreground"
              )}>
                {currentStep > step.id ? <Check className="h-4 w-4" /> : <span className="text-xs">{step.id}</span>}
              </div>
              <span className={cn("text-[10px] font-bold uppercase tracking-wider", currentStep >= step.id ? "text-foreground" : "text-muted-foreground")}>
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={cn("h-[2px] flex-1 mx-4 transition-colors", currentStep > step.id ? styles.icon.replace('text-', 'bg-') : "bg-muted")} />
            )}
          </React.Fragment>
        ))}
      </div>

      <motion.div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        animate={{ scale: isDragOver ? 1.02 : 1 }}
        className={cn(
          "relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-12 transition-all duration-300 cursor-pointer",
          styles.border,
          isDragOver && styles.bg
        )}
      >
        <input
          type="file"
          accept={acceptedTypes}
          multiple
          onChange={handleFileSelect}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
        <motion.div
          animate={{ y: isDragOver ? -5 : 0 }}
          className={cn("mb-4 rounded-full bg-muted p-4", styles.icon)}
        >
          <Upload className="h-8 w-8" />
        </motion.div>
        <h3 className="mb-2 text-lg font-semibold">Drop files here or click to upload</h3>
        <p className="text-sm text-muted-foreground">
          Supports PDF, DOC, DOCX, TXT, PPT • Max {maxFiles} files
        </p>
      </motion.div>

      {/* File List */}
      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-2"
          >
            {files.map((uploadedFile) => (
              <motion.div
                key={uploadedFile.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="rounded-lg bg-muted/50 p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className={cn("rounded-lg p-2", styles.bg)}>
                      <FileText className={cn("h-5 w-5", styles.icon)} />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{uploadedFile.file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(uploadedFile.file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {uploadedFile.status === "uploading" && (
                      <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                    )}
                    {uploadedFile.status === "processing" && (
                      <Loader2 className={cn("h-4 w-4 animate-spin", styles.icon)} />
                    )}
                    {uploadedFile.status === "complete" && (
                      <Check className="h-4 w-4 text-green-500" />
                    )}
                    {uploadedFile.status === "error" && (
                      <AlertCircle className="h-4 w-4 text-destructive" />
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFile(uploadedFile.id)}
                      className="h-8 w-8"
                      disabled={uploadedFile.status === "uploading"}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                {uploadedFile.status === "uploading" && (
                  <Progress value={uploadedFile.progress} className="h-1" />
                )}
                {uploadedFile.status === "processing" && (
                  <p className="text-xs text-muted-foreground mt-1 animate-pulse">AI is extracting knowledge components...</p>
                )}
                {uploadedFile.status === "complete" && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-2 text-[11px] text-muted-foreground bg-background/50 p-2 rounded border border-border/50"
                  >
                    <span className="font-semibold block mb-1">AI INSIGHT:</span>
                    Key concepts detected: Thermodynamics, Entropy, Heat Engines.
                  </motion.div>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {completedCount > 0 && (
        <Button 
          onClick={processFiles} 
          disabled={isProcessing}
          className={cn("w-full", styles.button)} 
          size="lg"
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Check className="mr-2 h-4 w-4" />
              Add {completedCount} file{completedCount > 1 ? "s" : ""} to Knowledge Vault
            </>
          )}
        </Button>
      )}
    </div>
  );
}