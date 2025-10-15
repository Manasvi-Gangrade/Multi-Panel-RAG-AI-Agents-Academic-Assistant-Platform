import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface AiAvatarProps {
  isSpeaking?: boolean;
  mood?: "idle" | "thinking" | "happy" | "speaking";
  size?: "sm" | "md" | "lg";
}

const AiAvatar = ({ isSpeaking = false, mood = "idle", size = "md" }: AiAvatarProps) => {
  const [blinkState, setBlinkState] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlinkState(true);
      setTimeout(() => setBlinkState(false), 150);
    }, 3000 + Math.random() * 2000);
    return () => clearInterval(interval);
  }, []);

  const sizeMap = { sm: 80, md: 140, lg: 200 };
  const s = sizeMap[size];

  return (
    <div className="relative flex items-center justify-center" style={{ width: s, height: s }}>
      {/* Glow ring */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ background: "radial-gradient(circle, hsl(217 91% 60% / 0.2), transparent 70%)" }}
        animate={{
          scale: isSpeaking ? [1, 1.15, 1] : [1, 1.05, 1],
        }}
        transition={{ duration: isSpeaking ? 0.5 : 2, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Body */}
      <motion.svg
        viewBox="0 0 200 200"
        width={s * 0.85}
        height={s * 0.85}
        animate={mood === "happy" ? { y: [0, -4, 0] } : mood === "thinking" ? { rotate: [0, -3, 3, 0] } : {}}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Head */}
        <motion.ellipse
          cx="100" cy="85" rx="55" ry="52"
          fill="url(#headGrad)"
          stroke="hsl(217 91% 50%)"
          strokeWidth="2"
        />
        {/* Body */}
        <motion.ellipse
          cx="100" cy="160" rx="40" ry="28"
          fill="url(#bodyGrad)"
          stroke="hsl(217 91% 50%)"
          strokeWidth="2"
        />
        {/* Neck */}
        <rect x="90" y="130" width="20" height="12" rx="4" fill="hsl(217 91% 70%)" />

        {/* Eyes */}
        <motion.ellipse
          cx="80" cy="80" rx="8" ry={blinkState ? 1 : 9}
          fill="hsl(224 30% 15%)"
          transition={{ duration: 0.1 }}
        />
        <motion.ellipse
          cx="120" cy="80" rx="8" ry={blinkState ? 1 : 9}
          fill="hsl(224 30% 15%)"
          transition={{ duration: 0.1 }}
        />
        {/* Eye highlights */}
        <circle cx="84" cy="76" r="3" fill="hsl(0 0% 100%)" opacity="0.8" />
        <circle cx="124" cy="76" r="3" fill="hsl(0 0% 100%)" opacity="0.8" />

        {/* Mouth */}
        {isSpeaking ? (
          <motion.ellipse
            cx="100" cy="102" rx="10"
            animate={{ ry: [3, 7, 3] }}
            transition={{ duration: 0.3, repeat: Infinity }}
            fill="hsl(0 70% 60%)"
          />
        ) : mood === "happy" ? (
          <path d="M 85 98 Q 100 115 115 98" stroke="hsl(224 30% 15%)" strokeWidth="3" fill="none" strokeLinecap="round" />
        ) : (
          <path d="M 88 100 Q 100 108 112 100" stroke="hsl(224 30% 15%)" strokeWidth="3" fill="none" strokeLinecap="round" />
        )}

        {/* Thinking dots */}
        {mood === "thinking" && (
          <>
            <motion.circle cx="85" cy="55" r="3" fill="hsl(217 91% 60%)" animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0 }} />
            <motion.circle cx="100" cy="50" r="3" fill="hsl(217 91% 60%)" animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }} />
            <motion.circle cx="115" cy="55" r="3" fill="hsl(217 91% 60%)" animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }} />
          </>
        )}

        {/* Left arm */}
        <motion.path
          d="M 62 148 Q 40 140 35 155"
          stroke="hsl(217 91% 60%)"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
          animate={mood === "happy" ? { d: ["M 62 148 Q 35 130 25 115", "M 62 148 Q 40 140 35 155"] } : {}}
          transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
        />
        {/* Right arm */}
        <motion.path
          d="M 138 148 Q 160 140 165 155"
          stroke="hsl(217 91% 60%)"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
          animate={isSpeaking ? { d: ["M 138 148 Q 165 125 170 115", "M 138 148 Q 160 140 165 155"] } : {}}
          transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
        />

        <defs>
          <linearGradient id="headGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(217 91% 85%)" />
            <stop offset="100%" stopColor="hsl(200 95% 80%)" />
          </linearGradient>
          <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(217 91% 70%)" />
            <stop offset="100%" stopColor="hsl(200 95% 65%)" />
          </linearGradient>
        </defs>
      </motion.svg>
    </div>
  );
};

export default AiAvatar;
