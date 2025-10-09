import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Mic, MicOff, Paperclip, Sparkles } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ChatInterfaceProps {
  role: "student" | "teacher" | "researcher";
  placeholder?: string;
  onSend?: (message: string) => void;
}

const roleColor = {
  student: "bg-student",
  teacher: "bg-teacher",
  researcher: "bg-researcher",
};

const sampleResponses: Record<string, string[]> = {
  student: [
    "Based on your uploaded notes on Thermodynamics, here's a summary:\n\n**First Law**: Energy cannot be created or destroyed, only transformed. ΔU = Q - W\n\n**Second Law**: Entropy of an isolated system always increases.\n\nWould you like me to generate a quiz on this topic? 📝",
    "Great question! Let me explain this in Hinglish:\n\nDekhiye, entropy ek measure hai disorder ka. Jab bhi koi process hota hai naturally, entropy badhti hai. Isko aise samjhiye - agar aap ek room mein perfume spray karein, toh woh spread hoga, concentrate nahi hoga wapas! 🌟",
    "I've generated 5 flashcards from your Chapter 3 notes. Here's a preview:\n\n🃏 **Card 1**: What is isothermal process?\n→ A process where temperature remains constant (ΔT = 0)\n\nShall I create more or start a quiz session?",
  ],
  teacher: [
    "I've analyzed your uploaded material and generated a question bank with 20 questions:\n\n- **Easy (8)**: Definition and recall-based\n- **Medium (7)**: Application-based\n- **Hard (5)**: Analysis and evaluation\n\nAll questions are tagged with Bloom's Taxonomy levels. Want to review them?",
    "Plagiarism check complete! ✅\n\n- **Document 1**: 98% original (2% common phrases)\n- **Document 2**: 85% original (flagged: 3 paragraphs match online sources)\n\nDetailed report is ready for download.",
  ],
  researcher: [
    "I've summarized your uploaded paper on Transformer Models:\n\n**Key Findings:**\n1. Self-attention mechanism outperforms RNN by 2.3x on BLEU scores\n2. Pre-training on large corpora enables effective transfer learning\n3. Multi-head attention captures different relationship aspects\n\n**Related Papers Found:** 12 papers with high relevance scores\n\nShall I generate a citation graph?",
    "Knowledge graph generated! 🗺️\n\nI identified 15 key concepts and 28 relationships from your papers. The central nodes are:\n- Attention Mechanism\n- Transfer Learning\n- Pre-training Objectives\n\nWould you like me to create a presentation from this analysis?",
  ],
};

const ChatInterface = ({ role, placeholder = "Ask anything...", onSend }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const responseIndex = useRef(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), role: "user", content: input, timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    onSend?.(input);

    setIsTyping(true);
    const responses = sampleResponses[role];
    const idx = responseIndex.current % responses.length;
    responseIndex.current++;

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: "assistant", content: responses[idx], timestamp: new Date() },
      ]);
      setIsTyping(false);
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 1200 + Math.random() * 800);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <Sparkles className="w-12 h-12 text-muted-foreground/30 mb-4" />
            <h3 className="font-display text-lg font-semibold text-muted-foreground/60">Start a conversation</h3>
            <p className="text-sm text-muted-foreground/40 mt-1 max-w-md">
              Upload your materials and ask questions. The AI assistant will help you learn, create, and explore.
            </p>
          </div>
        )}

        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? `${roleColor[role]} text-primary-foreground`
                    : "glass-card"
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.content}</div>
                <div className={`text-[10px] mt-1 ${msg.role === "user" ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                  {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
            <div className="glass-card rounded-2xl px-4 py-3 flex items-center gap-1.5">
              <motion.span className="w-2 h-2 rounded-full bg-muted-foreground/40" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0 }} />
              <motion.span className="w-2 h-2 rounded-full bg-muted-foreground/40" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} />
              <motion.span className="w-2 h-2 rounded-full bg-muted-foreground/40" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }} />
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-2 glass-card rounded-xl px-3 py-2">
          <button className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary">
            <Paperclip className="w-4 h-4" />
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder={placeholder}
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/50"
          />
          <button
            onClick={() => setIsRecording(!isRecording)}
            className={`p-2 rounded-lg transition-colors ${isRecording ? "bg-destructive text-destructive-foreground" : "text-muted-foreground hover:text-foreground hover:bg-secondary"}`}
          >
            {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className={`p-2 rounded-lg ${roleColor[role]} text-primary-foreground disabled:opacity-40 transition-opacity`}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
