import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layers, RotateCcw, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

const flashcards = [
  { front: "What is Entropy?", back: "A measure of disorder or randomness in a system. It always increases in natural processes (Second Law of Thermodynamics)." },
  { front: "Define Enthalpy", back: "The total heat content of a system. H = U + PV, where U is internal energy, P is pressure, and V is volume." },
  { front: "What is Gibbs Free Energy?", back: "G = H - TS. A thermodynamic potential that measures the maximum work obtainable from a system at constant temperature and pressure." },
  { front: "Carnot Efficiency Formula", back: "η = 1 - (T_cold / T_hot). Maximum efficiency of a heat engine operating between two temperatures." },
  { front: "What is an Adiabatic Process?", back: "A process where no heat is transferred to or from the system (Q = 0). The system is thermally insulated." },
  { front: "State Zeroth Law of Thermodynamics", back: "If system A is in thermal equilibrium with system C, and B is in equilibrium with C, then A and B are in equilibrium with each other." },
];

const StudentFlashcards = () => {
  const [current, setCurrent] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [generated, setGenerated] = useState(false);

  if (!generated) {
    return (
      <div className="p-6 flex flex-col items-center justify-center min-h-[60vh]">
        <motion.div className="text-center" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
          <div className="w-20 h-20 rounded-2xl gradient-student flex items-center justify-center mx-auto mb-4">
            <Layers className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="font-display text-2xl font-bold mb-2">AI Flashcard Generator</h1>
          <p className="text-sm text-muted-foreground mb-6 max-w-md">
            Generate flashcards from your uploaded notes. Perfect for revision and spaced repetition.
          </p>
          <button onClick={() => setGenerated(true)} className="px-6 py-3 rounded-xl gradient-student text-primary-foreground font-semibold flex items-center gap-2 mx-auto hover:opacity-90 transition-opacity">
            <Sparkles className="w-4 h-4" />
            Generate Flashcards
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="max-w-lg mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-display text-xl font-bold">Flashcards</h1>
          <span className="text-sm text-muted-foreground">{current + 1} / {flashcards.length}</span>
        </div>

        <div className="relative h-64 perspective-1000 mb-6 cursor-pointer" onClick={() => setFlipped(!flipped)}>
          <AnimatePresence mode="wait">
            <motion.div
              key={`${current}-${flipped}`}
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: -90, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`absolute inset-0 rounded-2xl p-6 flex flex-col items-center justify-center text-center ${
                flipped ? "gradient-student text-primary-foreground" : "glass-card-strong panel-shadow-student"
              }`}
            >
              <span className="text-xs font-medium mb-3 opacity-60">{flipped ? "ANSWER" : "QUESTION"}</span>
              <p className={`font-display text-lg font-semibold ${flipped ? "" : "text-foreground"}`}>
                {flipped ? flashcards[current].back : flashcards[current].front}
              </p>
              <span className="text-xs mt-4 opacity-50">Tap to flip</span>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-between">
          <button
            disabled={current === 0}
            onClick={() => { setCurrent(c => c - 1); setFlipped(false); }}
            className="p-2 rounded-lg bg-secondary disabled:opacity-40"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button onClick={() => setFlipped(false)} className="p-2 rounded-lg bg-secondary text-muted-foreground">
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            disabled={current === flashcards.length - 1}
            onClick={() => { setCurrent(c => c + 1); setFlipped(false); }}
            className="p-2 rounded-lg bg-secondary disabled:opacity-40"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Progress dots */}
        <div className="flex justify-center gap-1.5 mt-4">
          {flashcards.map((_, i) => (
            <button key={i} onClick={() => { setCurrent(i); setFlipped(false); }}
              className={`w-2 h-2 rounded-full transition-colors ${i === current ? "bg-student" : "bg-border"}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentFlashcards;
