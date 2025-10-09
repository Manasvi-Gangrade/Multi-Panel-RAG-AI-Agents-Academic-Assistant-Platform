import { useState } from "react";
import { motion } from "framer-motion";
import FileUploadZone from "@/components/FileUploadZone";
import { FileQuestion, Sparkles, Tag } from "lucide-react";

const generatedQuestions = [
  { q: "Explain the concept of polymorphism in OOP with an example.", difficulty: "Hard", bloom: "Analyze", type: "Long Answer" },
  { q: "What is the difference between stack and queue?", difficulty: "Easy", bloom: "Understand", type: "Short Answer" },
  { q: "Write a function to reverse a linked list.", difficulty: "Medium", bloom: "Apply", type: "Coding" },
  { q: "Which of the following is NOT a principle of OOP?", difficulty: "Easy", bloom: "Remember", type: "MCQ" },
  { q: "Design a class hierarchy for a library management system.", difficulty: "Hard", bloom: "Create", type: "Long Answer" },
  { q: "Compare time complexities of BFS and DFS.", difficulty: "Medium", bloom: "Analyze", type: "Short Answer" },
];

const difficultyColors: Record<string, string> = {
  Easy: "bg-teacher-light text-teacher",
  Medium: "bg-amber-100 text-amber-700",
  Hard: "bg-red-100 text-red-600",
};

const TeacherQuizGen = () => {
  const [generated, setGenerated] = useState(false);

  return (
    <div className="p-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-2xl font-bold text-foreground mb-1">Assessment Generator</h1>
        <p className="text-sm text-muted-foreground">Upload course material to auto-generate test papers, assignments & question banks with difficulty tagging.</p>
      </motion.div>

      <FileUploadZone role="teacher" title="Upload Course Material" />

      {!generated && (
        <button onClick={() => setGenerated(true)} className="px-6 py-3 rounded-xl gradient-teacher text-primary-foreground font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity">
          <Sparkles className="w-4 h-4" /> Generate Assessment
        </button>
      )}

      {generated && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-semibold flex items-center gap-2">
              <FileQuestion className="w-4 h-4 text-teacher" /> Generated Questions ({generatedQuestions.length})
            </h3>
            <div className="flex gap-2">
              {["Easy", "Medium", "Hard"].map(d => (
                <span key={d} className={`text-xs px-2 py-0.5 rounded-full ${difficultyColors[d]}`}>
                  {d}: {generatedQuestions.filter(q => q.difficulty === d).length}
                </span>
              ))}
            </div>
          </div>

          {generatedQuestions.map((q, i) => (
            <motion.div key={i} className="glass-card rounded-lg p-4" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <p className="text-sm font-medium">{q.q}</p>
                  <div className="flex gap-2 mt-2">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${difficultyColors[q.difficulty]}`}>{q.difficulty}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-muted-foreground flex items-center gap-1">
                      <Tag className="w-2.5 h-2.5" /> {q.bloom}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">{q.type}</span>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground font-mono">Q{i + 1}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default TeacherQuizGen;
