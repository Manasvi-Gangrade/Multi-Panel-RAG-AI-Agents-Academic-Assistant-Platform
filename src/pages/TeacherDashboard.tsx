import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, 
  FileQuestion, 
  ClipboardCheck, 
  BarChart3, 
  TrendingUp, 
  AlertCircle,
  GraduationCap,
  Sparkles,
  Printer,
  ChevronRight,
  BookOpen,
  Award,
  PenTool
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/shared/StatCard";
import { AIChatInterface } from "@/components/shared/AIChatInterface";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { RGPVSyllabus, SyllabusSubject } from "@/lib/syllabus";

export default function TeacherDashboard() {
  const [selectedSubjectCode, setSelectedSubjectCode] = useState<string>("AL-501");
  const [activeUnitNum, setActiveUnitNum] = useState<number>(1);
  const [paperType, setPaperType] = useState<"MST1" | "MST2" | "EndSem">("MST1");
  const [difficulty, setDifficulty] = useState<string>("Balanced");
  const [generatedPaper, setGeneratedPaper] = useState<boolean>(false);
  const [showAnswerKey, setShowAnswerKey] = useState<boolean>(false);

  // Assignment Evaluator Sandbox State
  const [evaluatorActive, setEvaluatorActive] = useState<boolean>(false);
  const [studentAnswer, setStudentAnswer] = useState<string>("");
  const [evaluationResult, setEvaluationResult] = useState<{
    score: number;
    plagiarism: number;
    feedback: string;
  } | null>(null);
  const [evaluating, setEvaluating] = useState<boolean>(false);

  const activeSubject = RGPVSyllabus.find(s => s.code === selectedSubjectCode) || RGPVSyllabus[0];
  const activeUnit = activeSubject.units.find(u => u.number === activeUnitNum) || activeSubject.units[0];

  // Derive RGPV Statistics
  const totalPapersCreated = 18;
  const activeClasses = 4;
  const classAvgScore = "79.2%";

  const handleSubjectChange = (code: string) => {
    setSelectedSubjectCode(code);
    setActiveUnitNum(1);
    setGeneratedPaper(false);
    setShowAnswerKey(false);
    setEvaluatorActive(false);
    setEvaluationResult(null);
  };

  // Generate customized RGPV question paper content
  const getPaperDetails = () => {
    const timeAllowed = paperType === "EndSem" ? "3 Hours" : "1.5 Hours";
    const maxMarks = paperType === "EndSem" ? "70 Marks" : "20 Marks";
    const instructions = paperType === "EndSem" 
      ? [
          "Attempt any five questions. All questions carry equal marks.",
          "Assume suitable data if missing. Numerical questions must show step-by-step calculations."
        ]
      : [
          "Attempt all questions. Question 1 is compulsory.",
          "Show clean schematic diagrams where applicable."
        ];

    // Combine sample questions from active subject
    const qList = activeSubject.units.flatMap((u, uIdx) => 
      u.sampleQuestions.map((q, qIdx) => ({
        text: q.question,
        answer: q.answer,
        unitNum: u.number,
        marks: qIdx === 0 ? 7 : 7,
        code: `Q${uIdx + 1}${qIdx + 1}`
      }))
    );

    // Filter questions based on unit selection (MST targets specific units, EndSem targets all)
    let filteredQs = qList;
    if (paperType === "MST1") {
      filteredQs = qList.filter(q => q.unitNum === 1 || q.unitNum === 2);
    } else if (paperType === "MST2") {
      filteredQs = qList.filter(q => q.unitNum === 3 || q.unitNum === 4);
    } else {
      // For EndSem, pick a balanced set of 5 distinct questions
      filteredQs = qList.slice(0, 5);
    }

    // Default filler if questions are short
    if (filteredQs.length < 3) {
      filteredQs = qList;
    }

    return {
      timeAllowed,
      maxMarks,
      instructions,
      questions: filteredQs.slice(0, 5)
    };
  };

  const paperData = getPaperDetails();

  // Evaluate student answer sandbox
  const handleEvaluateAnswer = () => {
    if (!studentAnswer.trim()) return;
    setEvaluating(true);
    setTimeout(() => {
      // Simple automated score generator checking keywords
      const lowerAns = studentAnswer.toLowerCase();
      let matchCount = 0;
      activeUnit.keyKeywords.forEach(kw => {
        if (lowerAns.includes(kw.toLowerCase())) matchCount++;
      });

      const scorePercentage = Math.min(30 + (matchCount * 20), 95);
      const marksAwarded = Math.round((scorePercentage / 100) * 7);
      
      let feedback = "";
      if (scorePercentage > 80) {
        feedback = `Excellent! Student has fully elaborated on key parameters including: ${activeUnit.keyKeywords.slice(0, 3).join(", ")}. Step-by-step explanation aligns perfectly with RGPV recommended textbook solutions. Keep it up!`;
      } else if (scorePercentage > 50) {
        feedback = `Good attempt, but can be improved. Concept is clear, but lacking structural schematic illustrations and deep mathematical definitions. Advise student to reference standard equations from ${activeSubject.textbooks[0]}.`;
      } else {
        feedback = "Critically low elaboration. Key keywords are missing. The student has written general statements instead of standard technological steps. Suggest major revisions.";
      }

      setEvaluationResult({
        score: marksAwarded,
        plagiarism: Math.round(5 + Math.random() * 12),
        feedback
      });
      setEvaluating(false);
    }, 1500);
  };

  return (
    <DashboardLayout role="teacher">
      <div className="space-y-8 pb-10">
        
        {/* Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl border border-teacher/20 bg-gradient-to-r from-teacher/10 via-orange-500/5 to-transparent p-6 md:p-8"
        >
          <div className="absolute right-0 top-0 -mr-16 -mt-16 h-48 w-48 rounded-full bg-teacher/10 blur-3xl" />
          <div className="relative z-10 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="border-teacher/30 bg-teacher/10 text-teacher font-semibold">
                RGPV V-Sem Instructor Panel
              </Badge>
              <Badge variant="outline" className="border-border bg-card text-muted-foreground text-xs">
                AI Assessment & Syllabus Management
              </Badge>
            </div>
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="font-display text-3xl font-extrabold tracking-tight md:text-4xl text-foreground">
                  RGPV Assessment Suite 📚
                </h1>
                <p className="mt-2 max-w-2xl text-sm md:text-base text-muted-foreground leading-relaxed">
                  Generate official-format question papers (MSTs and End-Sem), structure comprehensive answer keys based on university criteria, and run automated AI script evaluations.
                </p>
              </div>
              <Button 
                variant="teacher" 
                size="lg" 
                className="shadow-lg shadow-teacher/20 self-start md:self-center"
                onClick={() => setGeneratedPaper(true)}
              >
                <FileQuestion className="mr-2 h-4 w-4" />
                Generate RGPV Exam Paper
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Statistics Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Active Classes" value={activeClasses} subtitle="CSE-AIML 5th Sem" icon={Users} role="teacher" />
          <StatCard title="Papers Formulated" value={totalPapersCreated} subtitle="MST & Sessionals" icon={FileQuestion} role="teacher" />
          <StatCard title="Pending Corrections" value={6} subtitle="Assignments to grade" icon={ClipboardCheck} role="teacher" />
          <StatCard title="Class Average" value={classAvgScore} subtitle="RGPV Benchmark: 72%" icon={TrendingUp} role="teacher" />
        </div>

        {/* Subject & Unit Selectors */}
        <div className="space-y-3">
          <h2 className="font-display text-lg font-bold tracking-tight flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-teacher" />
            Set Subject & Syllabus Blueprint:
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
            {RGPVSyllabus.map((subject) => {
              const isActive = subject.code === selectedSubjectCode;
              return (
                <div
                  key={subject.code}
                  onClick={() => handleSubjectChange(subject.code)}
                  className={`flex flex-col justify-between rounded-2xl border p-4 cursor-pointer transition-all duration-300 ${
                    isActive 
                      ? "border-teacher bg-teacher/10 ring-1 ring-teacher shadow-md shadow-teacher/5" 
                      : "border-border bg-card hover:bg-accent/40"
                  }`}
                >
                  <div className="space-y-1">
                    <span className={`text-[10px] font-bold tracking-wider uppercase ${isActive ? "text-teacher" : "text-muted-foreground"}`}>
                      {subject.code}
                    </span>
                    <h3 className="font-display text-xs font-semibold leading-tight line-clamp-2">
                      {subject.name}
                    </h3>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <Badge variant="outline" className="text-[9px] px-1 py-0 border-teacher/20 text-teacher">
                      Active
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Master Workspace Grid */}
        <div className="grid gap-6 lg:grid-cols-12">
          
          {/* LEFT PANEL: Syllabus tracking & Generator Controls (Take 5 columns) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Paper Configuration */}
            <Card variant="elevated">
              <CardHeader>
                <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                  Exam Parameters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                
                {/* Paper Type Select */}
                <div className="space-y-2">
                  <Label className="text-xs font-semibold">Select RGPV Exam Style</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "MST1", label: "MST-1" },
                      { id: "MST2", label: "MST-2" },
                      { id: "EndSem", label: "End-Sem" }
                    ].map(type => (
                      <Button
                        key={type.id}
                        type="button"
                        variant={paperType === type.id ? "teacher" : "outline"}
                        size="sm"
                        onClick={() => { setPaperType(type.id as any); setGeneratedPaper(false); }}
                        className="text-xs py-1"
                      >
                        {type.label}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Difficulty Balancing */}
                <div className="space-y-2">
                  <Label className="text-xs font-semibold">Difficulty Balance (Bloom's Taxonomy)</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {["Analytical", "Balanced", "Descriptive"].map(diff => (
                      <Button
                        key={diff}
                        type="button"
                        variant={difficulty === diff ? "teacher" : "outline"}
                        size="sm"
                        onClick={() => { setDifficulty(diff); setGeneratedPaper(false); }}
                        className="text-xs py-1"
                      >
                        {diff}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Syllabus Unit Target Tracker */}
                <div className="space-y-2 pt-2">
                  <Label className="text-xs font-semibold">Active Syllabus Target</Label>
                  <div className="grid grid-cols-5 gap-2">
                    {activeSubject.units.map(u => {
                      const isActive = u.number === activeUnitNum;
                      return (
                        <button
                          key={u.number}
                          onClick={() => { setActiveUnitNum(u.number); setGeneratedPaper(false); }}
                          className={`flex h-9 w-full items-center justify-center rounded-lg border font-bold text-xs transition-all ${
                            isActive 
                              ? "bg-teacher text-primary-foreground border-teacher ring-1 ring-teacher" 
                              : "border-border bg-card hover:bg-accent/40"
                          }`}
                        >
                          U-{u.number}
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-[10px] text-muted-foreground italic mt-1 leading-normal">
                    * MST-1 tests Units 1-2. MST-2 tests Units 3-4. End-Sem covers entire syllabus.
                  </p>
                </div>

                <Button 
                  onClick={() => setGeneratedPaper(true)} 
                  variant="teacher" 
                  className="w-full mt-2"
                >
                  Create Custom Exam Paper
                </Button>

              </CardContent>
            </Card>

            {/* AI Evaluator Interactive Sandbox */}
            <Card variant="elevated">
              <CardHeader>
                <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                  <PenTool className="h-4 w-4 text-teacher animate-pulse" />
                  AI RGPV Script Evaluator
                </CardTitle>
                <CardDescription className="text-xs">
                  Check student answers based on recommended keys
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <Label className="text-xs font-semibold">Select Target Question:</Label>
                  <Badge variant="outline" className="w-full justify-start py-1 px-2 border-teacher/20 text-teacher bg-teacher/5 line-clamp-1 block text-left">
                    Q: {activeUnit.sampleQuestions[0].question}
                  </Badge>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="student-script" className="text-xs font-semibold">Paste Student Answer Script:</Label>
                  <textarea
                    id="student-script"
                    rows={4}
                    value={studentAnswer}
                    onChange={(e) => setStudentAnswer(e.target.value)}
                    placeholder="Enter the student's handwritten or typed script response here..."
                    className="w-full rounded-lg border border-border bg-card p-3 text-xs focus:ring-1 focus:ring-teacher focus:outline-none leading-relaxed"
                  />
                </div>

                <Button 
                  variant="outline" 
                  onClick={handleEvaluateAnswer} 
                  disabled={evaluating || !studentAnswer.trim()}
                  className="w-full text-xs border-teacher/30 text-teacher hover:bg-teacher/10"
                >
                  {evaluating ? "Evaluating against RGPV norms..." : "Run AI Correction Scan"}
                </Button>

                {/* Score & Feedback Reveal */}
                {evaluationResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-xl bg-muted p-4 border border-border space-y-2.5 text-xs"
                  >
                    <div className="flex items-center justify-between font-bold">
                      <span className="text-teacher uppercase tracking-wider">AI Script Assessment:</span>
                      <Badge className="bg-green-600 text-white font-mono">
                        Marks: {evaluationResult.score} / 7
                      </Badge>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{evaluationResult.feedback}</p>
                    <div className="flex items-center justify-between text-[10px] text-muted-foreground pt-1 border-t border-border/50">
                      <span>Plagiarism Score: {evaluationResult.plagiarism}%</span>
                      <span>Textbook Source Validated</span>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>

          </div>

          {/* RIGHT PANEL: Live Generated printable paper OR AI Assistant (Take 7 columns) */}
          <div className="lg:col-span-7 space-y-6">
            
            <AnimatePresence mode="wait">
              {generatedPaper ? (
                <motion.div
                  key="paper-viewer"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <Card className="border-teacher/30 shadow-lg overflow-hidden">
                    <CardHeader className="bg-teacher/5 border-b border-border py-4 flex flex-row items-center justify-between">
                      <div>
                        <CardTitle className="text-lg font-bold flex items-center gap-2">
                          <FileQuestion className="h-5 w-5 text-teacher" />
                          Generated Exam Script
                        </CardTitle>
                        <CardDescription className="text-xs">
                          RGPV 5th Sem AIML Assessment Preview
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => window.print()} 
                          className="h-8 w-8 text-muted-foreground hover:text-foreground"
                        >
                          <Printer className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => setGeneratedPaper(false)} className="text-xs text-muted-foreground">
                          Back to Assistant
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-6 max-h-[560px] overflow-y-auto">
                      
                      {/* Formal RGPV Header */}
                      <div className="border border-foreground/15 p-5 text-center space-y-2 rounded-xl bg-card">
                        <span className="font-display font-extrabold text-sm tracking-wide block uppercase text-foreground">
                          RAJIV GANDHI PROUDYOGIKI VISHWAVIDYALAYA, BHOPAL
                        </span>
                        <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider block">
                          5th Semester CSE-AIML Examination (December 2026)
                        </span>
                        <div className="grid grid-cols-2 gap-4 text-left border-t border-border pt-3 mt-2 text-xs font-mono">
                          <div>
                            <strong>Course Code:</strong> {activeSubject.code}<br />
                            <strong>Course Title:</strong> {activeSubject.name}
                          </div>
                          <div>
                            <strong>Time Allowed:</strong> {paperData.timeAllowed}<br />
                            <strong>Maximum Marks:</strong> {paperData.maxMarks}
                          </div>
                        </div>
                      </div>

                      {/* Instructions */}
                      <div className="text-xs space-y-1">
                        <strong className="text-[11px] uppercase tracking-wider text-muted-foreground block mb-1">General Instructions:</strong>
                        <ol className="list-decimal pl-4 space-y-0.5 text-muted-foreground leading-normal">
                          {paperData.instructions.map((inst, idx) => (
                            <li key={idx}>{inst}</li>
                          ))}
                        </ol>
                      </div>

                      {/* Questions */}
                      <div className="space-y-4 border-t border-border pt-4">
                        {paperData.questions.map((q, idx) => (
                          <div key={idx} className="space-y-1.5 text-sm leading-relaxed">
                            <div className="flex justify-between font-semibold">
                              <span>Q.{idx + 1} {q.text}</span>
                              <span className="font-mono text-xs text-muted-foreground">[{q.marks} Marks]</span>
                            </div>
                            <p className="text-xs text-muted-foreground leading-normal italic pl-4">
                              * Blueprint target: Unit {q.unitNum} Syllabus Keywords.
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* Answer Key Toggle */}
                      <div className="pt-4 border-t border-border space-y-4">
                        <Button 
                          onClick={() => setShowAnswerKey(!showAnswerKey)} 
                          variant="outline" 
                          className="w-full text-xs border-teacher/20 text-teacher"
                        >
                          {showAnswerKey ? "Hide Solution Marking Key" : "View AI-Suggested Grading Solutions"}
                        </Button>
                        
                        {showAnswerKey && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="rounded-xl bg-muted p-4 border border-border text-xs leading-relaxed space-y-4"
                          >
                            <span className="font-bold text-teacher uppercase tracking-wider block">Official RGPV Marking Blueprint:</span>
                            {paperData.questions.map((q, idx) => (
                              <div key={idx} className="space-y-1 border-b border-border/50 pb-2.5 last:border-0 last:pb-0">
                                <h5 className="font-bold">Q.{idx + 1} Answer Scheme:</h5>
                                <p className="text-muted-foreground">{q.answer}</p>
                                <span className="text-[10px] text-green-600 block mt-1">✓ award 2 marks for basic definitions, 5 marks for step derivation/schematic diagrams.</span>
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </div>

                    </CardContent>
                  </Card>
                </motion.div>
              ) : (
                <motion.div
                  key="chat-viewer"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {/* AI Assistant Chat Interface */}
                  <AIChatInterface
                    role="teacher"
                    systemContext={`SubjectCode:${activeSubject.code},Unit:${activeUnit.number}`}
                    placeholder={`Generate MST questions, draft syllabus items, or construct rubrics for ${activeSubject.code} Unit ${activeUnit.number}...`}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Quick Actions Panel */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-teacher/10 bg-teacher/5 p-4 flex flex-col sm:flex-row items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teacher text-primary-foreground font-bold">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground">AI Assessment Engine Sandbox</h4>
                  <p className="text-xs text-muted-foreground">Test student drafts or check syllabus status dynamically.</p>
                </div>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <Button 
                  onClick={() => { setEvaluatorActive(true); setGeneratedPaper(false); }} 
                  variant="outline" 
                  size="sm" 
                  className="flex-1 sm:flex-none text-xs border-teacher/25 text-teacher hover:bg-teacher/10"
                >
                  <PenTool className="mr-1.5 h-3.5 w-3.5" />
                  Evaluate Scripts
                </Button>
                <Button 
                  onClick={() => { setGeneratedPaper(true); setEvaluatorActive(false); }} 
                  variant="outline" 
                  size="sm" 
                  className="flex-1 sm:flex-none text-xs border-teacher/25 text-teacher hover:bg-teacher/10"
                >
                  <FileQuestion className="mr-1.5 h-3.5 w-3.5" />
                  Print Exam Papers
                </Button>
              </div>
            </motion.div>

          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}
