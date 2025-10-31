import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Users,
  FlaskConical,
  Brain,
  Upload,
  MessageSquare,
  FileText,
  Sparkles,
  ArrowRight,
  CheckCircle,
  Zap,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const roles = [
  {
    id: "student",
    title: "Student Panel",
    description: "AI-powered learning assistant for smart revision, quiz generation, and knowledge management",
    icon: GraduationCap,
    features: [
      "Upload PDFs, notes & textbooks",
      "AI Q&A from your documents",
      "Auto-generate summaries & quizzes",
      "Smart flashcard creation",
      "Voice-enabled study assistant",
    ],
    href: "/student",
    gradient: "from-student via-emerald-500 to-teal-400",
  },
  {
    id: "teacher",
    title: "Teacher Panel",
    description: "Automated assessment creation, evaluation tools, and student performance analytics",
    icon: Users,
    features: [
      "Generate question papers",
      "Create MCQs & assignments",
      "AI difficulty level tagging",
      "Plagiarism detection",
      "Performance analytics",
    ],
    href: "/teacher",
    gradient: "from-teacher via-indigo-500 to-blue-400",
  },
  {
    id: "researcher",
    title: "Researcher Panel",
    description: "Research assistant for paper analysis, citation management, and knowledge visualization",
    icon: FlaskConical,
    features: [
      "Paper summarization",
      "Citation extraction & formatting",
      "Related paper recommendations",
      "Knowledge graph generation",
      "Convert to presentations",
    ],
    href: "/researcher",
    gradient: "from-researcher via-fuchsia-500 to-rose-400",
  },
];

