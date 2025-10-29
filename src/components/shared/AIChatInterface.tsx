import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Mic, Paperclip, Bot, User, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { VoiceWaveform } from "./VoiceWaveform";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { RGPVSyllabus } from "@/lib/syllabus";

type Role = "student" | "teacher" | "researcher";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface AIChatInterfaceProps {
  role: Role;
  placeholder?: string;
  systemContext?: string;
}

const roleStyles = {
  student: {
    accent: "bg-student hover:bg-student/90 text-black",
    accentLight: "bg-student/5 dark:bg-student/10 border-b border-student/10",
    text: "text-student font-bold",
    border: "border-student/30",
    userBubble: "bg-gradient-to-r from-student via-amber-400 to-yellow-300 text-black font-bold shadow-md shadow-student/10 rounded-2xl px-4 py-3",
    assistantBubble: "bg-student/5 dark:bg-student/10 border border-student/20 shadow-sm shadow-student/5 rounded-2xl px-4 py-3 text-foreground",
    botIcon: "bg-student text-black font-extrabold"
  },
  teacher: {
    accent: "bg-teacher hover:bg-teacher/90 text-white",
    accentLight: "bg-teacher/5 dark:bg-teacher/10 border-b border-teacher/10",
    text: "text-teacher font-bold",
    border: "border-teacher/30",
    userBubble: "bg-gradient-to-r from-teacher via-orange-500 to-red-400 text-white font-semibold shadow-md shadow-teacher/10 rounded-2xl px-4 py-3",
    assistantBubble: "bg-teacher/5 dark:bg-teacher/10 border border-teacher/20 shadow-sm shadow-teacher/5 rounded-2xl px-4 py-3 text-foreground",
    botIcon: "bg-teacher text-white font-extrabold"
  },
  researcher: {
    accent: "bg-researcher hover:bg-researcher/90 text-white",
    accentLight: "bg-researcher/5 dark:bg-researcher/10 border-b border-researcher/10",
    text: "text-researcher font-bold",
    border: "border-researcher/30",
    userBubble: "bg-gradient-to-r from-researcher via-rose-500 to-pink-500 text-white font-semibold shadow-md shadow-researcher/10 rounded-2xl px-4 py-3",
    assistantBubble: "bg-researcher/5 dark:bg-researcher/10 border border-researcher/20 shadow-sm shadow-researcher/5 rounded-2xl px-4 py-3 text-foreground",
    botIcon: "bg-researcher text-white font-extrabold"
  },
};

const sampleResponses = {
  student: [
    "Based on your uploaded documents, I can see the key concepts involve thermodynamics and heat transfer. Would you like me to create a summary or generate quiz questions?",
    "I've analyzed your notes on Chapter 5. The main topics covered are cellular respiration and photosynthesis. Shall I create flashcards for these concepts?",
  ],
  teacher: [
    "I've reviewed the syllabus you uploaded. I can generate a question paper covering Units 1-4 with a mix of MCQs and descriptive questions. Would you like me to proceed?",
    "Based on the course material, I suggest creating assignments with difficulty levels: 40% Easy, 40% Medium, 20% Hard. Should I generate sample questions?",
  ],
  researcher: [
    "I've analyzed the research paper. Key findings include novel approaches to machine learning optimization. Would you like me to extract citations or generate a summary?",
    "The paper references 45 sources. I can format them in APA, MLA, or IEEE style. I also found 12 related papers that might be relevant to your research.",
  ],
};

