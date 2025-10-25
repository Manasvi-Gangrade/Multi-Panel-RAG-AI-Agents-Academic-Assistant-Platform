import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BookOpen, 
  FileText, 
  Brain, 
  FlaskConical, 
  MessageSquare, 
  TrendingUp,
  Award,
  Sparkles,
  BookOpenCheck,
  ArrowRight,
  ArrowLeft,
  GraduationCap,
  ListRestart
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/shared/StatCard";
import { AIChatInterface } from "@/components/shared/AIChatInterface";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RGPVSyllabus, SyllabusSubject } from "@/lib/syllabus";

export default function StudentDashboard() {
  const [selectedSubjectCode, setSelectedSubjectCode] = useState<string>("AL-501");
  const [activeUnitNum, setActiveUnitNum] = useState<number>(1);
  const [notesGenerated, setNotesGenerated] = useState<boolean>(false);
  
  // Interactive Quiz State
  const [quizMode, setQuizMode] = useState<boolean>(false);
  const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  
  // Flashcards state
  const [flashcardMode, setFlashcardMode] = useState<boolean>(false);
  const [flashcardIndex, setFlashcardIndex] = useState<number>(0);
  const [flipped, setFlipped] = useState<boolean>(false);

  const activeSubject = RGPVSyllabus.find(s => s.code === selectedSubjectCode) || RGPVSyllabus[0];
  const activeUnit = activeSubject.units.find(u => u.number === activeUnitNum) || activeSubject.units[0];

  // Derive RGPV mock questions for active unit
  const mockQuizQuestions = activeUnit.sampleQuestions.map((q, idx) => {
    // Dynamically build 4 options for a mock MCQ from the reference text
    const sampleOptions = [
      q.answer.substring(0, 70) + "...",
      "It represents a static memory allocation process not governed by CPU scheduling algorithms.",
      "An alternative architectural framework recommended only for multi-user real-time operations.",
      "A security mechanism used to prevent external thread buffer overflows in user space."
    ];
    // Shuffle options based on unit number
    const correctIdx = (idx + activeUnitNum) % 4;
    const options = [...sampleOptions];
    // Swap correct option to correct position
    const temp = options[correctIdx];
    options[correctIdx] = options[0];
    options[0] = temp;

    return {
      id: idx,
      question: q.question,
      options,
      correctIndex: correctIdx,
      explanation: q.answer
    };
  });

  const handleSubjectChange = (code: string) => {
    setSelectedSubjectCode(code);
    setActiveUnitNum(1);
    setNotesGenerated(false);
    setQuizMode(false);
    setFlashcardMode(false);
    setCurrentQuizIndex(0);
    setQuizScore(0);
    setUserAnswers({});
    setShowExplanation(false);
  };

  const handleSelectOption = (index: number) => {
    if (showExplanation) return;
    setUserAnswers(prev => ({ ...prev, [currentQuizIndex]: index.toString() }));
  };

  const handleQuizSubmit = () => {
    const isCorrect = parseInt(userAnswers[currentQuizIndex]) === mockQuizQuestions[currentQuizIndex].correctIndex;
    if (isCorrect) {
      setQuizScore(prev => prev + 1);
    }
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    setShowExplanation(false);
    if (currentQuizIndex < mockQuizQuestions.length - 1) {
      setCurrentQuizIndex(prev => prev + 1);
    } else {
      // Finished
    }
  };

  const resetQuiz = () => {
    setUserAnswers({});
    setCurrentQuizIndex(0);
    setQuizScore(0);
    setShowExplanation(false);
    setQuizMode(true);
  };

  return (
    <DashboardLayout role="student">
      <div className="space-y-8 pb-10">
        
        {/* Banner with RGPV Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl border border-student/20 bg-gradient-to-r from-student/10 via-amber-500/5 to-transparent p-6 md:p-8"
        >
          <div className="absolute right-0 top-0 -mr-16 -mt-16 h-48 w-48 rounded-full bg-student/10 blur-3xl" />
          <div className="relative z-10 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="border-student/30 bg-student/10 text-student font-semibold">
                RGPV V-Semester AIML
              </Badge>
              <Badge variant="outline" className="border-border bg-card text-muted-foreground text-xs">
                New AICTE Flexible Curricula Scheme
              </Badge>
            </div>
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="font-display text-3xl font-extrabold tracking-tight md:text-4xl text-foreground">
                  Rajiv Gandhi Proudyogiki Vishwavidyalaya Hub 🎓
                </h1>
                <p className="mt-2 max-w-2xl text-sm md:text-base text-muted-foreground leading-relaxed">
                  Your AI study assistant is fully synchronized with the 5th Sem AIML Syllabus. Choose your active subject and unit to instantly trigger contextual tutors, generate study packs, and analyze previous year questions.
                </p>
              </div>
              <Button 
                variant="student" 
                size="lg" 
                className="shadow-lg shadow-student/20 self-start md:self-center"
                onClick={() => setNotesGenerated(true)}
              >
                <BookOpen className="mr-2 h-4 w-4" />
                Quick Revision Mode
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Dynamic Subject Selector Cards */}
        <div className="space-y-3">
          <h2 className="font-display text-lg font-bold tracking-tight flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-student" />
            Select Your 5th Sem RGPV Subject:
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
            {RGPVSyllabus.map((subject) => {
              const isActive = subject.code === selectedSubjectCode;
              return (
                <motion.div
                  key={subject.code}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleSubjectChange(subject.code)}
                  className={`relative flex flex-col justify-between rounded-2xl border p-4 cursor-pointer transition-all duration-300 ${
                    isActive 
                      ? "border-student bg-student/10 ring-1 ring-student shadow-md shadow-student/5" 
                      : "border-border bg-card hover:bg-accent/40"
                  }`}
                >
                  <div className="space-y-1">
                    <span className={`text-[10px] font-bold tracking-wider uppercase ${isActive ? "text-student" : "text-muted-foreground"}`}>
                      {subject.code}
                    </span>
                    <h3 className="font-display text-xs font-semibold leading-tight line-clamp-2">
                      {subject.name}
                    </h3>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <Badge variant="outline" className={`text-[9px] px-1.5 py-0 ${
                      subject.category === "Core" ? "border-amber-500/20 text-amber-500" : "border-student/20 text-student"
                    }`}>
                      {subject.category.split(" ")[0]}
                    </Badge>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Core Study Workspace Section */}
        <div className="grid gap-6 lg:grid-cols-12">
          
          {/* LEFT COLUMN: Subject Outline, Syllabus Tracker, Units (Take 5 columns) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Subject Info Card */}
            <Card variant="elevated" className="overflow-hidden">
              <CardHeader className="bg-student/5 pb-4">
                <div className="flex items-center justify-between">
                  <Badge variant="student">{activeSubject.code}</Badge>
                  <span className="text-xs text-muted-foreground font-semibold">{activeSubject.category} Subject</span>
                </div>
                <CardTitle className="font-display text-xl font-bold mt-2">
                  {activeSubject.name}
                </CardTitle>
                <CardDescription className="line-clamp-2 mt-1">
                  Objectives: {activeSubject.objectives[0]}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4 space-y-4">
                {/* Course Outcome Tracker */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-medium">
                    <span>Syllabus Target Coverage</span>
                    <span className="text-student font-semibold">100% Aligned</span>
                  </div>
                  <Progress value={100} className="h-1.5 bg-muted [&>div]:bg-student" />
                </div>
                
                {/* Recommended Textbooks list */}
                <div className="text-xs space-y-2 border-t border-border pt-4">
                  <span className="font-bold text-muted-foreground block uppercase tracking-wider">RGPV Prescribed Textbooks:</span>
                  <ul className="space-y-1.5 pl-4 list-disc text-foreground">
                    {activeSubject.textbooks.map((b, idx) => (
                      <li key={idx} className="line-clamp-1">{b}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Interactive Unit Map */}
            <div className="space-y-3">
              <h3 className="font-display text-sm font-bold uppercase tracking-wider text-muted-foreground px-1">
                Syllabus Unit Selector (1 to 5)
              </h3>
              <div className="space-y-2.5">
                {activeSubject.units.map((unit) => {
                  const isActive = unit.number === activeUnitNum;
                  return (
                    <motion.div
                      key={unit.number}
                      whileHover={{ x: 4 }}
                      onClick={() => {
                        setActiveUnitNum(unit.number);
                        setNotesGenerated(false);
                        setQuizMode(false);
                        setFlashcardMode(false);
                      }}
                      className={`group flex items-start gap-4 rounded-2xl border p-4 cursor-pointer transition-all duration-300 ${
                        isActive 
                          ? "border-student/50 bg-gradient-to-r from-student/10 via-student/5 to-card ring-1 ring-student/30 shadow-sm" 
                          : "border-border bg-card hover:bg-accent/40"
                      }`}
                    >
                      <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl font-bold text-sm ${
                        isActive ? "bg-student text-primary-foreground" : "bg-muted text-muted-foreground group-hover:bg-accent group-hover:text-foreground"
                      }`}>
                        U-{unit.number}
                      </div>
                      <div className="space-y-1 flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-semibold truncate leading-none">
                            {unit.title}
                          </h4>
                          {isActive && (
                            <Badge className="bg-student text-[9px] px-1 py-0 select-none">
                              Active Context
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-1 mt-1">
                          {unit.contents}
                        </p>
                        
                        {/* Keyword Pill tag list */}
                        <div className="flex flex-wrap gap-1 mt-2.5">
                          {unit.keyKeywords.slice(0, 3).map((kw) => (
                            <span 
                              key={kw} 
                              className={`text-[9px] px-1.5 py-0.5 rounded font-mono ${
                                isActive ? "bg-student/15 text-student border border-student/10" : "bg-muted text-muted-foreground border border-border"
                              }`}
                            >
                              {kw}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Chat and Active Tool Workspace (Take 7 columns) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Conditional Sub-panels: Notes, Quiz, or standard AI Chat */}
            <AnimatePresence mode="wait">
              {notesGenerated ? (
                <motion.div
                  key="notes-panel"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <Card className="border-student/20 shadow-md">
                    <CardHeader className="bg-student/5 flex flex-row items-center justify-between py-4">
                      <div>
                        <CardTitle className="text-lg font-bold flex items-center gap-2">
                          <FileText className="h-5 w-5 text-student animate-pulse" />
                          RGPV Exam Study Guide
                        </CardTitle>
                        <CardDescription className="text-xs font-semibold">
                          Subject: {activeSubject.code} • Unit {activeUnit.number}
                        </CardDescription>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => setNotesGenerated(false)} className="text-xs text-muted-foreground hover:text-foreground">
                        Close Guide
                      </Button>
                    </CardHeader>
                    <CardContent className="pt-5 space-y-4 max-h-[500px] overflow-y-auto">
                      <div className="space-y-4 text-sm leading-relaxed text-foreground">
                        
                        <div className="rounded-xl bg-muted/60 p-4 border border-border">
                          <span className="font-mono text-xs font-bold text-student uppercase tracking-wider block mb-1">Official Syllabus Blueprint:</span>
                          <p className="italic text-xs text-muted-foreground">"{activeUnit.contents}"</p>
                        </div>

                        <div className="space-y-3">
                          <h4 className="font-bold text-base text-student border-b border-border pb-1">Key Revision Lectures & Concepts</h4>
                          {activeUnit.sampleQuestions.map((q, idx) => (
                            <div key={idx} className="space-y-1.5 p-3 rounded-lg bg-accent/30 border border-border/50">
                              <h5 className="font-semibold text-sm text-foreground flex items-start gap-1">
                                <span className="text-student font-bold">Q{idx+1}:</span> {q.question}
                              </h5>
                              <p className="text-xs text-muted-foreground pl-5 leading-relaxed">{q.answer}</p>
                            </div>
                          ))}
                        </div>

                        <div className="space-y-2 border-t border-border pt-4">
                          <h4 className="font-bold text-sm text-foreground uppercase tracking-wider">Recommended Preparation Steps:</h4>
                          <ol className="list-decimal pl-4 space-y-1 text-xs text-muted-foreground">
                            <li>Thoroughly study chapters corresponding to <strong>{activeSubject.textbooks[0]}</strong>.</li>
                            <li>Write standard answers highlighting definitions, structural diagrams, and equations.</li>
                            <li>Ask the active AI Tutor for numerical workouts (such as Simplex tables, SQL Joins, page scheduling).</li>
                          </ol>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ) : quizMode ? (
                <motion.div
                  key="quiz-panel"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <Card className="border-student/30 shadow-lg overflow-hidden">
                    <CardHeader className="bg-student/5 py-4 border-b border-border">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg font-bold flex items-center gap-2">
                            <Brain className="h-5 w-5 text-student" />
                            RGPV Concept Quiz Player
                          </CardTitle>
                          <CardDescription className="text-xs">
                            Checking knowledge for {activeSubject.code} Unit {activeUnit.number}
                          </CardDescription>
                        </div>
                        <Badge variant="student">
                          Score: {quizScore} / {mockQuizQuestions.length}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-6">
                      
                      {/* Progress bar */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Question {currentQuizIndex + 1} of {mockQuizQuestions.length}</span>
                          <span>{Math.round(((currentQuizIndex) / mockQuizQuestions.length) * 100)}% Complete</span>
                        </div>
                        <Progress value={((currentQuizIndex) / mockQuizQuestions.length) * 100} className="h-1 bg-muted [&>div]:bg-student" />
                      </div>

                      {/* Question Text */}
                      <div className="space-y-3">
                        <h4 className="font-display font-semibold text-base leading-snug">
                          {mockQuizQuestions[currentQuizIndex].question}
                        </h4>
                        <p className="text-xs text-muted-foreground font-mono">Select the most accurate response based on textbook references:</p>
                      </div>

                      {/* Options Grid */}
                      <div className="space-y-2.5">
                        {mockQuizQuestions[currentQuizIndex].options.map((opt, oIdx) => {
                          const isSelected = userAnswers[currentQuizIndex] === oIdx.toString();
                          const isCorrect = oIdx === mockQuizQuestions[currentQuizIndex].correctIndex;
                          
                          let optionStyle = "border-border bg-card hover:bg-accent/40";
                          if (isSelected) {
                            optionStyle = "border-student bg-student/10 ring-1 ring-student";
                          }
                          if (showExplanation) {
                            if (isCorrect) {
                              optionStyle = "border-green-500 bg-green-500/10 text-green-700 dark:text-green-400";
                            } else if (isSelected) {
                              optionStyle = "border-red-500 bg-red-500/10 text-red-700 dark:text-red-400";
                            }
                          }

                          return (
                            <button
                              key={oIdx}
                              disabled={showExplanation}
                              onClick={() => handleSelectOption(oIdx)}
                              className={`w-full text-left flex items-start gap-3 rounded-xl border p-4 text-xs font-medium transition-all ${optionStyle}`}
                            >
                              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-current text-[10px]">
                                {String.fromCharCode(65 + oIdx)}
                              </span>
                              <span className="flex-1 leading-normal">{opt}</span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Feedback Panel */}
                      {showExplanation && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="rounded-xl bg-muted p-4 border border-border text-xs leading-relaxed space-y-2"
                        >
                          <span className="font-bold text-student uppercase tracking-wider block">Standard RGPV Answer & Solution:</span>
                          <p className="text-muted-foreground">{mockQuizQuestions[currentQuizIndex].explanation}</p>
                        </motion.div>
                      )}

                      {/* Navigation buttons */}
                      <div className="flex justify-end gap-3 pt-2">
                        {!showExplanation ? (
                          <Button 
                            variant="student" 
                            disabled={userAnswers[currentQuizIndex] === undefined} 
                            onClick={handleQuizSubmit}
                          >
                            Submit Answer
                          </Button>
                        ) : (
                          <Button 
                            variant="student" 
                            onClick={currentQuizIndex < mockQuizQuestions.length - 1 ? handleNextQuestion : () => setQuizMode(false)}
                          >
                            {currentQuizIndex < mockQuizQuestions.length - 1 ? "Next Question" : "Finish Quiz"}
                          </Button>
                        )}
                        <Button variant="ghost" size="sm" onClick={() => setQuizMode(false)} className="text-muted-foreground">
                          Exit Practice
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ) : flashcardMode ? (
                <motion.div
                  key="flashcard-panel"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <Card className="border-student/30 shadow-lg">
                    <CardHeader className="bg-student/5 py-4 border-b border-border">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg font-bold flex items-center gap-2">
                            <FlaskConical className="h-5 w-5 text-student" />
                            RGPV Revision Flashcards
                          </CardTitle>
                          <CardDescription className="text-xs">
                            Active: {activeSubject.code} Unit {activeUnit.number}
                          </CardDescription>
                        </div>
                        <Badge variant="outline">
                          {flashcardIndex + 1} / {activeUnit.sampleQuestions.length}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-6 flex flex-col items-center">
                      
                      {/* Flashcard Component */}
                      <div 
                        onClick={() => setFlipped(!flipped)}
                        className="w-full max-w-[420px] h-[220px] perspective cursor-pointer"
                      >
                        <motion.div
                          animate={{ rotateY: flipped ? 180 : 0 }}
                          transition={{ duration: 0.4 }}
                          style={{ transformStyle: "preserve-3d" }}
                          className="w-full h-full relative rounded-2xl border border-border shadow-md bg-card p-6 flex flex-col items-center justify-center text-center select-none"
                        >
                          {/* Front Side */}
                          <div 
                            style={{ backfaceVisibility: "hidden" }}
                            className={`absolute inset-0 p-6 flex flex-col items-center justify-center space-y-3 ${flipped ? "hidden" : ""}`}
                          >
                            <span className="text-[10px] font-bold text-student tracking-wider uppercase">Question prompt (Click to flip)</span>
                            <h4 className="font-display font-bold text-base leading-snug text-foreground">
                              {activeUnit.sampleQuestions[flashcardIndex].question}
                            </h4>
                          </div>

                          {/* Back Side */}
                          <div 
                            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                            className={`absolute inset-0 p-6 flex flex-col items-center justify-center overflow-y-auto space-y-2 ${!flipped ? "hidden" : ""}`}
                          >
                            <span className="text-[10px] font-bold text-green-500 tracking-wider uppercase">Correct Answer</span>
                            <p className="text-xs text-muted-foreground leading-normal">
                              {activeUnit.sampleQuestions[flashcardIndex].answer}
                            </p>
                          </div>
                        </motion.div>
                      </div>

                      {/* Controls */}
                      <div className="flex items-center gap-4 pt-4">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          disabled={flashcardIndex === 0} 
                          onClick={() => { setFlashcardIndex(prev => prev - 1); setFlipped(false); }}
                        >
                          <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <span className="text-xs font-semibold text-muted-foreground select-none">Tap Card to Flip</span>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          disabled={flashcardIndex === activeUnit.sampleQuestions.length - 1} 
                          onClick={() => { setFlashcardIndex(prev => prev + 1); setFlipped(false); }}
                        >
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>

                      <Button variant="ghost" size="sm" onClick={() => setFlashcardMode(false)} className="text-muted-foreground mt-2">
                        Back to Workspace
                      </Button>
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
                    role="student"
                    systemContext={`SubjectCode:${activeSubject.code},Unit:${activeUnit.number}`}
                    placeholder={`Ask me anything about ${activeSubject.code} Unit ${activeUnit.number} (e.g. key terms)...`}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Quick Practice Actions Strip */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-student/10 bg-student/5 p-4 flex flex-col sm:flex-row items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-student text-primary-foreground font-bold">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground">Interactive Practice Sandbox</h4>
                  <p className="text-xs text-muted-foreground">Train yourself with questions direct from the RGPV curriculum.</p>
                </div>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <Button 
                  onClick={resetQuiz} 
                  variant="outline" 
                  size="sm" 
                  className="flex-1 sm:flex-none text-xs border-student/25 text-student hover:bg-student/10"
                >
                  <Brain className="mr-1.5 h-3.5 w-3.5" />
                  Mock Quiz
                </Button>
                <Button 
                  onClick={() => { setFlashcardMode(true); setFlashcardIndex(0); setFlipped(false); }} 
                  variant="outline" 
                  size="sm" 
                  className="flex-1 sm:flex-none text-xs border-student/25 text-student hover:bg-student/10"
                >
                  <FlaskConical className="mr-1.5 h-3.5 w-3.5" />
                  Flashcards
                </Button>
              </div>
            </motion.div>

          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}
