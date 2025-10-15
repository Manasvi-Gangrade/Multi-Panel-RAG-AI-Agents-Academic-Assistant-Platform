import ChatInterface from "@/components/ChatInterface";

const ResearcherChat = () => (
  <div className="h-screen flex flex-col">
    <div className="border-b border-border p-4">
      <h2 className="font-display text-lg font-bold text-foreground">Research AI Assistant</h2>
      <p className="text-xs text-muted-foreground">Summarize papers, find citations & generate knowledge graphs</p>
    </div>
    <div className="flex-1 min-h-0">
      <ChatInterface role="researcher" placeholder="Ask about your research papers..." />
    </div>
  </div>
);

export default ResearcherChat;
