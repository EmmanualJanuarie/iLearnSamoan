import {
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  FileCheck2,
  GraduationCap,
  Library,
  Mic,
  NotebookPen,
  ScrollText,
  Search,
  ShieldCheck,
} from "lucide-react";
import type { User } from "@supabase/supabase-js";
import type { LucideIcon } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  exams,
  modules,
  quizBank,
  sources,
  starterFlashcards,
  studyRules,
  weeklyTemplate,
  type Module,
} from "./curriculum";
import { allowedEmail, isSupabaseConfigured, supabase } from "./supabase";

type Tab = "lesson" | "tests" | "calendar" | "report" | "notebook" | "cards" | "speaking" | "answers";
type NoteState = Record<string, string>;
type AnswerState = Record<string, string>;
type CardState = Record<string, { box: number; lastReviewed?: string; needsReview?: boolean }>;
type LessonCompletionState = Record<string, number[]>;
type TabConfig = [Tab, LucideIcon, string];
type CalendarDay = {
  day: string;
  type: "Study" | "Review" | "Test" | "Off";
  title: string;
  detail: string;
};
type ProgressData = {
  completed: number[];
  notes: NoteState;
  mistakes: NoteState;
  answers: AnswerState;
  cardState: CardState;
  lessonCompletions: LessonCompletionState;
};

const currentDate = new Date("2026-07-04T00:00:00");
const storage = {
  progress: "ilearn-samoan-progress",
  notes: "ilearn-samoan-notes",
  mistakes: "ilearn-samoan-mistakes",
  answers: "ilearn-samoan-answers",
  cards: "ilearn-samoan-cards",
  lessonCompletions: "ilearn-samoan-lesson-completions",
};

const tabs: TabConfig[] = [
  ["lesson", BookOpen, "Lesson"],
  ["tests", ClipboardCheck, "Tests"],
  ["calendar", CalendarDays, "Calendar"],
  ["report", ScrollText, "Report"],
  ["notebook", NotebookPen, "Notebook"],
  ["cards", Library, "Cards"],
  ["speaking", Mic, "Speaking"],
  ["answers", FileCheck2, "Answers"],
];

function gradeFromPercent(percent: number) {
  if (percent >= 90) return "A";
  if (percent >= 80) return "B";
  if (percent >= 70) return "C";
  if (percent >= 60) return "D";
  return "In Progress";
}

function semesterExams(track: string) {
  const semesterNumber = track.match(/Semester (\d)/)?.[1];
  if (!semesterNumber) return exams.filter((exam) => exam.month === "October 2028");
  const examMap: Record<string, string[]> = {
    "1": ["November 2026", "February 2027"],
    "2": ["May 2027", "August 2027"],
    "3": ["November 2027", "February 2028"],
    "4": ["May 2028", "July 2028"],
    "5": ["August 2028"],
    "6": ["September 2028"],
  };
  return exams.filter((exam) => examMap[semesterNumber]?.includes(exam.month));
}

function passwordIssues(password: string) {
  const issues = [];
  if (password.length < 16) issues.push("at least 16 characters");
  if (!/[a-z]/.test(password)) issues.push("a lowercase letter");
  if (!/[A-Z]/.test(password)) issues.push("an uppercase letter");
  if (!/\d/.test(password)) issues.push("a number");
  if (!/[^A-Za-z0-9]/.test(password)) issues.push("a symbol");
  return issues;
}

function loadJson<T>(key: string, fallback: T): T {
  const saved = localStorage.getItem(key);
  return saved ? (JSON.parse(saved) as T) : fallback;
}

function saveJson<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

function loadLocalProgress(): ProgressData {
  return {
    completed: loadJson(storage.progress, []),
    notes: loadJson(storage.notes, {}),
    mistakes: loadJson(storage.mistakes, {}),
    answers: loadJson(storage.answers, {}),
    cardState: loadJson(storage.cards, {}),
    lessonCompletions: loadJson(storage.lessonCompletions, {}),
  };
}

function monthDate(value: string) {
  const [month, year] = value.split(/[- ]/);
  const monthIndex = new Date(`${month} 1, ${year}`).getMonth();
  return new Date(Number(year), monthIndex, 1);
}

function getStatus(window: string) {
  const firstMonth = window.split("-")[0].trim();
  const year = window.match(/\d{4}/)?.[0] ?? "2026";
  const date = monthDate(`${firstMonth} ${year}`);
  if (date < new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)) return "Past";
  if (date.getMonth() === currentDate.getMonth() && date.getFullYear() === currentDate.getFullYear()) return "Now";
  return "Upcoming";
}

