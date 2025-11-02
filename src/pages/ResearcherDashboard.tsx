import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FlaskConical, 
  FileText, 
  Quote, 
  Network, 
  Presentation, 
  Search, 
  TrendingUp, 
  BookOpen,
  Sparkles,
  Printer,
  ChevronRight,
  GraduationCap,
  Code,
  BookOpenCheck
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/shared/StatCard";
import { AIChatInterface } from "@/components/shared/AIChatInterface";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { KnowledgeGraph } from "@/components/shared/KnowledgeGraph";
import { RGPVSyllabus, SyllabusSubject } from "@/lib/syllabus";

export default function ResearcherDashboard() {
  const location = useLocation();
  // Filter electives for research (AL-503A, AL-503B, AL-503C, AL-504A, AL-504B, AL-504C)
  const electives = RGPVSyllabus.filter(s => s.code !== "AL-501" && s.code !== "AL-502");
  
  const [selectedSubjectCode, setSelectedSubjectCode] = useState<string>("AL-503(B)");
  const [activeUnitNum, setActiveUnitNum] = useState<number>(1);
  const [labFileMode, setLabFileMode] = useState<boolean>(false);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  // Sync internal modes with route paths
  useEffect(() => {
    const path = location.pathname;
    if (path.endsWith("/graph") || path.endsWith("/slides") || path.endsWith("/citations") || path.endsWith("/summaries")) {
      setLabFileMode(true);
    } else {
      setLabFileMode(false);
    }
  }, [location.pathname]);

  const activeSubject = RGPVSyllabus.find(s => s.code === selectedSubjectCode) || electives[1]; // default to Deep Learning
  const activeUnit = activeSubject.units.find(u => u.number === activeUnitNum) || activeSubject.units[0];

  const handleSubjectChange = (code: string) => {
    setSelectedSubjectCode(code);
    setActiveUnitNum(1);
    setLabFileMode(false);
  };

  // Generate highly detailed PyTorch / Python code for RGPV Lab File Experiments based on Unit
  const getExperimentDetails = () => {
    let title = "";
    let codeBlock = "";
    let mathTheory = "";

    if (selectedSubjectCode.includes("503(B)")) { // Deep Learning
      if (activeUnitNum === 1) {
        title = "Implementation of Multilayer Perceptron (MLP) with Backpropagation from Scratch";
        mathTheory = "A Multilayer Perceptron maps inputs to outputs using weighted sums passed through non-linear activations: a = f(W*x + b). Backpropagation calculates the gradient of the loss function E with respect to weights using the Chain Rule: dE/dW = (dE/da) * (da/dz) * (dz/dW). Weights are updated using Gradient Descent: W = W - lr * dE/dW.";
        codeBlock = `import numpy as np

class MLP:
    def __init__(self, input_dim, hidden_dim, output_dim):
        self.W1 = np.random.randn(input_dim, hidden_dim) * 0.01
        self.b1 = np.zeros((1, hidden_dim))
        self.W2 = np.random.randn(hidden_dim, output_dim) * 0.01
        self.b2 = np.zeros((1, output_dim))
        
    def sigmoid(self, x):
        return 1 / (1 + np.exp(-x))
        
    def sigmoid_derivative(self, x):
        return x * (1 - x)
        
    def forward(self, X):
        self.z1 = np.dot(X, self.W1) + self.b1
        self.a1 = self.sigmoid(self.z1)
        self.z2 = np.dot(self.a1, self.W2) + self.b2
        self.a2 = self.sigmoid(self.z2)
        return self.a2
        
    def backward(self, X, y, output, lr=0.1):
        error = y - output
        d_output = error * self.sigmoid_derivative(output)
        
        error_hidden = d_output.dot(self.W2.T)
        d_hidden = error_hidden * self.sigmoid_derivative(self.a1)
        
        # Update weights and biases
        self.W2 += self.a1.T.dot(d_output) * lr
        self.b2 += np.sum(d_output, axis=0, keepdims=True) * lr
        self.W1 += X.T.dot(d_hidden) * lr
        self.b1 += np.sum(d_hidden, axis=0, keepdims=True) * lr`;
      } else if (activeUnitNum === 2) {
        title = "Autoencoder Construction with Reconstructed Loss Minimization";
        mathTheory = "Autoencoders represent a self-supervised coding process containing an Encoder f(x) mapping input to a bottleneck latent vector z, and a Decoder g(z) reconstructing inputs: x_hat = g(f(x)). It minimizes the Mean Squared Error (MSE) loss: L = 1/N * Sum( ||x - x_hat||^2 ).";
        codeBlock = `import torch
import torch.nn as nn

class Autoencoder(nn.Module):
    def __init__(self, input_dim=784, latent_dim=32):
        super(Autoencoder, self).__init__()
        # Encoder Network
        self.encoder = nn.Sequential(
            nn.Linear(input_dim, 128),
            nn.ReLU(),
            nn.Linear(128, latent_dim),
            nn.ReLU()
        )
        # Decoder Network
        self.decoder = nn.Sequential(
            nn.Linear(latent_dim, 128),
            nn.ReLU(),
            nn.Linear(128, input_dim),
            nn.Sigmoid() # Scale output between [0, 1]
        )
        
    def forward(self, x):
        latent = self.encoder(x)
        reconstruction = self.decoder(latent)
        return reconstruction`;
      } else {
        title = "Residual Convolutional Network block mapping (ResNet identity)";
        mathTheory = "ResNet utilizes identity shortcuts mapping outputs of previous blocks straight to deeper layers: H(x) = F(x) + x. During backward passes, gradients flow directly through shortcut connections with zero attenuation, preventing the vanishing gradient problem.";
        codeBlock = `import torch
import torch.nn as nn

class ResidualBlock(nn.Module):
    def __init__(self, in_channels, out_channels, stride=1):
        super(ResidualBlock, self).__init__()
        self.conv1 = nn.Conv2d(in_channels, out_channels, kernel_size=3, stride=stride, padding=1, bias=False)
        self.bn1 = nn.BatchNorm2d(out_channels)
        self.relu = nn.ReLU()
        self.conv2 = nn.Conv2d(out_channels, out_channels, kernel_size=3, stride=1, padding=1, bias=False)
        self.bn2 = nn.BatchNorm2d(out_channels)
        
        self.shortcut = nn.Sequential()
        if stride != 1 or in_channels != out_channels:
            self.shortcut = nn.Sequential(
                nn.Conv2d(in_channels, out_channels, kernel_size=1, stride=stride, bias=False),
                nn.BatchNorm2d(out_channels)
            )
            
    def forward(self, x):
        out = self.relu(self.bn1(self.conv1(x)))
        out = self.bn2(self.conv2(out))
        out += self.shortcut(x) # Residual Addition
        out = self.relu(out)
        return out`;
      }
    } else if (selectedSubjectCode.includes("504(A)")) { // AI in Healthcare
      title = "Medical Image Segmentation utilizing 2D U-Net Architecture";
      mathTheory = "U-Net uses a contraction path to extract contextual features and a symmetrical expansion path to stitch high-resolution details using skip-connections. The overlap index is measured using Dice Coefficient: Dice = 2*|A ∩ B| / (|A| + |B|).";
      codeBlock = `import torch
import torch.nn as nn

class UNet2D(nn.Module):
    def __init__(self, in_channels=1, out_channels=1):
        super(UNet2D, self).__init__()
        
        def double_conv(in_c, out_c):
            return nn.Sequential(
                nn.Conv2d(in_c, out_c, kernel_size=3, padding=1),
                nn.BatchNorm2d(out_c),
                nn.ReLU(),
                nn.Conv2d(out_c, out_c, kernel_size=3, padding=1),
                nn.BatchNorm2d(out_c),
                nn.ReLU()
            )
            
        self.enc1 = double_conv(in_channels, 64)
        self.pool = nn.MaxPool2d(2)
        
        self.bottleneck = double_conv(64, 128)
        
        self.upconv = nn.ConvTranspose2d(128, 64, kernel_size=2, stride=2)
        self.dec1 = double_conv(128, 64) # Concatenation doubles channels
        
        self.final_conv = nn.Conv2d(64, out_channels, kernel_size=1)
        
    def forward(self, x):
        x1 = self.enc1(x)
        x_pool = self.pool(x1)
        
        bn = self.bottleneck(x_pool)
        
        up = self.upconv(bn)
        # Skip connection concatenation
        merge = torch.cat([up, x1], dim=1)
        
        out = self.dec1(merge)
        return self.final_conv(out)`;
    } else if (selectedSubjectCode.includes("504(B)")) { // NLP
      title = "Implementation of dynamic Viterbi Parser for Hidden Markov Model (HMM) Part-of-Speech Tagging";
      mathTheory = "POS tagging seeks the tag sequence T that maximizes the joint probability: P(W,T) = Product( P(w_i|t_i) * P(t_i|t_{i-1}) ). The Viterbi algorithm employs dynamic programming to find the optimal path through the tag trellis.";
      codeBlock = `import numpy as np

def viterbi(words, tags, start_p, trans_p, emit_p):
    """
    words: list of observed word indices
    tags: list of POS tags
    """
    N = len(tags)
    T = len(words)
    
    viterbi_mat = np.zeros((N, T))
    backpointer = np.zeros((N, T), dtype=int)
    
    # Initialization Step
    for s in range(N):
        viterbi_mat[s, 0] = start_p[s] * emit_p[s, words[0]]
        backpointer[s, 0] = 0
        
    # Recursion Step
    for t in range(1, T):
        for s in range(N):
            prob = viterbi_mat[:, t-1] * trans_p[:, s] * emit_p[s, words[t]]
            viterbi_mat[s, t] = np.max(prob)
            backpointer[s, t] = np.argmax(prob)
            
    # Termination and path backtracking
    best_last_state = np.argmax(viterbi_mat[:, T-1])
    best_path = [best_last_state]
    
    for t in range(T-1, 0, -1):
        best_last_state = backpointer[best_last_state, t]
        best_path.insert(0, best_last_state)
        
    return [tags[idx] for idx in best_path]`;
    } else { // AL-504(C) Computational Intelligence
      title = "Formulation of Genetic Algorithm (GA) Crossover and Mutation Cycles for Optimal Pathing";
      mathTheory = "A GA optimizes solutions using evolutionary cycles: selection of parents based on fitness, crossover swapping genetic materials (e.g. single point crossover), and mutation altering elements at low probability to avoid local minima.";
      codeBlock = `import numpy as np

class GeneticAlgorithm:
    def __init__(self, pop_size=50, gene_len=10, mutation_rate=0.01):
        self.pop_size = pop_size
        self.gene_len = gene_len
        self.mutation_rate = mutation_rate
        self.population = np.random.randint(0, 2, size=(pop_size, gene_len))
        
    def crossover(self, parent1, parent2):
        # Single-point crossover
        point = np.random.randint(1, self.gene_len - 1)
        child1 = np.concatenate([parent1[:point], parent2[point:]])
        child2 = np.concatenate([parent2[:point], parent1[point:]])
        return child1, child2
        
    def mutate(self, individual):
        for idx in range(self.gene_len):
            if np.random.rand() < self.mutation_rate:
                individual[idx] = 1 - individual[idx] # Flip bit
        return individual`;
    }

    return {
      title,
      mathTheory,
      codeBlock
    };
  };

  const expData = getExperimentDetails();

  const handleCopyCode = () => {
    navigator.clipboard.writeText(expData.codeBlock);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <DashboardLayout role="researcher">
      <div className="space-y-8 pb-10">
        
        {/* Header Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl border border-researcher/20 bg-gradient-to-r from-researcher/10 via-rose-500/5 to-transparent p-6 md:p-8"
        >
          <div className="absolute right-0 top-0 -mr-16 -mt-16 h-48 w-48 rounded-full bg-researcher/10 blur-3xl" />
          <div className="relative z-10 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="border-researcher/30 bg-researcher/10 text-researcher font-semibold">
                RGPV V-Sem Innovation Desk
              </Badge>
              <Badge variant="outline" className="border-border bg-card text-muted-foreground text-xs">
                Electives Research & Lab Experiments
              </Badge>
            </div>
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="font-display text-3xl font-extrabold tracking-tight md:text-4xl text-foreground">
                  AIML Research Workspace 🔬
                </h1>
                <p className="mt-2 max-w-2xl text-sm md:text-base text-muted-foreground leading-relaxed">
                  Analyze advanced machine learning frameworks, generate fully structured sessional laboratory experiments, and trace core dependencies via our integrated syllabus knowledge mapping.
                </p>
              </div>
              <Button 
                variant="researcher" 
                size="lg" 
                className="shadow-lg shadow-researcher/20 self-start md:self-center"
                onClick={() => setLabFileMode(true)}
              >
                <Code className="mr-2 h-4 w-4" />
                Generate RGPV Lab File
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Dynamic Elective Selectors */}
        <div className="space-y-3">
          <h2 className="font-display text-lg font-bold tracking-tight flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-researcher" />
            Select Advanced AIML Elective:
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {electives.map((subject) => {
              const isActive = subject.code === selectedSubjectCode;
              return (
                <div
                  key={subject.code}
                  onClick={() => handleSubjectChange(subject.code)}
                  className={`flex flex-col justify-between rounded-2xl border p-4 cursor-pointer transition-all duration-300 ${
                    isActive 
                      ? "border-researcher bg-researcher/10 ring-1 ring-researcher shadow-md shadow-researcher/5" 
                      : "border-border bg-card hover:bg-researcher/10 hover:border-researcher/30"
                  }`}
                >
                  <div className="space-y-1">
                    <span className={`text-[10px] font-bold tracking-wider uppercase ${isActive ? "text-researcher" : "text-muted-foreground"}`}>
                      {subject.code}
                    </span>
                    <h3 className="font-display text-xs font-semibold leading-tight line-clamp-2">
                      {subject.name}
                    </h3>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <Badge variant="outline" className="text-[9px] px-1 py-0 border-researcher/20 text-researcher">
                      {subject.category.split(" ")[0]}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Workspace core */}
        <div className="grid gap-6 lg:grid-cols-12">
          
          {/* LEFT PANEL: Syllabus units & Knowledge map (Take 5 columns) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Subject Specifications */}
            <Card variant="elevated">
              <CardHeader className="bg-researcher/5 pb-4">
                <div className="flex items-center justify-between">
                  <Badge variant="researcher">{activeSubject.code}</Badge>
                  <span className="text-xs text-muted-foreground font-semibold">Unit Selector (1 to 5)</span>
                </div>
                <CardTitle className="font-display text-base font-bold mt-2">
                  {activeSubject.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4 space-y-4">
                
                {/* Unit Navigation pills */}
                <div className="grid grid-cols-5 gap-2">
                  {activeSubject.units.map(u => {
                    const isActive = u.number === activeUnitNum;
                    return (
                      <button
                        key={u.number}
                        onClick={() => { setActiveUnitNum(u.number); setLabFileMode(false); }}
                        className={`flex h-9 w-full items-center justify-center rounded-lg border font-bold text-xs transition-all ${
                          isActive 
                            ? "bg-researcher text-primary-foreground border-researcher ring-1 ring-researcher" 
                            : "border-border bg-card hover:bg-researcher/10 hover:border-researcher/20"
                        }`}
                      >
                        U-{u.number}
                      </button>
                    );
                  })}
                </div>

                <div className="rounded-lg bg-muted/50 p-3 border border-border space-y-1 mt-2 text-xs">
                  <span className="font-bold text-researcher block uppercase tracking-wider">Unit Objectives:</span>
                  <p className="text-muted-foreground leading-relaxed font-mono">{activeUnit.title}</p>
                </div>

                {/* Prescribed References */}
                <div className="text-xs space-y-1.5 border-t border-border pt-4">
                  <span className="font-bold text-muted-foreground block uppercase tracking-wider">Academic Reference Texts:</span>
                  <ul className="space-y-1 pl-4 list-disc text-muted-foreground leading-normal">
                    {activeSubject.textbooks.map((b, idx) => (
                      <li key={idx} className="line-clamp-1">{b}</li>
                    ))}
                  </ul>
                </div>

              </CardContent>
            </Card>

            {/* Knowledge Graph Component */}
            <Card variant="elevated">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                  <Network className="h-4 w-4 text-researcher" />
                  Syllabus Correlation Graph
                </CardTitle>
                <CardDescription className="text-xs">
                  Traces overlap dependencies between 5th Sem modules
                </CardDescription>
              </CardHeader>
              <CardContent>
                <KnowledgeGraph />
              </CardContent>
            </Card>

          </div>

          {/* RIGHT PANEL: Dynamic Lab Generator OR AI Assistant (Take 7 columns) */}
          <div className="lg:col-span-7 space-y-6">
            
            <AnimatePresence mode="wait">
              {labFileMode ? (
                <motion.div
                  key="lab-file"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <Card className="border-researcher/30 shadow-lg overflow-hidden">
                    <CardHeader className="bg-researcher/5 border-b border-border py-4 flex flex-row items-center justify-between">
                      <div>
                        <CardTitle className="text-lg font-bold flex items-center gap-2">
                          <Code className="h-5 w-5 text-researcher animate-pulse" />
                          RGPV Experiment Sheet
                        </CardTitle>
                        <CardDescription className="text-xs font-semibold">
                          Subject: {activeSubject.code} • Unit {activeUnit.number} Sessional
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={handleCopyCode} 
                          className="text-xs text-researcher hover:text-researcher/80"
                        >
                          {copiedCode ? "Copied!" : "Copy Code"}
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => setLabFileMode(false)} className="text-xs text-muted-foreground">
                          Back to Research
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-5 max-h-[540px] overflow-y-auto">
                      
                      {/* Title block */}
                      <div className="border border-researcher/15 p-4 rounded-xl bg-card text-xs leading-relaxed space-y-1">
                        <div>
                          <strong>EXPERIMENT NO:</strong> {activeUnit.number}<br />
                          <strong>TITLE:</strong> {expData.title}
                        </div>
                      </div>

                      {/* Objective */}
                      <div className="space-y-1 text-xs">
                        <strong className="text-[10px] font-bold text-researcher uppercase tracking-wider block">1. OBJECTIVE:</strong>
                        <p className="text-muted-foreground leading-relaxed">
                          To design, construct, and analyze a fully compliant program demonstrating the structural processes of {expData.title.toLowerCase()} in reference to the RGPV AIML syllabus specifications.
                        </p>
                      </div>

                      {/* Apparatus / Software */}
                      <div className="space-y-1 text-xs">
                        <strong className="text-[10px] font-bold text-researcher uppercase tracking-wider block">2. SOFTWARE / SYSTEMS REQUIRED:</strong>
                        <p className="text-muted-foreground font-mono">
                          Python 3.10+, PyTorch Framework, NumPy Utilities, Anaconda Virtual Environment.
                        </p>
                      </div>

                      {/* Theory */}
                      <div className="space-y-1 text-xs">
                        <strong className="text-[10px] font-bold text-researcher uppercase tracking-wider block">3. MATHEMATICAL THEORY & METHODOLOGY:</strong>
                        <p className="text-muted-foreground leading-relaxed">
                          {expData.mathTheory}
                        </p>
                      </div>

                      {/* Executable Code block */}
                      <div className="space-y-1.5 text-xs">
                        <strong className="text-[10px] font-bold text-researcher uppercase tracking-wider block">4. EXECUTABLE SOURCE CODE:</strong>
                        <pre className="p-4 rounded-xl bg-muted overflow-x-auto text-[11px] font-mono leading-relaxed border border-border text-foreground">
                          <code>{expData.codeBlock}</code>
                        </pre>
                      </div>

                      {/* Expected outputs */}
                      <div className="space-y-1 text-xs">
                        <strong className="text-[10px] font-bold text-researcher uppercase tracking-wider block">5. EVALUATION AND OBSERVATIONS:</strong>
                        <p className="text-muted-foreground leading-relaxed">
                          The script executes successive convergence trials. Reconstructed outputs demonstrate descending validation loss (MSE/Dice cross-entropy decreasing below threshold). Students must copy generated plots and log epochs into sessional manuals.
                        </p>
                      </div>

                    </CardContent>
                  </Card>
                </motion.div>
              ) : (
                <motion.div
                  key="chat-panel"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {/* AI Assistant Chat Interface */}
                  <AIChatInterface
                    role="researcher"
                    systemContext={`SubjectCode:${activeSubject.code},Unit:${activeUnit.number}`}
                    placeholder={`Analyze deep learning models, write research summaries, or extract citations for ${activeSubject.code} Unit ${activeUnit.number}...`}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bottom Actions strip */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-researcher/10 bg-researcher/5 p-4 flex flex-col sm:flex-row items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-researcher text-primary-foreground font-bold">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground">Advanced Lab Innovation Sandbox</h4>
                  <p className="text-xs text-muted-foreground">Draft university-compliant code files or explore deep learning details.</p>
                </div>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <Button 
                  onClick={() => setLabFileMode(true)} 
                  variant="outline" 
                  size="sm" 
                  className="flex-1 sm:flex-none text-xs border-researcher/25 text-researcher hover:bg-researcher/10"
                >
                  <Code className="mr-1.5 h-3.5 w-3.5" />
                  Generate Lab Code
                </Button>
                <Button 
                  onClick={() => setLabFileMode(false)} 
                  variant="outline" 
                  size="sm" 
                  className="flex-1 sm:flex-none text-xs border-researcher/25 text-researcher hover:bg-researcher/10"
                >
                  <FlaskConical className="mr-1.5 h-3.5 w-3.5" />
                  Research Chat
                </Button>
              </div>
            </motion.div>

          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}