export function AIChatInterface({ role, placeholder, systemContext }: AIChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: `Hello! I'm your AI ${role} assistant powered by RAG technology. I can help you with your ${role === "student" ? "learning and revision" : role === "teacher" ? "assessment and evaluation" : "research and analysis"}. How can I assist you today?`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isHinglish, setIsHinglish] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const styles = roleStyles[role];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      let responseText = "";
      const query = input.toLowerCase();

      // Find if we have dynamic context in the systemContext string (e.g. "SubjectCode:AL-501,Unit:3")
      let activeSubjectCode = "";
      let activeUnitNum = 0;
      if (systemContext) {
        const matches = systemContext.match(/SubjectCode:([^,]+),Unit:(\d+)/);
        if (matches) {
          activeSubjectCode = matches[1];
          activeUnitNum = parseInt(matches[2], 10);
        }
      }

      // Try to find a matching syllabus subject and unit
      const subject = RGPVSyllabus.find(s => s.code === activeSubjectCode);
      const unit = subject?.units.find(u => u.number === activeUnitNum);

      // Check if user is asking for syllabus questions
      if (query.includes("syllabus") || query.includes("objective") || query.includes("outcome") || query.includes("what is AL-") || query.includes("what is al-")) {
        if (subject) {
          responseText = `**RGPV ${subject.code}: ${subject.name}** Syllabus Overview:\n\n` +
            `**Course Objectives:**\n${subject.objectives.map(o => `* ${o}`).join("\n")}\n\n` +
            `**Course Outcomes:**\n${subject.outcomes.slice(0, 2).map(o => `* ${o}`).join("\n")}\n\n` +
            `**Units Included:**\n${subject.units.map(u => `* Unit ${u.number}: ${u.title}`).join("\n")}`;
        } else {
          responseText = "This portal is fully synchronized with the **RGPV 5th Semester AIML Syllabus**! You can select any subject (Operating Systems, DBMS, Deep Learning, NLP, Optimization, AI in Healthcare, Info Retrieval, Computational Intelligence) to load detailed RGPV reference answers, syllabus maps, and unit guides.";
        }
      } 
      // Check if user is asking for textbooks
      else if (query.includes("book") || query.includes("textbook") || query.includes("reference") || query.includes("author")) {
        if (subject) {
          responseText = `Here are the **RGPV Recommended Textbooks & References** for **${subject.code} (${subject.name})**:\n\n` +
            `**Recommended Textbooks:**\n${subject.textbooks.map((b, idx) => `${idx + 1}. ${b}`).join("\n")}\n\n` +
            `**Reference Books:**\n${subject.references.length > 0 ? subject.references.map((b, idx) => `${idx + 1}. ${b}`).join("\n") : "Standard university publications."}`;
        } else {
          responseText = "I can guide you on RGPV textbooks. Please select a specific 5th Sem AIML subject (such as AL-501 OS or AL-502 DBMS) from the dashboard, and ask me about its recommended textbooks!";
        }
      }
      // Check if we can find a keyword match in the active unit's sample questions or general database
      else {
        let foundMatch = false;

        // First look in the active unit's sample questions
        if (unit) {
          for (const q of unit.sampleQuestions) {
            const questionWords = q.question.toLowerCase().split(" ");
            if (unit.keyKeywords.some(kw => query.includes(kw.toLowerCase())) || 
                questionWords.some(w => w.length > 4 && query.includes(w))) {
              responseText = `**[RGPV Syllabus Focus: ${subject?.code} - Unit ${unit.number}]**\n\n` +
                `**Q: ${q.question}**\n\n` +
                `**A:** ${q.answer}\n\n` +
                `*Reference: ${subject?.textbooks[0]}*`;
              foundMatch = true;
              break;
            }
          }
        }

        // If not found in the active unit, look in any unit of any subject
        if (!foundMatch) {
          for (const subj of RGPVSyllabus) {
            for (const u of subj.units) {
              for (const q of u.sampleQuestions) {
                if (u.keyKeywords.some(kw => query.includes(kw.toLowerCase())) || 
                    q.question.toLowerCase().split(" ").some(w => w.length > 4 && query.includes(w))) {
                  responseText = `**[RGPV Syllabus Focus: ${subj.code} - Unit ${u.number}: ${u.title}]**\n\n` +
                    `**Q: ${q.question}**\n\n` +
                    `**A:** ${q.answer}\n\n` +
                    `*Textbook: ${subj.textbooks[0]}*`;
                  foundMatch = true;
                  break;
                }
              }
              if (foundMatch) break;
            }
            if (foundMatch) break;
          }
        }

        // Default to a rich context-aware Hinglish response if no direct match
        if (!responseText) {
          const hinglishGreet = isHinglish 
            ? "Aapke selected RGPV syllabus topic ko analyze kiya hai. " 
            : "I've analyzed your RGPV syllabus query. ";

          if (subject && unit) {
            responseText = `${hinglishGreet}Let's review **${subject.code} (Unit ${unit.number}: ${unit.title})**:\n\n` +
              `This unit covers:\n*"${unit.contents.substring(0, 150)}..."*\n\n` +
              `Would you like me to:\n` +
              `1. Generate an RGPV exam-style question paper for this unit?\n` +
              `2. Give you a detailed description of keywords: **${unit.keyKeywords.slice(0, 4).join(", ")}**?\n` +
              `3. Create a set of interactive revision flashcards?`;
          } else if (subject) {
            responseText = `${hinglishGreet}I am currently configured for **${subject.code} (${subject.name})**.\n\n` +
              `Please select a specific Unit (1 to 5) in the study plan to access concentrated questions, dynamic notes, or select one of the following quick revision questions:\n` +
              `* *"Explain standard concepts of ${subject.name}"*\n` +
              `* *"What are the recommended reference books for ${subject.code}?"*\n` +
              `* *"Generate a quick RGPV mock quiz for this subject."*`;
          } else {
            responseText = `${hinglishGreet}I can help you thoroughly revise all RGPV 5th Semester AIML subjects!\n\n` +
              `Please ask me about concepts from **AL-501 Operating Systems** (e.g. semaphores, paging, system calls), **AL-502 DBMS** (e.g. BCNF, serializability, stored procedures), **AL-503 Deep Learning / IR / Optimization**, or **AL-504 NLP / AI in Healthcare / Computational Intelligence**.`;
          }
        }
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: responseText,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="flex h-[600px] flex-col rounded-2xl border border-border bg-card overflow-hidden">
      {/* Header */}
      <div className={cn("flex items-center justify-between border-b border-border px-6 py-4", styles.accentLight)}>
        <div className="flex items-center gap-3">
          <div className={cn("flex h-10 w-10 items-center justify-center rounded-full", styles.accent)}>
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-display font-semibold">AI Assistant</h3>
            <p className="text-xs text-muted-foreground">Powered by RAG Technology</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Label htmlFor="hinglish-mode" className="text-xs font-medium cursor-pointer">Hinglish</Label>
            <Switch 
              id="hinglish-mode" 
              checked={isHinglish} 
              onCheckedChange={setIsHinglish}
              className="scale-75"
            />
          </div>
          <Badge variant="outline" className={cn("bg-background/50", styles.text, styles.border)}>
            {isHinglish ? "EN + HI" : "EN ONLY"}
          </Badge>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence mode="popLayout">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={cn(
                "flex gap-3",
                message.role === "user" ? "flex-row-reverse" : "flex-row"
              )}
            >
              <div
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full shadow-sm",
                  message.role === "user" ? "bg-muted text-foreground border border-border" : styles.botIcon
                )}
              >
                {message.role === "user" ? (
                  <User className="h-4 w-4 text-foreground" />
                ) : (
                  <Bot className="h-4 w-4 text-current" />
                )}
              </div>
              <div
                className={
                  message.role === "user"
                    ? styles.userBubble
                    : styles.assistantBubble
                }
              >
                <div className="text-sm leading-relaxed space-y-2">
                  {renderMarkdownContent(message.content, role)}
                </div>
                <p className="mt-1 text-[10px] opacity-60">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing Indicator */}
        <AnimatePresence>
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex gap-3"
            >
              <div className={cn("flex h-8 w-8 items-center justify-center rounded-full", styles.accent)}>
                <Bot className="h-4 w-4 text-primary-foreground" />
              </div>
              <div className="flex items-center gap-1 rounded-2xl bg-muted px-4 py-3">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.1 }}
                    className={cn("h-2 w-2 rounded-full", styles.accent)}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-border p-4">
        <div className="flex gap-2">
          <Button variant="outline" size="icon" className="shrink-0">
            <Paperclip className="h-4 w-4" />
          </Button>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder={isListening ? "Listening..." : (placeholder || "Ask me anything about your documents...")}
            className="flex-1"
            disabled={isListening}
          />
          {isListening && <VoiceWaveform isListening={true} color={`hsl(var(--${role}))`} />}
          <Button 
            variant={isListening ? "default" : "outline"} 
            size="icon" 
            className={cn("shrink-0", isListening && styles.accent)}
            onClick={() => setIsListening(!isListening)}
          >
            <Mic className={cn("h-4 w-4", isListening && "animate-pulse")} />
          </Button>
          <Button onClick={handleSend} size="icon" className={cn(styles.accent, "shrink-0")}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

