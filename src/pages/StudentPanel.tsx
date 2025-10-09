import { Routes, Route, Navigate } from "react-router-dom";
import { GraduationCap, MessageSquare, BookOpen, Brain, Layers, Mic, Hand } from "lucide-react";
import PanelLayout from "@/components/PanelLayout";
import StudentChat from "@/components/student/StudentChat";
import StudentVault from "@/components/student/StudentVault";
import StudentQuiz from "@/components/student/StudentQuiz";
import StudentFlashcards from "@/components/student/StudentFlashcards";

const navItems = [
  { label: "AI Chat", path: "/student", icon: MessageSquare },
  { label: "Knowledge Vault", path: "/student/vault", icon: BookOpen },
  { label: "Quiz Generator", path: "/student/quiz", icon: Brain },
  { label: "Flashcards", path: "/student/flashcards", icon: Layers },
];

const StudentPanel = () => (
  <PanelLayout title="Student" role="student" icon={GraduationCap} navItems={navItems}>
    <Routes>
      <Route path="/" element={<StudentChat />} />
      <Route path="/vault" element={<StudentVault />} />
      <Route path="/quiz" element={<StudentQuiz />} />
      <Route path="/flashcards" element={<StudentFlashcards />} />
      <Route path="*" element={<Navigate to="/student" />} />
    </Routes>
  </PanelLayout>
);

export default StudentPanel;
