import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { GraduationCap, BookOpen, FlaskConical, Sparkles, Brain, Mic, Hand, Globe } from "lucide-react";

const roles = [
  {
    id: "student",
    title: "Student",
    description: "Interactive AI tutor with voice, gestures & multilingual support. Upload notes, generate quizzes & flashcards.",
    icon: GraduationCap,
    gradient: "gradient-student",
    textGradient: "text-gradient-student",
    shadow: "panel-shadow-student",
    path: "/student",
    features: ["AI Avatar Tutor", "Voice Q&A", "Quiz Generator", "Flashcards"],
    color: "student",
  },
  {
    id: "teacher",
    title: "Teacher",
    description: "Auto-generate assessments, track student performance & ensure academic integrity with AI-powered tools.",
    icon: BookOpen,
    gradient: "gradient-teacher",
    textGradient: "text-gradient-teacher",
    shadow: "panel-shadow-teacher",
    path: "/teacher",
    features: ["Test Generator", "Analytics Dashboard", "Plagiarism Check", "Difficulty Tagging"],
    color: "teacher",
  },
  {
    id: "researcher",
    title: "Researcher",
    description: "Summarize papers, link citations, visualize knowledge graphs & auto-generate presentations from research.",
    icon: FlaskConical,
    gradient: "gradient-researcher",
    textGradient: "text-gradient-researcher",
    shadow: "panel-shadow-researcher",
    path: "/researcher",
    features: ["Paper Summarizer", "Citation Linker", "Knowledge Graph", "Slide Generator"],
    color: "researcher",
  },
];

const floatingIcons = [
  { icon: Brain, x: "10%", y: "20%", delay: 0 },
  { icon: Mic, x: "85%", y: "15%", delay: 0.5 },
  { icon: Hand, x: "75%", y: "70%", delay: 1 },
  { icon: Globe, x: "15%", y: "75%", delay: 1.5 },
  { icon: Sparkles, x: "50%", y: "10%", delay: 0.3 },
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen gradient-hero relative overflow-hidden">
      {/* Floating background icons */}
      {floatingIcons.map((item, i) => (
        <motion.div
          key={i}
          className="absolute text-primary/10"
          style={{ left: item.x, top: item.y }}
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: item.delay, ease: "easeInOut" }}
        >
          <item.icon size={48} />
        </motion.div>
      ))}

      {/* Hero Section */}
      <div className="relative z-10 container mx-auto px-4 pt-16 pb-8">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Powered by RAG Pipelines & Domain-Specific AI Agents</span>
          </motion.div>

          <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight mb-6">
            <span className="text-foreground">Your AI</span>
            <br />
            <span className="text-gradient-student">Academic</span>{" "}
            <span className="text-gradient-researcher">Assistant</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-4">
            A unified multi-panel platform with intelligent AI agents for Students, Teachers, and Researchers.
            Voice, text & gesture-powered interactions with personalized RAG pipelines.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {["Multimodal Interaction", "RAG Pipelines", "Knowledge Graphs", "Multilingual (EN/Hinglish)"].map((tag, i) => (
              <motion.span
                key={tag}
                className="px-3 py-1.5 rounded-full text-xs font-medium glass-card text-muted-foreground"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Role Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {roles.map((role, i) => (
            <motion.div
              key={role.id}
              className={`group relative glass-card-strong rounded-2xl p-6 cursor-pointer ${role.shadow} hover:scale-[1.03] transition-transform duration-300`}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.15, duration: 0.5 }}
              onClick={() => navigate(role.path)}
            >
              {/* Gradient top bar */}
              <div className={`h-1.5 ${role.gradient} rounded-full mb-5 group-hover:h-2 transition-all`} />

              <div className={`w-14 h-14 rounded-xl ${role.gradient} flex items-center justify-center mb-4`}>
                <role.icon className="w-7 h-7 text-primary-foreground" />
              </div>

              <h3 className={`font-display text-2xl font-bold mb-2 ${role.textGradient}`}>
                {role.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                {role.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {role.features.map((f) => (
                  <span
                    key={f}
                    className={`text-xs px-2.5 py-1 rounded-full bg-${role.color}-light text-${role.color} font-medium`}
                  >
                    {f}
                  </span>
                ))}
              </div>

              <div className={`absolute bottom-4 right-4 w-8 h-8 rounded-full ${role.gradient} flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity`}>
                <span className="text-primary-foreground text-lg">→</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Architecture overview */}
        <motion.div
          className="max-w-4xl mx-auto mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <h2 className="font-display text-2xl font-bold mb-8 text-foreground">System Architecture</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Input Layer", desc: "PDFs, Voice, Gestures", icon: "📥" },
              { label: "RAG Pipeline", desc: "Embeddings + Vector DB", icon: "🔗" },
              { label: "AI Agents", desc: "Domain-Specific LLMs", icon: "🤖" },
              { label: "Output", desc: "Quizzes, Summaries, Graphs", icon: "📊" },
            ].map((step, i) => (
              <motion.div
                key={step.label}
                className="glass-card rounded-xl p-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 + i * 0.1 }}
              >
                <div className="text-3xl mb-2">{step.icon}</div>
                <div className="font-display font-semibold text-sm">{step.label}</div>
                <div className="text-xs text-muted-foreground mt-1">{step.desc}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.footer
          className="text-center mt-16 pb-8 text-xs text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          Multi-Panel AI Assistant Platform • RAG Pipelines • Domain-Specific AI Agents
        </motion.footer>
      </div>
    </div>
  );
};

export default Index;