// Simple Markdown parser for structured RGPV sessional responses
function renderMarkdownContent(text: string, role: Role) {
  if (!text) return null;
  
  // Split by double newline to separate paragraphs/sections
  const blocks = text.split(/\n\n+/);
  
  return (
    <div className="space-y-3">
      {blocks.map((block, bIdx) => {
        const lines = block.split("\n");
        
        // Check if the entire block consists only of list items
        const isBulletList = lines.every(line => line.trim().startsWith("* ") || line.trim().startsWith("- "));
        const isNumberedList = lines.every(line => /^\d+\.\s/.test(line.trim()));
        
        if (isBulletList) {
          return (
            <ul key={bIdx} className="list-disc ml-5 space-y-1.5 my-2">
              {lines.map((line, lIdx) => {
                const cleanText = line.trim().substring(2);
                return (
                  <li key={lIdx} className="text-sm leading-relaxed pl-0.5">
                    {parseInlineBold(cleanText, role)}
                  </li>
                );
              })}
            </ul>
          );
        }
        
        if (isNumberedList) {
          return (
            <ol key={bIdx} className="space-y-2 my-2.5">
              {lines.map((line, lIdx) => {
                const cleanText = line.trim().replace(/^\d+\.\s/, "");
                const num = lIdx + 1;
                return (
                  <li key={lIdx} className="list-none">
                    <div className="flex items-center gap-3 rounded-xl border border-border/50 bg-background/50 dark:bg-background/25 p-3 shadow-sm hover:scale-[1.01] hover:bg-background/80 transition-all duration-300">
                      <span className={cn(
                        "flex h-5 w-5 shrink-0 items-center justify-center rounded-md font-mono text-[10px] font-bold text-white",
                        role === "student" ? "bg-student text-black" : role === "teacher" ? "bg-teacher" : "bg-researcher"
                      )}>
                        {num}
                      </span>
                      <span className="flex-1 text-xs font-semibold text-foreground">{parseInlineBold(cleanText, role)}</span>
                    </div>
                  </li>
                );
              })}
            </ol>
          );
        }
        
        // Standalone headers
        if (block.trim().startsWith("### ")) {
          return (
            <h5 key={bIdx} className="font-display font-bold text-xs text-foreground mt-3 mb-1 uppercase tracking-wider">
              {parseInlineBold(block.trim().substring(4), role)}
            </h5>
          );
        }
        if (block.trim().startsWith("## ")) {
          return (
            <h4 key={bIdx} className="font-display font-bold text-sm text-foreground mt-4 mb-1">
              {parseInlineBold(block.trim().substring(3), role)}
            </h4>
          );
        }
        if (block.trim().startsWith("# ")) {
          return (
            <h3 key={bIdx} className="font-display font-extrabold text-base text-foreground mt-5 mb-2 border-b border-border pb-1">
              {parseInlineBold(block.trim().substring(2), role)}
            </h3>
          );
        }
        
        // Regular paragraph with potential single newlines (like lists combined with text or multi-line equations)
        return (
          <p key={bIdx} className="text-sm leading-relaxed">
            {lines.map((line, lIdx) => renderLine(line, lIdx, role))}
          </p>
        );
      })}
    </div>
  );
}