const features = [
  {
    icon: Brain,
    title: "RAG-Powered AI",
    description: "Retrieval-Augmented Generation for accurate, context-aware responses from your documents",
  },
  {
    icon: Upload,
    title: "Multimodal Input",
    description: "Support for PDFs, documents, voice input, and gesture-based navigation",
  },
  {
    icon: MessageSquare,
    title: "Smart Conversations",
    description: "Natural language interaction in English and Hinglish with your AI assistant",
  },
  {
    icon: FileText,
    title: "Auto Generation",
    description: "Automatically create summaries, quizzes, flashcards, and question papers",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Get instant responses and generate content in seconds with optimized AI",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your documents and data are encrypted and never shared with third parties",
  },
];

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
    {/* Hero Section */}
    <section className="relative overflow-hidden">
      {/* Clean engineering dot-grid background & Pastel Glows */}
      <div className="absolute inset-0 bg-gradient-to-br from-student/3 via-teacher/3 to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(rgba(0,0,0,0.06)_1.2px,transparent_1.2px)] [background-size:24px_24px] opacity-70" />
      
      {/* Animated premium light pastel glow blobs - Green, Blue & Pink */}
      <div className="absolute top-[-10%] left-1/4 w-96 h-96 bg-student/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-[-10%] right-1/4 w-80 h-80 bg-researcher/8 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "1.5s" }} />

      <div className="container relative z-10 pt-16 pb-10 md:pt-20 md:pb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl text-center"
        >
          <h1 className="mb-4 font-display text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
            <span className="bg-gradient-to-r from-student via-teacher to-researcher bg-clip-text text-transparent">
              Unified Academic
            </span>
            <br />
            <span className="text-foreground">Intelligence Platform</span>
          </h1>

          <p className="mx-auto mb-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
            Transform your academic journey with AI-powered learning, teaching, and research tools.
            One platform for students, teachers, and researchers.
          </p>

          {/* Interactive Portal Dock */}
          <div className="mt-8 flex flex-col items-center">
            <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase mb-3">
              Select a Portal to Enter
            </p>
            <div className="glass-card flex items-center justify-center gap-6 px-8 py-4 rounded-3xl bg-background/40 border border-primary/10 shadow-glow/10 backdrop-blur-md">
              {roles.map((role, i) => {
                const Icon = role.icon;
                return (
                  <motion.div
                    key={role.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.15 }}
                    className="relative group"
                  >
                    <Link to={role.href} className="flex flex-col items-center">
                      <div className={cn(
                        "flex h-16 w-16 items-center justify-center rounded-2xl p-[2px] transition-all duration-300",
                        role.id === "student" ? "bg-gradient-to-br from-student to-emerald-400 hover:shadow-student-glow hover:scale-110" :
                        role.id === "teacher" ? "bg-gradient-to-br from-teacher to-blue-400 hover:shadow-teacher-glow hover:scale-110" :
                        "bg-gradient-to-br from-researcher to-fuchsia-400 hover:shadow-researcher-glow hover:scale-110"
                      )}>
                        <div className="flex h-full w-full items-center justify-center rounded-2xl bg-background/90 backdrop-blur">
                          <Icon className="h-7 w-7 text-foreground transition-transform group-hover:rotate-6" />
                        </div>
                      </div>
                      <span className="mt-2 text-xs font-semibold text-muted-foreground group-hover:text-foreground transition-colors">
                        {role.title.split(" ")[0]}
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>

      {/* Metrics Section */}
      <section className="relative -mt-4 mb-8">
        <div className="container max-w-5xl">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              {
                title: "Contextual Accuracy",
                value: "99.4%",
                desc: "RAG-driven document processing",
                icon: Brain,
                color: "text-student bg-student/10",
              },
              {
                title: "Response Latency",
                value: "< 1.5s",
                desc: "Real-time query answers",
                icon: Zap,
                color: "text-teacher bg-teacher/10",
              },
              {
                title: "Multimodal Support",
                value: "100%",
                desc: "PDFs, notes, voice & graphs",
                icon: FileText,
                color: "text-researcher bg-researcher/10",
              },
            ].map((stat, i) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card flex items-center gap-4 p-5 rounded-2xl border border-primary/5 hover:border-primary/20 transition-all hover:shadow-md"
              >
                <div className={cn("p-3 rounded-xl", stat.color)}>
                  <stat.icon className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xl font-bold font-display">{stat.value}</h4>
                  <p className="text-xs font-semibold text-foreground">{stat.title}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{stat.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Role Selection */}
      <section className="py-14 md:py-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto mb-10 max-w-2xl text-center"
          >
            <h2 className="mb-3 font-display text-3xl font-bold md:text-4xl">
              Choose Your Role
            </h2>
            <p className="text-muted-foreground">
              Select your academic role to access personalized AI-powered tools and features
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {roles.map((role, i) => (
              <motion.div
                key={role.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link to={role.href}>
                  <Card className={cn(
                    "group h-full cursor-pointer transition-all duration-500 hover:-translate-y-2 border-2 bg-white/70 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.03)]",
                    role.id === "student" ? "hover:border-student hover:shadow-[0_15px_30px_rgba(16,185,129,0.15)]" :
                    role.id === "teacher" ? "hover:border-teacher hover:shadow-[0_15px_30px_rgba(59,130,246,0.15)]" :
                    "hover:border-researcher hover:shadow-[0_15px_30px_rgba(244,63,94,0.15)]"
                  )}>
                    <CardHeader>
                      <div className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${role.gradient}`}>
                        <role.icon className="h-7 w-7 text-white" />
                      </div>
                      <CardTitle className="text-xl">{role.title}</CardTitle>
                      <CardDescription>{role.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {role.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-primary" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Button className={`mt-6 w-full bg-gradient-to-r ${role.gradient} text-white hover:opacity-90`}>
                        Enter {role.title.split(" ")[0]} Panel
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="border-t border-border bg-gradient-to-b from-muted/30 to-background py-14 md:py-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto mb-10 max-w-2xl text-center"
          >
            <h2 className="mb-3 font-display text-3xl font-bold md:text-4xl">
              Powered by Advanced AI
            </h2>
            <p className="text-muted-foreground">
              Cutting-edge technology to revolutionize academic workflows
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full p-6 hover:shadow-lg transition-shadow border hover:border-primary/20">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/20">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 font-display font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Preview Sandbox */}
      <section className="border-t border-border bg-gradient-to-b from-background to-muted/20 py-16 md:py-20 overflow-hidden">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto mb-12 max-w-2xl text-center"
          >
            <h2 className="mb-3 font-display text-3xl font-bold md:text-4xl">
              Academic AI in Action
            </h2>
            <p className="text-muted-foreground">
              Experience the power of real-time academic analysis, Hinglish chat, and automated study aides
            </p>
          </motion.div>

          <div className="mx-auto max-w-5xl">
            <div className="grid gap-8 md:grid-cols-12 items-center">
              {/* Left Side: Mock Chat Workspace */}
              <div className="md:col-span-7">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="glass-card rounded-2xl border border-primary/15 overflow-hidden shadow-xl"
                >
                  {/* Workspace Header */}
                  <div className="flex items-center justify-between bg-muted/50 px-4 py-3 border-b border-border">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1.5">
                        <span className="w-3 h-3 rounded-full bg-red-400" />
                        <span className="w-3 h-3 rounded-full bg-yellow-400" />
                        <span className="w-3 h-3 rounded-full bg-green-400" />
                      </div>
                      <span className="text-xs font-semibold text-muted-foreground ml-2">Academic AI Workspace v1.2</span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-500 uppercase bg-amber-500/10 px-2 py-0.5 rounded-full">
                      ● Active Session
                    </span>
                  </div>

                  {/* Workspace Content */}
                  <div className="p-5 space-y-4 font-sans text-sm min-h-[300px] flex flex-col justify-between">
                    <div className="space-y-4">
                      {/* Message 1 */}
                      <div className="flex items-start gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <Users className="h-4 w-4" />
                        </div>
                        <div className="bg-muted px-4 py-2.5 rounded-2xl rounded-tl-none max-w-[85%]">
                          <p className="text-xs font-bold text-foreground">Manasvi (Student)</p>
                          <p className="text-muted-foreground mt-0.5">
                            Hey, can you help me revise this paper on neural network architectures and make a Hinglish summary of its methodology?
                          </p>
                        </div>
                      </div>

                      {/* Message 2 */}
                      <div className="flex items-start gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 text-white">
                          <Brain className="h-4 w-4" />
                        </div>
                        <div className="bg-primary/5 border border-primary/10 px-4 py-2.5 rounded-2xl rounded-tl-none max-w-[85%]">
                          <p className="text-xs font-bold text-amber-600 flex items-center gap-1">
                            <Sparkles className="h-3 w-3 animate-pulse" />
                            Academic AI Assistant
                          </p>
                          <p className="text-foreground mt-1">
                            Absolutely! Document ingest complete. Summary ready:
                          </p>
                          <div className="mt-2 pl-3 border-l-2 border-primary/30 space-y-1 text-xs text-muted-foreground">
                            <p>● <strong className="text-foreground">Core Arch:</strong> 12-layer attention block with custom residual gates.</p>
                            <p>● <strong className="text-foreground">Methodology (Hinglish):</strong> Dataset ko normalize karke residual connections use kiya hai taaki deep layers mein gradient vanish na ho.</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Chat Input Bar */}
                    <div className="flex items-center gap-2 mt-4 pt-3 border-t border-border/50">
                      <div className="flex-1 bg-muted px-4 py-2 rounded-xl text-xs text-muted-foreground flex justify-between items-center">
                        <span>Ask anything about your document...</span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] bg-background border px-1.5 py-0.5 rounded text-foreground font-mono">⌘K</span>
                        </div>
                      </div>
                      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white cursor-pointer hover:opacity-90">
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Right Side: Visual Sandbox Cards */}
              <div className="md:col-span-5 space-y-4">
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="space-y-4"
                >
                  <h3 className="text-2xl font-bold font-display text-foreground tracking-tight">
                    Smart Deliverables
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Our AI automatically constructs secondary study resources, saving you hundreds of hours.
                  </p>

                  {[
                    {
                      title: "Revision Flashcards",
                      value: "15 Cards Generated",
                      desc: "Instant revision for definitions & formulas",
                      percent: 100,
                      color: "from-student to-emerald-400",
                    },
                    {
                      title: "Evaluation Quizzes",
                      value: "10 MCQ Questions Ready",
                      desc: "AI difficulty tagging (Easy, Medium, Hard)",
                      percent: 100,
                      color: "from-teacher to-indigo-400",
                    },
                    {
                      title: "Citation & Graphs",
                      value: "APA/IEEE formatted map",
                      desc: "Linked interactive knowledge node map",
                      percent: 100,
                      color: "from-researcher to-fuchsia-400",
                    },
                  ].map((card, idx) => (
                    <div key={card.title} className="glass-card p-4 rounded-xl border border-border/80 hover:border-primary/20 transition-all">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="text-sm font-bold text-foreground">{card.title}</h4>
                          <p className="text-[11px] text-muted-foreground mt-0.5">{card.desc}</p>
                        </div>
                        <span className="text-xs font-bold text-foreground bg-muted px-2 py-0.5 rounded">
                          {card.value}
                        </span>
                      </div>
                      <div className="w-full bg-muted h-1.5 rounded-full overflow-hidden">
                        <div className={`bg-gradient-to-r ${card.color} h-full w-[100%]`} />
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-14 md:py-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-student via-teacher to-researcher p-10 text-center text-white md:p-14"
          >
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-40 h-40 bg-white/15 rounded-full blur-2xl animate-pulse-slow" />
            <div className="absolute bottom-0 right-0 w-60 h-60 bg-white/15 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "2s" }} />
            
            <div className="relative z-10">
              <h2 className="mb-4 font-display text-3xl font-bold md:text-4xl">
                Ready to Transform Your Academic Journey?
              </h2>
              <p className="mx-auto mb-8 max-w-xl opacity-95 text-white/90">
                Join thousands of students, teachers, and researchers using AI to achieve more.
              </p>
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-lg font-bold" asChild>
                <Link to="/student">
                  Start Free Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="border-t border-border py-8">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© 2026 Academic AI Platform. Built with intelligence.</p>
        </div>
      </footer>
    </div>
  );
}