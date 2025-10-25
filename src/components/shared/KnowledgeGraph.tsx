import React from 'react';
import { motion } from 'framer-motion';

interface Node {
  id: string;
  label: string;
  x: number;
  y: number;
  type: 'central' | 'sub' | 'detail';
}

interface Link {
  source: string;
  target: string;
}

const nodes: Node[] = [
  { id: '1', label: 'RGPV AIML 5th Sem', x: 200, y: 150, type: 'central' },
  // Subjects
  { id: '2', label: 'AL-501 Operating Systems', x: 70, y: 90, type: 'sub' },
  { id: '3', label: 'AL-502 DBMS Core', x: 330, y: 90, type: 'sub' },
  { id: '4', label: 'AL-503 Deep Learning', x: 70, y: 220, type: 'sub' },
  { id: '5', label: 'AL-504 NLP & Healthcare', x: 330, y: 220, type: 'sub' },
  // Detail units
  { id: '6', label: 'Deadlocks & Paging', x: 30, y: 35, type: 'detail' },
  { id: '7', label: 'SQL & BCNF Normalization', x: 370, y: 35, type: 'detail' },
  { id: '8', label: 'CNNs, LSTMs & GANs', x: 30, y: 275, type: 'detail' },
  { id: '9', label: 'U-Net & survival estimation', x: 370, y: 275, type: 'detail' },
];

const links: Link[] = [
  { source: '1', target: '2' },
  { source: '1', target: '3' },
  { source: '1', target: '4' },
  { source: '1', target: '5' },
  { source: '2', target: '6' },
  { source: '3', target: '7' },
  { source: '4', target: '8' },
  { source: '5', target: '9' },
];

export const KnowledgeGraph: React.FC = () => {
  return (
    <div className="relative w-full h-[300px] bg-muted/30 rounded-xl overflow-hidden border border-border/50">
      <svg className="w-full h-full" viewBox="0 0 400 300">
        {/* Render Links */}
        {links.map((link, i) => {
          const source = nodes.find(n => n.id === link.source)!;
          const target = nodes.find(n => n.id === link.target)!;
          return (
            <motion.line
              key={`link-${i}`}
              x1={source.x}
              y1={source.y}
              x2={target.x}
              y2={target.y}
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-researcher/30"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1, delay: i * 0.08 }}
            />
          );
        })}

        {/* Render Nodes */}
        {nodes.map((node, i) => (
          <motion.g
            key={node.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', damping: 14, delay: i * 0.05 }}
            whileHover={{ scale: 1.08 }}
            className="cursor-pointer"
          >
            <circle
              cx={node.x}
              cy={node.y}
              r={node.type === 'central' ? 14 : node.type === 'sub' ? 9 : 6}
              className={
                node.type === 'central' ? 'fill-researcher animate-pulse' : 
                node.type === 'sub' ? 'fill-researcher/70' : 'fill-researcher/40'
              }
            />
            <text
              x={node.x}
              y={node.y + (node.type === 'central' ? 22 : 18)}
              textAnchor="middle"
              className={`font-semibold fill-foreground select-none ${
                node.type === 'central' ? 'text-[9px]' : 'text-[8px]'
              }`}
            >
              {node.label}
            </text>
          </motion.g>
        ))}
      </svg>
      
      {/* Legend */}
      <div className="absolute bottom-2 right-2 flex flex-col gap-1 bg-background/60 backdrop-blur-sm p-1.5 rounded border border-border/40 text-[7px] uppercase tracking-wider font-bold">
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-researcher" /> V-Sem Core
        </div>
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-researcher/60" /> Subjects
        </div>
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-researcher/40" /> Units
        </div>
      </div>
    </div>
  );
};
