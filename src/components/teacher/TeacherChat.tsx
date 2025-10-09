import ChatInterface from "@/components/ChatInterface";

const TeacherChat = () => (
  <div className="h-screen flex flex-col">
    <div className="border-b border-border p-4">
      <h2 className="font-display text-lg font-bold text-foreground">Teacher AI Assistant</h2>
      <p className="text-xs text-muted-foreground">Upload materials, generate assessments & track student performance</p>
    </div>
    <div className="flex-1 min-h-0">
      <ChatInterface role="teacher" placeholder="Ask about assessment creation, analytics..." />
    </div>
  </div>
);

export default TeacherChat;