function monthEndDate(value: string) {
  const start = monthDate(value);
  return new Date(start.getFullYear(), start.getMonth() + 1, 0);
}

function semesterFinalDate(track: string) {
  const related = semesterExams(track);
  if (related.length === 0) return monthEndDate("October 2028");
  return related.map((exam) => monthEndDate(exam.month)).sort((a, b) => b.getTime() - a.getTime())[0];
}

function isReportAvailable(track: string) {
  return currentDate > semesterFinalDate(track);
}

function modulesForPlanning() {
  const now = modules.filter((module) => getStatus(module.window) === "Now");
  if (now.length > 0) return now.slice(0, 3);
  return modules.filter((module) => getStatus(module.window) === "Upcoming").slice(0, 3);
}

function nextExam() {
  return exams
    .map((exam) => ({ exam, date: monthEndDate(exam.month) }))
    .filter(({ date }) => date >= currentDate)
    .sort((a, b) => a.date.getTime() - b.date.getTime())[0]?.exam;
}

function weekPlan(items: Module[]): CalendarDay[] {
  const primary = items[0] ?? modules[0];
  const secondary = items[1] ?? primary;
  const upcomingExam = nextExam();
  return [
    {
      day: "Monday",
      type: "Study",
      title: `Module ${primary.id}: ${primary.title}`,
      detail: "Read the lesson, copy key examples, and create new vocabulary cards.",
    },
    {
      day: "Tuesday",
      type: "Study",
      title: `Module ${primary.id}: drills`,
      detail: "Complete controlled grammar or vocabulary drills and write corrected sentences.",
    },
    {
      day: "Wednesday",
      type: "Review",
      title: "Flashcards and mistake log",
      detail: "Review due cards, rewrite old mistakes, and record one short pronunciation sample.",
    },
    {
      day: "Thursday",
      type: "Study",
      title: "Native speaker practice",
      detail:
        `Use ${secondary.title.toLowerCase()} in a short conversation with a tutor, language exchange partner, community group, or moderated app. Prepare five questions first.`,
    },
    {
      day: "Friday",
      type: "Test",
      title: upcomingExam ? `${upcomingExam.title} prep` : "Weekly quiz",
      detail: upcomingExam
        ? `Prepare for ${upcomingExam.month}. Answer at least two exam prompts.`
        : "Take the interactive test bank and correct weak answers.",
    },
    {
      day: "Saturday",
      type: "Off",
      title: "Rest or light exposure",
      detail: "Optional: listen to music, watch a short clip, or read old notes without grading yourself.",
    },
    {
      day: "Sunday",
      type: "Off",
      title: "No formal study",
      detail: "Reset for the next week. Only add notes if you naturally notice something useful.",
    },
  ];
}

