import { Routes, Route, Navigate } from "react-router-dom";
import { FlaskConical, MessageSquare, FileText, Link2, Network, Presentation } from "lucide-react";
import PanelLayout from "@/components/PanelLayout";
import ResearcherChat from "@/components/researcher/ResearcherChat";
import ResearcherSummary from "@/components/researcher/ResearcherSummary";
import ResearcherCitations from "@/components/researcher/ResearcherCitations";
import ResearcherKnowledgeGraph from "@/components/researcher/ResearcherKnowledgeGraph";

const navItems = [
  { label: "AI Assistant", path: "/researcher", icon: MessageSquare },
  { label: "Paper Summarizer", path: "/researcher/summary", icon: FileText },
  { label: "Citation Linker", path: "/researcher/citations", icon: Link2 },
  { label: "Knowledge Graph", path: "/researcher/graph", icon: Network },
];

const ResearcherPanel = () => (
  <PanelLayout title="Researcher" role="researcher" icon={FlaskConical} navItems={navItems}>
    <Routes>
      <Route path="/" element={<ResearcherChat />} />
      <Route path="/summary" element={<ResearcherSummary />} />
      <Route path="/citations" element={<ResearcherCitations />} />
      <Route path="/graph" element={<ResearcherKnowledgeGraph />} />
      <Route path="*" element={<Navigate to="/researcher" />} />
    </Routes>
  </PanelLayout>
);

export default ResearcherPanel;
