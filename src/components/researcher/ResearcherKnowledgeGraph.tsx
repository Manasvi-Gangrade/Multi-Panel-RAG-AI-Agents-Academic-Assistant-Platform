import { motion } from "framer-motion";
import { Network } from "lucide-react";

const nodes = [
  { id: 1, label: "Transformer", x: 50, y: 30, size: 44, color: "hsl(263 70% 58%)" },
  { id: 2, label: "Self-Attention", x: 25, y: 55, size: 36, color: "hsl(263 70% 68%)" },
  { id: 3, label: "BERT", x: 75, y: 50, size: 38, color: "hsl(280 80% 60%)" },
  { id: 4, label: "GPT", x: 70, y: 20, size: 36, color: "hsl(280 80% 55%)" },
  { id: 5, label: "Transfer\nLearning", x: 50, y: 70, size: 32, color: "hsl(263 70% 72%)" },
  { id: 6, label: "Embeddings", x: 15, y: 30, size: 30, color: "hsl(200 95% 55%)" },
  { id: 7, label: "Pre-training", x: 85, y: 75, size: 30, color: "hsl(263 70% 65%)" },
  { id: 8, label: "Fine-tuning", x: 35, y: 85, size: 28, color: "hsl(280 80% 65%)" },
  { id: 9, label: "Multi-head\nAttention", x: 10, y: 70, size: 28, color: "hsl(200 95% 60%)" },
  { id: 10, label: "Tokenization", x: 90, y: 40, size: 26, color: "hsl(200 95% 50%)" },
];

const edges = [
  [1, 2], [1, 3], [1, 4], [2, 9], [3, 5], [3, 7], [4, 7],
  [5, 8], [6, 1], [6, 2], [7, 8], [10, 3], [10, 4], [9, 6],
];

const ResearcherKnowledgeGraph = () => (
  <div className="p-6 space-y-6">
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <h1 className="font-display text-2xl font-bold text-foreground mb-1">Knowledge Graph</h1>
      <p className="text-sm text-muted-foreground">AI-generated visualization of concept relationships across your research papers.</p>
    </motion.div>

    <motion.div
      className="glass-card-strong rounded-2xl p-4 panel-shadow-researcher relative overflow-hidden"
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex items-center gap-2 mb-4">
        <Network className="w-4 h-4 text-researcher" />
        <span className="text-sm font-semibold">Concept Map — NLP & Transformers</span>
        <span className="text-xs text-muted-foreground ml-auto">{nodes.length} concepts • {edges.length} relationships</span>
      </div>

      <svg viewBox="0 0 100 100" className="w-full" style={{ maxHeight: "450px" }}>
        {/* Edges */}
        {edges.map(([from, to], i) => {
          const a = nodes.find(n => n.id === from)!;
          const b = nodes.find(n => n.id === to)!;
          return (
            <motion.line
              key={`e-${i}`}
              x1={a.x} y1={a.y} x2={b.x} y2={b.y}
              stroke="hsl(263 70% 80%)"
              strokeWidth="0.3"
              strokeDasharray="1 0.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.6 }}
              transition={{ delay: 0.5 + i * 0.05, duration: 0.5 }}
            />
          );
        })}

        {/* Nodes */}
        {nodes.map((node, i) => (
          <motion.g
            key={node.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + i * 0.06, type: "spring" }}
          >
            <circle
              cx={node.x} cy={node.y}
              r={node.size / 10}
              fill={node.color}
              opacity="0.15"
            />
            <circle
              cx={node.x} cy={node.y}
              r={node.size / 14}
              fill={node.color}
              opacity="0.9"
            />
            <text
              x={node.x} y={node.y}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize="2.2"
              fill="white"
              fontWeight="600"
              fontFamily="Space Grotesk, sans-serif"
            >
              {node.label.split("\n").map((line, li) => (
                <tspan key={li} x={node.x} dy={li === 0 ? (node.label.includes("\n") ? "-1.2" : "0") : "2.8"}>
                  {line}
                </tspan>
              ))}
            </text>
          </motion.g>
        ))}
      </svg>
    </motion.div>

    {/* Legend */}
    <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
      {nodes.slice(0, 5).map(n => (
        <div key={n.id} className="flex items-center gap-2 text-xs">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: n.color }} />
          <span className="text-muted-foreground">{n.label.replace("\n", " ")}</span>
        </div>
      ))}
    </div>
  </div>
);

export default ResearcherKnowledgeGraph;
