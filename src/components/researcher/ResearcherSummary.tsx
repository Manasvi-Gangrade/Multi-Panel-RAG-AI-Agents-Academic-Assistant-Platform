import { useState } from "react";
import { motion } from "framer-motion";
import FileUploadZone from "@/components/FileUploadZone";
import { FileText, Sparkles } from "lucide-react";

const summaries = [
  {
    title: "Transformer Models in NLP",
    authors: "Vaswani et al., 2017",
    summary: "This paper introduces the Transformer architecture, replacing recurrence with self-attention mechanisms. Multi-head attention allows the model to attend to different positions simultaneously. Results demonstrate significant improvements over RNN-based models in machine translation, achieving new state-of-the-art BLEU scores on WMT benchmarks.",
    keyFindings: ["Self-attention outperforms RNN by 2.3x", "Parallelizable training reduces compute time", "Multi-head attention captures diverse relationships"],
  },
  {
    title: "BERT: Pre-training of Deep Bidirectional Transformers",
    authors: "Devlin et al., 2019",
    summary: "BERT introduces bidirectional pre-training using masked language modeling and next sentence prediction. Fine-tuning on downstream tasks achieves state-of-the-art across 11 NLP benchmarks. The model demonstrates that pre-training on large unlabeled corpora enables effective transfer learning.",
    keyFindings: ["Bidirectional context improves understanding", "Masked LM pretext task enables deep representations", "Fine-tuning generalizes across diverse tasks"],
  },
];

const ResearcherSummary = () => {
  const [generated, setGenerated] = useState(false);

  return (
    <div className="p-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-2xl font-bold text-foreground mb-1">Paper Summarizer</h1>
        <p className="text-sm text-muted-foreground">Upload research papers for AI-generated summaries, key findings, and synopses.</p>
      </motion.div>

      <FileUploadZone role="researcher" title="Upload Research Papers" />

      {!generated && (
        <button onClick={() => setGenerated(true)} className="px-6 py-3 rounded-xl gradient-researcher text-primary-foreground font-semibold flex items-center gap-2 hover:opacity-90">
          <Sparkles className="w-4 h-4" /> Generate Summaries
        </button>
      )}

      {generated && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          {summaries.map((paper, i) => (
            <motion.div key={i} className="glass-card-strong rounded-xl p-5 panel-shadow-researcher" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-researcher-light flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-researcher" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm">{paper.title}</h3>
                  <p className="text-xs text-muted-foreground">{paper.authors}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">{paper.summary}</p>
              <div>
                <p className="text-xs font-semibold mb-1.5">Key Findings:</p>
                <ul className="space-y-1">
                  {paper.keyFindings.map((f, j) => (
                    <li key={j} className="text-xs text-muted-foreground flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-researcher mt-1.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default ResearcherSummary;
