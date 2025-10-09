import { useState } from "react";
import { motion } from "framer-motion";
import { Brain, CheckCircle, XCircle, RotateCcw, Sparkles } from "lucide-react";

const sampleQuiz = [
  { q: "What is the first law of thermodynamics?", options: ["Energy can be created", "Energy is conserved", "Entropy always increases", "Heat flows uphill"], correct: 1 },
  { q: "Define an isothermal process.", options: ["Constant pressure", "Constant volume", "Constant temperature", "Constant entropy"], correct: 2 },
  { q: "What unit is used to measure entropy?", options: ["Joules", "Watts", "J/K", "Pascals"], correct: 2 },
  { q: "In an adiabatic process, what remains constant?", options: ["Temperature", "Pressure", "No heat exchange", "Volume"], correct: 2 },
  { q: "Convert 373 K to Celsius.", options: ["100°C", "273°C", "0°C", "373°C"], correct: 0 },
];

const StudentQuiz = () => {
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(sampleQuiz.length).fill(null));
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (idx: number) => {
    const updated = [...answers];
    updated[current] = idx;
    setAnswers(updated);
  };

  const score = answers.filter((a, i) => a === sampleQuiz[i].correct).length;

  if (!started) {
    return (
      <div className="p-6 flex flex-col items-center justify-center min-h-[60vh]">
        <motion.div className="text-center" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
          <div className="w-20 h-20 rounded-2xl gradient-student flex items-center justify-center mx-auto mb-4">
            <Brain className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="font-display text-2xl font-bold mb-2">AI Quiz Generator</h1>
          <p className="text-sm text-muted-foreground mb-6 max-w-md">
            Generate quizzes from your uploaded materials. The AI analyzes your notes and creates relevant questions.
          </p>
          <button onClick={() => setStarted(true)} className="px-6 py-3 rounded-xl gradient-student text-primary-foreground font-semibold flex items-center gap-2 mx-auto hover:opacity-90 transition-opacity">
            <Sparkles className="w-4 h-4" />
            Generate Quiz
          </button>
        </motion.div>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="p-6">
        <motion.div className="max-w-lg mx-auto text-center" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
          <div className="w-24 h-24 rounded-full gradient-student flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl font-bold text-primary-foreground">{score}/{sampleQuiz.length}</span>
          </div>
          <h2 className="font-display text-xl font-bold mb-2">Quiz Complete!</h2>
          <p className="text-sm text-muted-foreground mb-6">You scored {Math.round((score / sampleQuiz.length) * 100)}%</p>

          <div className="space-y-3 text-left">
            {sampleQuiz.map((q, i) => (
              <div key={i} className="glass-card rounded-lg p-3">
                <div className="flex items-start gap-2">
                  {answers[i] === q.correct ? (
                    <CheckCircle className="w-5 h-5 text-teacher shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                  )}
                  <div>
                    <p className="text-sm font-medium">{q.q}</p>
                    <p className="text-xs text-muted-foreground mt-1">Correct: {q.options[q.correct]}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button onClick={() => { setStarted(false); setShowResults(false); setAnswers(new Array(sampleQuiz.length).fill(null)); setCurrent(0); }}
            className="mt-6 px-4 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium flex items-center gap-2 mx-auto hover:bg-secondary/80">
            <RotateCcw className="w-4 h-4" /> Try Again
          </button>
        </motion.div>
      </div>
    );
  }

  const q = sampleQuiz[current];

  return (
    <div className="p-6">
      <div className="max-w-lg mx-auto">
        <div className="flex items-center justify-between mb-6">
          <span className="text-sm font-medium text-muted-foreground">Question {current + 1}/{sampleQuiz.length}</span>
          <div className="flex gap-1">
            {sampleQuiz.map((_, i) => (
              <div key={i} className={`w-2 h-2 rounded-full ${i === current ? "bg-student" : answers[i] !== null ? "bg-student/40" : "bg-border"}`} />
            ))}
          </div>
        </div>

        <motion.div key={current} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <h2 className="font-display text-lg font-bold mb-4">{q.q}</h2>
          <div className="space-y-2">
            {q.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all ${
                  answers[current] === i
                    ? "bg-student text-primary-foreground font-medium"
                    : "glass-card hover:shadow-md"
                }`}
              >
                <span className="font-mono mr-2 text-xs">{String.fromCharCode(65 + i)}.</span>
                {opt}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="flex justify-between mt-6">
          <button disabled={current === 0} onClick={() => setCurrent((c) => c - 1)} className="px-4 py-2 rounded-lg bg-secondary text-sm disabled:opacity-40">Previous</button>
          {current < sampleQuiz.length - 1 ? (
            <button onClick={() => setCurrent((c) => c + 1)} className="px-4 py-2 rounded-lg gradient-student text-primary-foreground text-sm font-medium">Next</button>
          ) : (
            <button onClick={() => setShowResults(true)} className="px-4 py-2 rounded-lg gradient-student text-primary-foreground text-sm font-medium">Submit</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentQuiz;
