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
  { id: '1', label: 'Machine Learning', x: 200, y: 200, type: 'central' },
  { id: '2', label: 'Deep Learning', x: 100, y: 100, type: 'sub' },
  { id: '3', label: 'Neural Networks', x: 300, y: 100, type: 'sub' },
  { id: '4', label: 'NLP', x: 100, y: 300, type: 'sub' },
  { id: '5', label: 'Computer Vision', x: 300, y: 300, type: 'sub' },
  { id: '6', label: 'Transformers', x: 50, y: 50, type: 'detail' },
  { id: '7', label: 'CNNs', x: 350, y: 350, type: 'detail' },
];

const links: Link[] = [
  { source: '1', target: '2' },
  { source: '1', target: '3' },
  { source: '1', target: '4' },
  { source: '1', target: '5' },
  { source: '2', target: '6' },
  { source: '5', target: '7' },
];

export const KnowledgeGraph: React.FC = () => {
  return (
    <div className="relative w-full h-[300px] bg-muted/30 rounded-xl overflow-hidden border border-border/50">
      <svg className="w-full h-full">
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
              strokeWidth="1"
              className="text-researcher/30"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1, delay: i * 0.1 }}
            />
          );
        })}

        {/* Render Nodes */}
        {nodes.map((node, i) => (
          <motion.g
            key={node.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', damping: 12, delay: i * 0.1 }}
            whileHover={{ scale: 1.1 }}
            className="cursor-pointer"
          >
            <circle
              cx={node.x}
              cy={node.y}
              r={node.type === 'central' ? 12 : node.type === 'sub' ? 8 : 5}
              className={
                node.type === 'central' ? 'fill-researcher' : 
                node.type === 'sub' ? 'fill-researcher/60' : 'fill-researcher/30'
              }
            />
            <text
              x={node.x}
              y={node.y + 25}
              textAnchor="middle"
              className="text-[10px] font-medium fill-foreground select-none"
            >
              {node.label}
            </text>
          </motion.g>
        ))}
      </svg>
      
      {/* Legend */}
      <div className="absolute bottom-2 right-2 flex flex-col gap-1 bg-background/50 backdrop-blur-sm p-2 rounded-md text-[8px] uppercase tracking-wider font-bold">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-researcher" /> Main Topic
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-researcher/60" /> Subtopic
        </div>
      </div>
    </div>
  );
};
