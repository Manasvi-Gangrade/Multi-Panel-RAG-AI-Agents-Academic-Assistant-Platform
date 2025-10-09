import { motion } from "framer-motion";
import { Link2, ExternalLink } from "lucide-react";

const citations = [
  { title: "Attention Is All You Need", authors: "Vaswani et al.", year: 2017, citations: 95000, relevance: 98, doi: "10.48550/arXiv.1706.03762" },
  { title: "BERT: Pre-training of Deep Bidirectional Transformers", authors: "Devlin et al.", year: 2019, citations: 72000, relevance: 95, doi: "10.18653/v1/N19-1423" },
  { title: "GPT-3: Language Models are Few-Shot Learners", authors: "Brown et al.", year: 2020, citations: 25000, relevance: 88, doi: "10.48550/arXiv.2005.14165" },
  { title: "ResNet: Deep Residual Learning", authors: "He et al.", year: 2016, citations: 150000, relevance: 72, doi: "10.1109/CVPR.2016.90" },
  { title: "Generative Adversarial Networks", authors: "Goodfellow et al.", year: 2014, citations: 65000, relevance: 65, doi: "10.48550/arXiv.1406.2661" },
  { title: "Adam: A Method for Stochastic Optimization", authors: "Kingma & Ba", year: 2015, citations: 140000, relevance: 60, doi: "10.48550/arXiv.1412.6980" },
];

const ResearcherCitations = () => (
  <div className="p-6 space-y-6">
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <h1 className="font-display text-2xl font-bold text-foreground mb-1">Citation Linker</h1>
      <p className="text-sm text-muted-foreground">Discover related papers, build citation chains, and explore academic connections.</p>
    </motion.div>

    <div className="space-y-3">
      {citations.map((c, i) => (
        <motion.div
          key={i}
          className="glass-card rounded-xl p-4 hover:shadow-md transition-shadow"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.06 }}
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-researcher-light flex items-center justify-center shrink-0">
              <Link2 className="w-5 h-5 text-researcher" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold truncate">{c.title}</h3>
              <p className="text-xs text-muted-foreground">{c.authors} • {c.year}</p>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-xs text-muted-foreground">{c.citations.toLocaleString()} citations</span>
                <div className="flex items-center gap-1.5">
                  <div className="w-16 h-1.5 rounded-full bg-secondary overflow-hidden">
                    <div className="h-full rounded-full bg-researcher" style={{ width: `${c.relevance}%` }} />
                  </div>
                  <span className="text-xs text-researcher font-medium">{c.relevance}%</span>
                </div>
              </div>
            </div>
            <a href={`https://doi.org/${c.doi}`} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg hover:bg-secondary">
              <ExternalLink className="w-4 h-4 text-muted-foreground" />
            </a>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

export default ResearcherCitations;