export function App() {
  const [selectedId, setSelectedId] = useState(1);
  const [selectedLesson, setSelectedLesson] = useState(0);
  const [showHomework, setShowHomework] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("lesson");
  const [query, setQuery] = useState("");
  const localProgress = useMemo(loadLocalProgress, []);
  const [completed, setCompleted] = useState<number[]>(localProgress.completed);
  const [notes, setNotes] = useState<NoteState>(localProgress.notes);
  const [mistakes, setMistakes] = useState<NoteState>(localProgress.mistakes);
  const [answers, setAnswers] = useState<AnswerState>(localProgress.answers);
  const [cardState, setCardState] = useState<CardState>(localProgress.cardState);
  const [lessonCompletions, setLessonCompletions] = useState<LessonCompletionState>(localProgress.lessonCompletions);
  const [user, setUser] = useState<User | null>(null);
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authMessage, setAuthMessage] = useState("Sign in to sync progress across devices.");
  const [cloudReady, setCloudReady] = useState(!isSupabaseConfigured);
  const [cloudSaving, setCloudSaving] = useState(false);
  const [revealedCard, setRevealedCard] = useState<string | null>(null);
  const [recordingUrl, setRecordingUrl] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);

  const selected = modules.find((module) => module.id === selectedId) ?? modules[0];
  const lesson = selected.lessons[selectedLesson] ?? selected.lessons[0];
  const planningModules = modulesForPlanning();
  const calendarDays = weekPlan(planningModules);

  const grouped = useMemo<Record<string, Module[]>>(() => {
    return modules.reduce<Record<string, Module[]>>((acc, module) => {
      acc[module.track] ??= [];
      acc[module.track].push(module);
      return acc;
    }, {});
  }, []);

  const filteredModules = modules.filter((module) => {
    const text = `${module.title} ${module.track} ${module.window}`.toLowerCase();
    return text.includes(query.toLowerCase());
  });

  const progress = Math.round((completed.length / modules.length) * 100);
  const semesterCards = starterFlashcards.filter((card) => card.track === selected.track);
  const dueCards = semesterCards.filter((card) => (cardState[card.id]?.box ?? 0) < 3);
  const weeklyReviewCards = starterFlashcards.filter((card) => cardState[card.id]?.needsReview);
  const weeklyReviewByCategory = weeklyReviewCards.reduce<Record<string, typeof starterFlashcards>>((acc, card) => {
    acc[card.category] ??= [];
    acc[card.category].push(card);
    return acc;
  }, {});
  const selectedLessonCompletions = lessonCompletions[selected.id] ?? [];
  const selectedModuleLessonsComplete = selected.lessons.every((_item, index) =>
    selectedLessonCompletions.includes(index),
  );
  const isAllowedUser = user?.email?.toLowerCase() === allowedEmail;
  const strongPasswordIssues = passwordIssues(authPassword);
  const reportCards = Object.entries(grouped).map(([track, items]) => {
    const completeCount = items.filter((module) => completed.includes(module.id)).length;
    const percent = Math.round((completeCount / items.length) * 100);
    const tests = semesterExams(track);
    return {
      track,
      modules: items,
      completeCount,
      percent,
      grade: isReportAvailable(track) ? gradeFromPercent(percent) : "Locked",
      tests,
      finalDate: semesterFinalDate(track),
      isAvailable: isReportAvailable(track),
      status: items.some((module) => getStatus(module.window) === "Now")
        ? "Current"
        : items.every((module) => getStatus(module.window) === "Past")
          ? "Past"
          : "Upcoming",
    };
  });
  const trackOrder = Object.keys(grouped);

  function isTrackUnlocked(track: string) {
    const index = trackOrder.indexOf(track);
    if (index <= 0) return true;
    const previousTracks = trackOrder.slice(0, index);
    return previousTracks.every((previousTrack) => grouped[previousTrack].every((module) => completed.includes(module.id)));
  }

  function toggleComplete(id: number) {
    const module = modules.find((item) => item.id === id);
    const lessonIndexes = lessonCompletions[id] ?? [];
    const moduleLessonsComplete = module?.lessons.every((_item, index) => lessonIndexes.includes(index)) ?? false;
    if (!completed.includes(id) && !moduleLessonsComplete) {
      setAuthMessage("Finish every lesson in this module before marking it complete.");
      return;
    }
    setCompleted((items) => {
      const next = items.includes(id) ? items.filter((item) => item !== id) : [...items, id];
      saveJson(storage.progress, next);
      return next;
    });
  }

  function currentProgress(): ProgressData {
    return { completed, notes, mistakes, answers, cardState, lessonCompletions };
  }

  function applyProgress(data: ProgressData) {
    setCompleted(data.completed ?? []);
    setNotes(data.notes ?? {});
    setMistakes(data.mistakes ?? {});
    setAnswers(data.answers ?? {});
    setCardState(data.cardState ?? {});
    setLessonCompletions(data.lessonCompletions ?? {});
    saveJson(storage.progress, data.completed ?? []);
    saveJson(storage.notes, data.notes ?? {});
    saveJson(storage.mistakes, data.mistakes ?? {});
    saveJson(storage.answers, data.answers ?? {});
    saveJson(storage.cards, data.cardState ?? {});
    saveJson(storage.lessonCompletions, data.lessonCompletions ?? {});
  }

  function toggleLessonComplete(moduleId: number, lessonIndex: number) {
    setLessonCompletions((items) => {
      const current = items[moduleId] ?? [];
      const nextLessons = current.includes(lessonIndex)
        ? current.filter((item) => item !== lessonIndex)
        : [...current, lessonIndex].sort((a, b) => a - b);
      const next = { ...items, [moduleId]: nextLessons };
      saveJson(storage.lessonCompletions, next);
      return next;
    });
  }

  async function loadCloudProgress(activeUser: User) {
    if (!supabase) return;
    setCloudReady(false);
    const { data, error } = await supabase.from("user_progress").select("data").eq("user_id", activeUser.id).maybeSingle();
    if (error) {
      setAuthMessage(error.message);
      setCloudReady(true);
      return;
    }
    if (data?.data) {
      applyProgress(data.data as ProgressData);
      setAuthMessage("Cloud progress loaded.");
    } else {
      const local = loadLocalProgress();
      const { error: insertError } = await supabase
        .from("user_progress")
        .insert({ user_id: activeUser.id, owner_email: allowedEmail, data: local });
      setAuthMessage(insertError ? insertError.message : "Local progress moved to your cloud account.");
    }
    setCloudReady(true);
  }

  async function signIn() {
    if (!supabase) {
      setAuthMessage("Add Supabase keys to .env.local before signing in.");
      return;
    }
    if (authEmail.toLowerCase() !== allowedEmail) {
      setAuthMessage("This app is restricted to the owner account.");
      return;
    }
    const { error } = await supabase.auth.signInWithPassword({ email: authEmail, password: authPassword });
    setAuthMessage(error ? error.message : "Signed in.");
  }

  async function signUp() {
    if (!supabase) {
      setAuthMessage("Add Supabase keys to .env.local before creating an account.");
      return;
    }
    if (authEmail.toLowerCase() !== allowedEmail) {
      setAuthMessage("Account creation is restricted to the owner email.");
      return;
    }
    if (strongPasswordIssues.length > 0) {
      setAuthMessage(`Use a stronger password with ${strongPasswordIssues.join(", ")}.`);
      return;
    }
    const { error } = await supabase.auth.signUp({ email: authEmail, password: authPassword });
    setAuthMessage(error ? error.message : "Account created. Check your email if confirmation is enabled.");
  }

  async function signOut() {
    await supabase?.auth.signOut();
    setUser(null);
    setAuthMessage("Signed out. Local browser progress is still available on this device.");
  }

  function updateNote(moduleId: number, value: string) {
    const next = { ...notes, [moduleId]: value };
    setNotes(next);
    saveJson(storage.notes, next);
  }

  function updateMistake(moduleId: number, value: string) {
    const next = { ...mistakes, [moduleId]: value };
    setMistakes(next);
    saveJson(storage.mistakes, next);
  }

  function updateAnswer(questionId: string, value: string) {
    const next = { ...answers, [questionId]: value };
    setAnswers(next);
    saveJson(storage.answers, next);
  }

  function gradeCard(cardId: string, remembered: boolean) {
    const nextBox = remembered ? Math.min((cardState[cardId]?.box ?? 0) + 1, 3) : 0;
    const next = {
      ...cardState,
      [cardId]: { box: nextBox, lastReviewed: new Date().toISOString(), needsReview: !remembered },
    };
    setCardState(next);
    saveJson(storage.cards, next);
  }

  async function startRecording() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    chunks.current = [];
    recorder.ondataavailable = (event) => chunks.current.push(event.data);
    recorder.onstop = () => {
      const blob = new Blob(chunks.current, { type: "audio/webm" });
      setRecordingUrl(URL.createObjectURL(blob));
      stream.getTracks().forEach((track) => track.stop());
    };
    mediaRecorder.current = recorder;
    recorder.start();
    setIsRecording(true);
  }

  function stopRecording() {
    mediaRecorder.current?.stop();
    setIsRecording(false);
  }

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      if (data.user?.email?.toLowerCase() === allowedEmail) void loadCloudProgress(data.user);
    });
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user?.email?.toLowerCase() === allowedEmail) void loadCloudProgress(session.user);
    });
    return () => data.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!supabase || !user || !isAllowedUser || !cloudReady) return;
    const client = supabase;
    const handle = window.setTimeout(async () => {
      setCloudSaving(true);
      const { error } = await client
        .from("user_progress")
        .upsert({ user_id: user.id, owner_email: allowedEmail, data: currentProgress() }, { onConflict: "user_id" });
      setCloudSaving(false);
      setAuthMessage(error ? error.message : "Progress saved to cloud.");
    }, 600);
    return () => window.clearTimeout(handle);
  }, [completed, notes, mistakes, answers, cardState, lessonCompletions, user, cloudReady]);

  if (!isAllowedUser) {
    return (
      <main className="lock-screen">
        <section className="lock-panel">
          <div className="lock-brand">
            <ShieldCheck size={34} />
            <div>
              <h1>iLearn Samoan</h1>
              <p>Private study system</p>
            </div>
          </div>
          <p className="lock-copy">
            This app is restricted to {allowedEmail}. Sign in with the owner account to access lessons, progress,
            reports, notebook entries, and tests.
          </p>
          {!isSupabaseConfigured && (
            <p className="warning-copy">Cloud auth is not configured yet. Add Supabase keys to `.env.local`.</p>
          )}
          {user && !isAllowedUser && (
            <p className="warning-copy">The signed-in account is not allowed. Sign out and use the owner account.</p>
          )}
          <label>
            Email
            <input
              autoComplete="email"
              onChange={(event) => setAuthEmail(event.target.value)}
              type="email"
              value={authEmail}
            />
          </label>
          <label>
            Password
            <input
              autoComplete="current-password"
              onChange={(event) => setAuthPassword(event.target.value)}
              type="password"
              value={authPassword}
            />
          </label>
          <div className="auth-actions">
            <button onClick={signIn} type="button">Sign in</button>
            <button onClick={signUp} type="button">Create owner account</button>
          </div>
          <p className="password-rules">
            Password rule: 16+ characters with uppercase, lowercase, number, and symbol.
          </p>
          <p>{authMessage}</p>
          {user && <button className="secondary-button" onClick={signOut} type="button">Sign out</button>}
        </section>
      </main>
    );
  }

  return (
    <main className="app-shell">
      <aside className="sidebar" aria-label="Curriculum navigation">
        <div className="brand">
          <GraduationCap size={26} />
          <div>
            <h1>iLearn Samoan</h1>
            <p>September 2026 to October 2028</p>
          </div>
        </div>

        <label className="search">
          <Search size={17} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search modules" />
        </label>

        <div className="progress">
          <div>
            <span>Course Progress</span>
            <strong>{progress}%</strong>
          </div>
          <meter min="0" max="100" value={progress} />
        </div>

        <section className="auth-panel">
          <h2>Account Sync</h2>
          {user ? (
            <>
              <p>{user.email}</p>
              <p>{cloudSaving ? "Saving..." : authMessage}</p>
              <button onClick={signOut} type="button">Sign out</button>
            </>
          ) : (
            <>
              <input
                autoComplete="email"
                onChange={(event) => setAuthEmail(event.target.value)}
                placeholder="Email"
                type="email"
                value={authEmail}
              />
              <input
                autoComplete="current-password"
                onChange={(event) => setAuthPassword(event.target.value)}
                placeholder="Password"
                type="password"
                value={authPassword}
              />
              <div className="auth-actions">
                <button onClick={signIn} type="button">Sign in</button>
                <button onClick={signUp} type="button">Create</button>
              </div>
              <p>{isSupabaseConfigured ? authMessage : "Cloud sync is not configured yet."}</p>
            </>
          )}
        </section>

        <nav className="module-list">
          {Object.entries(query ? { Results: filteredModules } : grouped).map(([track, items]) => (
            <section key={track}>
              <h2>{track}</h2>
              {items.map((module) => {
                const locked = !isTrackUnlocked(module.track);
                return (
                  <button
                    className={`${module.id === selected.id ? "module-button active" : "module-button"} ${locked ? "locked" : ""}`}
                    disabled={locked}
                    key={module.id}
                    onClick={() => {
                      setSelectedId(module.id);
                      setSelectedLesson(0);
                      setShowHomework(false);
                      setActiveTab("lesson");
                      setRevealedCard(null);
                    }}
                    title={locked ? "Finish the previous semester first" : module.title}
                    type="button"
                  >
                    <span>{module.id.toString().padStart(2, "0")}</span>
                    <div>
                      <strong>{module.title}</strong>
                      <small>{locked ? "Locked until previous semester is complete" : module.window}</small>
                    </div>
                  </button>
                );
              })}
            </section>
          ))}
        </nav>
      </aside>

      <section className="content">
        <header className="course-header">
          <div>
            <p className="eyebrow">{selected.track}</p>
            <h2>{selected.title}</h2>
            <p>
              A private school-style Samoan course with lessons, tests, notebook work, flashcards, and speaking
              practice. The curriculum begins in September 2026 and runs through October 2028.
            </p>
          </div>
          <button
            className="complete-button"
            disabled={!selectedModuleLessonsComplete && !completed.includes(selected.id)}
            onClick={() => toggleComplete(selected.id)}
            title={
              selectedModuleLessonsComplete
                ? "All lessons are complete"
                : "Complete every lesson in this module first"
            }
            type="button"
          >
            <CheckCircle2 size={18} />
            {completed.includes(selected.id) ? "Completed" : "Mark complete"}
          </button>
        </header>

        <div className="module-meta">
          <span>{selected.window}</span>
          <span>{getStatus(selected.window)}</span>
          <span>Module {selected.id} of 70</span>
          <span>
            {selectedLessonCompletions.length} of {selected.lessons.length} lessons complete
          </span>
          <span>{dueCards.length} cards due</span>
        </div>

        <nav className="tabs" aria-label="Study sections">
          {tabs.map(([tab, Icon, label]) => (
            <button className={activeTab === tab ? "tab active" : "tab"} key={tab} onClick={() => setActiveTab(tab)}>
              <Icon size={17} />
              {label}
            </button>
          ))}
        </nav>

        {activeTab === "lesson" && (
          <>
            <section className="panel">
              <div className="panel-title">
                <BookOpen size={20} />
                <h3>Learning Outcomes</h3>
              </div>
              <ul className="check-list">
                {selected.outcomes.map((outcome) => (
                  <li key={outcome}>{outcome}</li>
                ))}
              </ul>
            </section>

            <section className="lesson-workspace">
              <article className="lesson-card wide">
                <div className="lesson-card-head">
                  <div>
                    <h3>{lesson.title}</h3>
                  </div>
                  <button
                    className={
                      selectedLessonCompletions.includes(selectedLesson)
                        ? "lesson-complete-button complete"
                        : "lesson-complete-button"
                    }
                    onClick={() => toggleLessonComplete(selected.id, selectedLesson)}
                    type="button"
                  >
                    <CheckCircle2 size={18} />
                    {selectedLessonCompletions.includes(selectedLesson) ? "Lesson complete" : "Complete lesson"}
                  </button>
                </div>
                <h4>Purpose</h4>
                <p>{lesson.objective}</p>
                {[
                  ["Detailed Explanation", lesson.explanation],
                  ["Examples", lesson.examples],
                  ["Real-Life Application", lesson.realLifeApplication],
                  ["Activities", lesson.activities],
                  ["Assessment", lesson.assessment],
                  ["Summary", lesson.summary],
                ].map(([heading, items]) => (
                  <section className="lesson-section" key={heading as string}>
                    <h4>{heading as string}</h4>
                    <ul>
                      {(items as string[]).map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </section>
                ))}
                <button className="homework-toggle" onClick={() => setShowHomework((value) => !value)} type="button">
                  {showHomework ? "Hide homework" : "Homework"}
                </button>
                {showHomework && (
                  <section className="homework-panel">
                    <h4>Homework: Challenge for you</h4>
                    <ol>
                      {selected.homework.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ol>
                  </section>
                )}
              </article>
            </section>
          </>
        )}

        {activeTab === "tests" && (
          <section className="two-column">
            <div className="panel">
              <div className="panel-title">
                <ClipboardCheck size={20} />
                <h3>Interactive Test Bank</h3>
              </div>
              <div className="quiz-list">
                {quizBank.map((question) => (
                  <article key={question.id}>
                    <span>{question.type}</span>
                    <h4>{question.prompt}</h4>
                    {question.options && (
                      <div className="choice-row">
                        {question.options.map((option) => (
                          <button key={option} onClick={() => updateAnswer(question.id, option)} type="button">
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                    <textarea
                      onChange={(event) => updateAnswer(question.id, event.target.value)}
                      placeholder="Write your answer here"
                      value={answers[question.id] ?? ""}
                    />
                    <p className="rubric">Rubric: {question.rubric}</p>
                    {question.answer && <p className="answer-key">Answer key: {question.answer}</p>}
                  </article>
                ))}
              </div>
            </div>

            <div className="panel">
              <h3>Assessment Calendar</h3>
              <div className="exam-list compact">
                {exams.map((exam) => (
                  <article key={exam.title}>
                    <span>{exam.month}</span>
                    <h4>{exam.title}</h4>
                    <p>Modules {exam.modules}</p>
                    <ul>
                      {exam.format.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {activeTab === "calendar" && (
          <>
            <section className="panel">
              <div className="panel-title">
                <CalendarDays size={20} />
                <h3>Weekly Study Calendar</h3>
              </div>
              <p className="section-copy">
                This week is generated from the current or next scheduled module. Formal study is Monday to Friday;
                Saturday and Sunday are off unless you want light exposure.
              </p>
              <div className="week-grid">
                {calendarDays.map((item) => (
                  <article className={`day-card ${item.type.toLowerCase()}`} key={item.day}>
                    <span>{item.day}</span>
                    <strong>{item.type}</strong>
                    <h4>{item.title}</h4>
                    <p>{item.detail}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="two-column">
              <div className="panel">
                <h3>Current Focus</h3>
                <div className="calendar-grid">
                  {planningModules.map((module) => (
                    <article key={module.id}>
                      <span>Module {module.id}</span>
                      <h4>{module.title}</h4>
                      <p>{module.window}</p>
                      <button onClick={() => setSelectedId(module.id)} type="button">Open module</button>
                    </article>
                  ))}
                </div>
              </div>
              <div className="panel">
                <h3>Test Days</h3>
                <div className="exam-list compact">
                  {exams.map((exam) => (
                    <article key={exam.title}>
                      <span>{exam.month}</span>
                      <h4>{exam.title}</h4>
                      <p>Modules {exam.modules}</p>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            <section className="panel">
              <h3>Native Speaker Practice</h3>
              <p className="section-copy">
                Schedule this on Thursday once per week. Prefer a tutor, a moderated language exchange app, a local
                Samoan community group, or someone you already trust. Omegle is not available anymore and random
                anonymous video chat is not recommended for serious study.
              </p>
              <div className="practice-grid">
                <article>
                  <h4>Before</h4>
                  <ul>
                    <li>Prepare five sentences from the current module.</li>
                    <li>Prepare five questions you can ask without switching to English.</li>
                    <li>Choose one correction target: pronunciation, grammar, or natural phrasing.</li>
                  </ul>
                </article>
                <article>
                  <h4>During</h4>
                  <ul>
                    <li>Speak for at least ten minutes.</li>
                    <li>Ask the speaker to correct one repeated mistake.</li>
                    <li>Write down new words immediately after the conversation.</li>
                  </ul>
                </article>
                <article>
                  <h4>After</h4>
                  <ul>
                    <li>Add corrections to the mistake log.</li>
                    <li>Turn new vocabulary into cards.</li>
                    <li>Record a cleaner version of the same conversation prompt.</li>
                  </ul>
                </article>
              </div>
            </section>

            <section className="panel">
              <h3>Weekly School Routine</h3>
              <ol className="number-list">
                {weeklyTemplate.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
              <h3>Rules</h3>
              <ul className="check-list">
                {studyRules.map((rule) => (
                  <li key={rule}>{rule}</li>
                ))}
              </ul>
            </section>
          </>
        )}

        {activeTab === "report" && (
          <section className="panel">
            <div className="panel-title">
              <ScrollText size={20} />
              <h3>Semester Report Cards</h3>
            </div>
            <p className="section-copy">
              Report cards unlock only after the semester has ended. Until then, you can see the semester status and
              requirements, but the grade is held back like a real school report.
            </p>
            <div className="report-grid">
              {reportCards.map((card) => (
                <article className="report-card" key={card.track}>
                  <div className="report-head">
                    <div>
                      <span>{card.status}</span>
                      <h4>{card.track}</h4>
                    </div>
                    <strong className={card.isAvailable ? "" : "locked-grade"}>{card.grade}</strong>
                  </div>
                  {card.isAvailable ? (
                    <>
                      <div className="report-meter">
                        <meter min="0" max="100" value={card.percent} />
                        <p>
                          {card.completeCount} of {card.modules.length} modules complete · {card.percent}%
                        </p>
                      </div>
                      <div className="report-subjects">
                        {card.modules.map((module) => (
                          <span className={completed.includes(module.id) ? "done" : ""} key={module.id}>
                            {module.id}. {module.title}
                          </span>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="locked-report">
                      <p>
                        Available after {card.finalDate.toLocaleDateString(undefined, {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                        .
                      </p>
                      <p>
                        Complete all lessons, notebook work, mistake corrections, flashcard reviews, and semester tests
                        before this report is issued.
                      </p>
                    </div>
                  )}
                  <div className="report-tests">
                    <h5>Semester Tests</h5>
                    {card.tests.length > 0 ? (
                      card.tests.map((exam) => (
                        <p key={exam.title}>
                          <strong>{exam.month}</strong> · {exam.title}
                        </p>
                      ))
                    ) : (
                      <p>No formal exam assigned.</p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {activeTab === "notebook" && (
          <section className="two-column">
            <div className="panel">
              <div className="panel-title">
                <NotebookPen size={20} />
                <h3>Module Notebook</h3>
              </div>
              <textarea
                className="large-textarea"
                onChange={(event) => updateNote(selected.id, event.target.value)}
                placeholder="Write lesson notes, corrected sentences, vocabulary, culture notes, and tutor feedback."
                value={notes[selected.id] ?? ""}
              />
            </div>
            <div className="panel">
              <h3>Mistake Log</h3>
              <textarea
                className="large-textarea"
                onChange={(event) => updateMistake(selected.id, event.target.value)}
                placeholder="Record repeated errors. These become your next drills."
                value={mistakes[selected.id] ?? ""}
              />
              <h3>Reference Starting Points</h3>
              <div className="source-list">
                {sources.map((source) => (
                  <a href={source.url} key={source.url} rel="noreferrer" target="_blank">
                    {source.label}
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}

        {activeTab === "cards" && (
          <section className="panel">
            <div className="panel-title">
              <Library size={20} />
              <h3>Spaced Review Cards</h3>
            </div>
            <p className="section-copy">
              Showing cards for {selected.track}. Answers stay hidden until you reveal each card.
            </p>
            <div className="card-grid">
              {semesterCards.map((card) => {
                const isRevealed = revealedCard === card.id;
                return (
                  <article className="study-card" key={card.id}>
                    <span>{card.category}</span>
                    <h4>{card.front}</h4>
                    <p>{isRevealed ? card.back : "Reveal the answer after you recall it."}</p>
                    <div className="choice-row">
                      <button onClick={() => setRevealedCard(isRevealed ? null : card.id)} type="button">
                        {isRevealed ? "Hide" : "Reveal"}
                      </button>
                      <button onClick={() => gradeCard(card.id, false)} type="button">Don't know</button>
                      <button onClick={() => gradeCard(card.id, true)} type="button">Know it</button>
                    </div>
                    <small>Box {cardState[card.id]?.box ?? 0} of 3</small>
                  </article>
                );
              })}
            </div>
            <section className="review-bank">
              <h3>Weekly Review Cards</h3>
              <p className="section-copy">
                Cards marked "Don't know" appear here from every semester, grouped by category. Use this list during
                Wednesday review before returning cards to normal practice.
              </p>
              {weeklyReviewCards.length === 0 ? (
                <p className="empty-state">No cards are marked for weekly review.</p>
              ) : (
                Object.entries(weeklyReviewByCategory).map(([category, cards]) => (
                  <article key={category}>
                    <h4>{category}</h4>
                    <div className="review-chip-list">
                      {cards.map((card) => (
                        <span key={card.id}>
                          <strong>{card.front}</strong>
                          {card.back} · {card.track}
                        </span>
                      ))}
                    </div>
                  </article>
                ))
              )}
            </section>
          </section>
        )}

        {activeTab === "speaking" && (
          <section className="two-column">
            <div className="panel">
              <div className="panel-title">
                <Mic size={20} />
                <h3>Speaking Recorder</h3>
              </div>
              <p>Prompt: read five flashcards, then say one original sentence from this module.</p>
              <div className="choice-row">
                <button disabled={isRecording} onClick={startRecording} type="button">Start recording</button>
                <button disabled={!isRecording} onClick={stopRecording} type="button">Stop</button>
              </div>
              {recordingUrl && <audio controls src={recordingUrl} />}
            </div>
            <div className="panel">
              <h3>Self-Assessment</h3>
              <ul className="check-list">
                <li>Did you pronounce every vowel clearly?</li>
                <li>Did you pause at glottal stops?</li>
                <li>Did you avoid switching back to English?</li>
                <li>Did you save one correction in the mistake log?</li>
              </ul>
            </div>
          </section>
        )}

        {activeTab === "answers" && (
          <section className="two-column">
            <div className="panel">
              <div className="panel-title">
                <FileCheck2 size={20} />
                <h3>Activity Answers</h3>
              </div>
              <p className="section-copy">
                Use this after attempting the activities. These are self-check answers, not shortcuts.
              </p>
              <ol className="answer-list">
                {selected.answerKey.activities.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </div>
            <div className="panel">
              <div className="panel-title">
                <FileCheck2 size={20} />
                <h3>Homework Answers</h3>
              </div>
              <p className="section-copy">
                Check your homework here after completing the challenge tasks for Module {selected.id}.
              </p>
              <ol className="answer-list">
                {selected.answerKey.homework.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </div>
          </section>
        )}
      </section>
    </main>
  );
}
