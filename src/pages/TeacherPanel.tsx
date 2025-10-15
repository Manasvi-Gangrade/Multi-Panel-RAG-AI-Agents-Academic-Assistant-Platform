import { Routes, Route, Navigate } from "react-router-dom";
import { BookOpen, MessageSquare, FileQuestion, BarChart3, ShieldCheck, Settings } from "lucide-react";
import PanelLayout from "@/components/PanelLayout";
import TeacherChat from "@/components/teacher/TeacherChat";
import TeacherQuizGen from "@/components/teacher/TeacherQuizGen";
import TeacherAnalytics from "@/components/teacher/TeacherAnalytics";
import TeacherPlagiarism from "@/components/teacher/TeacherPlagiarism";

const navItems = [
  { label: "AI Assistant", path: "/teacher", icon: MessageSquare },
  { label: "Assessment Gen", path: "/teacher/quiz", icon: FileQuestion },
  { label: "Analytics", path: "/teacher/analytics", icon: BarChart3 },
  { label: "Plagiarism Check", path: "/teacher/plagiarism", icon: ShieldCheck },
];

const TeacherPanel = () => (
  <PanelLayout title="Teacher" role="teacher" icon={BookOpen} navItems={navItems}>
    <Routes>
      <Route path="/" element={<TeacherChat />} />
      <Route path="/quiz" element={<TeacherQuizGen />} />
      <Route path="/analytics" element={<TeacherAnalytics />} />
      <Route path="/plagiarism" element={<TeacherPlagiarism />} />
      <Route path="*" element={<Navigate to="/teacher" />} />
    </Routes>
  </PanelLayout>
);

export default TeacherPanel;