// Single-line formatter supporting bullet markers, number markers, and inline bold
function renderLine(line: string, index: number, role: Role) {
  const trimmed = line.trim();
  
  if (trimmed.startsWith("* ") || trimmed.startsWith("- ")) {
    const content = trimmed.substring(2);
    return (
      <span key={index} className={cn(
        "flex items-start gap-2.5 py-1.5 pl-3 border-l-2 my-1.5 rounded-r-lg bg-background/20",
        role === "student" ? "border-student/50" : role === "teacher" ? "border-teacher/50" : "border-researcher/50"
      )}>
        <span className={cn(
          "h-1.5 w-1.5 rounded-full mt-2 shrink-0 animate-pulse",
          role === "student" ? "bg-student" : role === "teacher" ? "bg-teacher" : "bg-researcher"
        )} />
        <span className="flex-1 text-xs leading-relaxed text-foreground">{parseInlineBold(content, role)}</span>
      </span>
    );
  }
  
  if (/^\d+\.\s/.test(trimmed)) {
    const numMatch = trimmed.match(/^(\d+)\.\s(.*)/);
    if (numMatch) {
      const num = numMatch[1];
      const content = numMatch[2];
      return (
        <span key={index} className="block my-1.5">
          <div className="flex items-center gap-3 rounded-xl border border-border/50 bg-background/50 dark:bg-background/25 p-3 shadow-sm hover:scale-[1.01] hover:bg-background/80 transition-all duration-300">
            <span className={cn(
              "flex h-5 w-5 shrink-0 items-center justify-center rounded-md font-mono text-[10px] font-bold text-white",
              role === "student" ? "bg-student text-black" : role === "teacher" ? "bg-teacher" : "bg-researcher"
            )}>
              {num}
            </span>
            <span className="flex-1 text-xs font-semibold text-foreground">{parseInlineBold(content, role)}</span>
          </div>
        </span>
      );
    }
  }

  return (
    <span key={index} className="block mt-1 first:mt-0 leading-relaxed">
      {parseInlineBold(line, role)}
    </span>
  );
}

// Inline double-asterisk **bold** generator with dynamic role colors
function parseInlineBold(text: string, role?: Role) {
  if (!text.includes("**")) return text;
  
  const parts = text.split("**");
  return parts.map((part, index) => {
    if (index % 2 === 1) {
      return (
        <strong key={index} className={cn(
          "font-bold",
          role === "student" ? "text-student font-extrabold" : 
          role === "teacher" ? "text-teacher font-extrabold" : 
          role === "researcher" ? "text-researcher font-extrabold" : "text-foreground"
        )}>
          {part}
        </strong>
      );
    }
    return part;
  });
}
