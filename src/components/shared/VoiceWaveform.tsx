import React from 'react';
import { motion } from 'framer-motion';

interface VoiceWaveformProps {
  isListening: boolean;
  color?: string;
}

export const VoiceWaveform: React.FC<VoiceWaveformProps> = ({ 
  isListening, 
  color = "var(--primary)" 
}) => {
  const bars = Array.from({ length: 8 });

  return (
    <div className="flex items-center gap-1 h-6">
      {bars.map((_, i) => (
        <motion.div
          key={i}
          initial={{ height: 4 }}
          animate={isListening ? {
            height: [4, 16, 8, 20, 4],
          } : { height: 4 }}
          transition={isListening ? {
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.15,
            ease: "easeInOut"
          } : { duration: 0.3 }}
          className="w-1 rounded-full"
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  );
};
