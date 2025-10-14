import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import StudentDashboard from "./pages/StudentDashboard";
import StudentUpload from "./pages/StudentUpload";
import TeacherDashboard from "./pages/TeacherDashboard";
import TeacherUpload from "./pages/TeacherUpload";
import ResearcherDashboard from "./pages/ResearcherDashboard";
import ResearcherUpload from "./pages/ResearcherUpload";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            
            {/* Student Routes */}
            <Route path="/student" element={<StudentDashboard />} />
            <Route path="/student/upload" element={<StudentUpload />} />
            <Route path="/student/vault" element={<StudentDashboard />} />
            <Route path="/student/chat" element={<StudentDashboard />} />
            <Route path="/student/summaries" element={<StudentDashboard />} />
            <Route path="/student/quizzes" element={<StudentDashboard />} />
            <Route path="/student/flashcards" element={<StudentDashboard />} />
            <Route path="/student/settings" element={<Settings />} />
            
            {/* Teacher Routes */}
            <Route path="/teacher" element={<TeacherDashboard />} />
            <Route path="/teacher/upload" element={<TeacherUpload />} />
            <Route path="/teacher/papers" element={<TeacherDashboard />} />
            <Route path="/teacher/assignments" element={<TeacherDashboard />} />
            <Route path="/teacher/evaluation" element={<TeacherDashboard />} />
            <Route path="/teacher/analytics" element={<TeacherDashboard />} />
            <Route path="/teacher/settings" element={<Settings />} />
            
            {/* Researcher Routes */}
            <Route path="/researcher" element={<ResearcherDashboard />} />
            <Route path="/researcher/upload" element={<ResearcherUpload />} />
            <Route path="/researcher/search" element={<ResearcherDashboard />} />
            <Route path="/researcher/summaries" element={<ResearcherDashboard />} />
            <Route path="/researcher/citations" element={<ResearcherDashboard />} />
            <Route path="/researcher/graph" element={<ResearcherDashboard />} />
            <Route path="/researcher/slides" element={<ResearcherDashboard />} />
            <Route path="/researcher/settings" element={<Settings />} />
            
            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
