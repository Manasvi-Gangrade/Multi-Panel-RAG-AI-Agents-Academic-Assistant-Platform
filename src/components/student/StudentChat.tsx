import { useState } from "react";
import { motion } from "framer-motion";
import AiAvatar from "@/components/AiAvatar";
import ChatInterface from "@/components/ChatInterface";
import { Mic, Hand, Globe } from "lucide-react";

const StudentChat = () => {
  const [avatarMood, setAvatarMood] = useState<"idle" | "thinking" | "happy" | "speaking">("idle");
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleSend = () => {
    setAvatarMood("thinking");
    setIsSpeaking(false);
    setTimeout(() => {
      setAvatarMood("speaking");
      setIsSpeaking(true);
      setTimeout(() => {
        setAvatarMood("happy");
        setIsSpeaking(false);
        setTimeout(() => setAvatarMood("idle"), 2000);
      }, 2000);
    }, 1200);
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header with avatar */}
      <div className="border-b border-border p-4">
        <div className="flex items-center gap-4">
          <AiAvatar isSpeaking={isSpeaking} mood={avatarMood} size="sm" />
          <div className="flex-1">
            <h2 className="font-display text-lg font-bold text-foreground">Study Buddy AI</h2>
            <p className="text-xs text-muted-foreground">Your personal AI tutor • English & Hinglish</p>
            <div className="flex gap-2 mt-2">
              {[
                { icon: Mic, label: "Voice" },
                { icon: Hand, label: "Gesture" },
                { icon: Globe, label: "Hinglish" },
              ].map((f) => (
                <span key={f.label} className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-student-light text-student font-medium">
                  <f.icon className="w-3 h-3" />
                  {f.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Chat */}
      <div className="flex-1 min-h-0">
        <ChatInterface role="student" placeholder="Ask your study buddy anything..." onSend={handleSend} />
      </div>
    </div>
  );
};

export default StudentChat;
