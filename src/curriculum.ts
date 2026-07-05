export type Lesson = {
  title: string;
  objective: string;
  content: string[];
  activities: string[];
  practice: string[];
};

export type Module = {
  id: number;
  title: string;
  track: string;
  window: string;
  outcomes: string[];
  lessons: Lesson[];
  assignment: string;
};

export type Exam = {
  month: string;
  title: string;
  modules: string;
  format: string[];
  prompts: string[];
};

export type QuizQuestion = {
  id: string;
  type: "multiple-choice" | "short-answer" | "writing" | "speaking";
  prompt: string;
  answer?: string;
  options?: string[];
  rubric: string;
};

export type Flashcard = {
  id: string;
  front: string;
  back: string;
  category: string;
  track: string;
};

const foundationNotes = {
  intro: [
    "Samoan, or Gagana Samoa, is a Polynesian language spoken in Samoa, American Samoa, and Samoan communities around the world.",
    "The language is closely tied to family, church, village life, respect, oratory, and the cultural system often called fa'a Samoa.",
    "Modern written Samoan uses the Latin alphabet. Careful writing may include macrons for long vowels and a turned comma or apostrophe for the glottal stop.",
  ],
  alphabet: [
    "Core letters: a, e, i, o, u, f, g, l, m, n, p, s, t, v. H, k, and r are mainly used in loan words.",
    "The letter g is pronounced like ng in singer. The glottal stop is written as ʻ, often called koma liliu.",
    "Long vowels use macrons: ā, ē, ī, ō, ū. Vowel length can change meaning, so write it carefully.",
  ],
  greetings: [
    "Talofa - hello",
    "Talofa lava - warm/formal hello",
    "Mālō - hello, well done",
    "Tōfā soifua - goodbye",
    "Fa'amolemole - please",
    "Fa'afetai - thank you",
    "Tulou - excuse me",
  ],
  pronouns: [
    "aʻu - I, me",
    "oe - you",
    "ia - he, she, it",
    "matou - we, excluding you",
    "tatou - we, including you",
    "outou - you all",
    "latou - they",
  ],
  particles: [
    "Ou te alu. - I go / I am going.",
    "Na ou alu. - I went.",
    "O le a ou alu. - I will go.",
    "E lē ou te alu. - I am not going.",
    "O ai? - Who?",
    "O le ā? - What?",
    "O fea? - Where?",
  ],
  sentencePatterns: [
    "O loʻu igoa o ____. - My name is ____.",
    "Ou te fia aʻoaʻo le gagana Sāmoa. - I want to learn Samoan.",
    "O aʻu o se tagata aʻoga. - I am a student.",
    "E lelei le aso. - The day is good.",
    "Na ou faitau i le tusi. - I read the book.",
  ],
};

const modulePlan: Array<[number, string, string, string]> = [
  [1, "Introduction to Samoan", "Semester 1 - The Language", "Sep 2026"],
  [2, "Alphabet", "Semester 1 - The Language", "Oct 2026"],
  [3, "Reading", "Semester 1 - The Language", "Nov 2026"],
  [4, "Writing", "Semester 1 - The Language", "Dec 2026"],
  [5, "Basic Vocabulary", "Semester 1 - The Language", "Jan-Feb 2027"],
  [6, "Pronouns", "Semester 2 - Grammar", "Mar 2027"],
  [7, "Nouns", "Semester 2 - Grammar", "Mar 2027"],
  [8, "Articles", "Semester 2 - Grammar", "Apr 2027"],
  [9, "Verbs", "Semester 2 - Grammar", "Apr 2027"],
  [10, "Verb Markers", "Semester 2 - Grammar", "May 2027"],
  [11, "Tenses", "Semester 2 - Grammar", "May 2027"],
  [12, "Adjectives", "Semester 2 - Grammar", "Jun 2027"],
  [13, "Adverbs", "Semester 2 - Grammar", "Jun 2027"],
  [14, "Prepositions", "Semester 2 - Grammar", "Jul 2027"],
  [15, "Conjunctions", "Semester 2 - Grammar", "Jul 2027"],
  [16, "Question Words", "Semester 2 - Grammar", "Aug 2027"],
  [17, "Negatives", "Semester 2 - Grammar", "Aug 2027"],
  [18, "Possession", "Semester 2 - Grammar", "Aug 2027"],
  [19, "Numbers, Money, Dates, Time, Measurements", "Semester 2 - Grammar", "Aug 2027"],
  [20, "Simple Sentences", "Semester 3 - Sentence Construction", "Sep 2027"],
  [21, "Questions", "Semester 3 - Sentence Construction", "Sep 2027"],
  [22, "Commands", "Semester 3 - Sentence Construction", "Oct 2027"],
  [23, "Descriptions", "Semester 3 - Sentence Construction", "Oct 2027"],
  [24, "Opinions", "Semester 3 - Sentence Construction", "Dec 2027"],
  [25, "Comparisons", "Semester 3 - Sentence Construction", "Dec 2027"],
  [26, "Cause and Effect", "Semester 3 - Sentence Construction", "Jan 2028"],
  [27, "Complex Sentences", "Semester 3 - Sentence Construction", "Jan 2028"],
  [28, "Conversation Grammar", "Semester 3 - Sentence Construction", "Feb 2028"],
  [29, "One Sentence", "Semester 4 - Writing", "Mar 2028"],
  [30, "Five Sentences", "Semester 4 - Writing", "Mar 2028"],
  [31, "Paragraphs", "Semester 4 - Writing", "Apr 2028"],
  [32, "Descriptions", "Semester 4 - Writing", "Apr 2028"],
  [33, "Letters", "Semester 4 - Writing", "May 2028"],
  [34, "Diary Entries", "Semester 4 - Writing", "May 2028"],
  [35, "Stories", "Semester 4 - Writing", "Jul 2028"],
  [36, "Essays", "Semester 4 - Writing", "Jul 2028"],
  [37, "Translation English to Samoan and Samoan to English", "Semester 4 - Writing", "Jul 2028"],
  [38, "Beginner Listening", "Semester 5 - Listening", "Aug 2028"],
  [39, "Intermediate Listening", "Semester 5 - Listening", "Aug 2028"],
  [40, "Native Speed", "Semester 5 - Listening", "Aug 2028"],
  [41, "Music", "Semester 5 - Listening", "Aug 2028"],
  [42, "Movies", "Semester 5 - Listening", "Aug 2028"],
  [43, "Podcasts", "Semester 5 - Listening", "Aug 2028"],
  [44, "Interviews", "Semester 5 - Listening", "Aug 2028"],
  [45, "News", "Semester 5 - Listening", "Aug 2028"],
  [46, "Pronunciation", "Semester 6 - Speaking", "Sep 2028"],
  [47, "Shadowing", "Semester 6 - Speaking", "Sep 2028"],
  [48, "Role Play", "Semester 6 - Speaking", "Sep 2028"],
  [49, "Travel", "Semester 6 - Speaking", "Sep 2028"],
  [50, "Shopping", "Semester 6 - Speaking", "Sep 2028"],
  [51, "Restaurants", "Semester 6 - Speaking", "Sep 2028"],
  [52, "Making Friends", "Semester 6 - Speaking", "Sep 2028"],
  [53, "Dating", "Semester 6 - Speaking", "Sep 2028"],
  [54, "Professional Conversations", "Semester 6 - Speaking", "Sep 2028"],
  [55, "Storytelling", "Semester 6 - Speaking", "Sep 2028"],
  [56, "Public Speaking", "Semester 6 - Speaking", "Sep 2028"],
  [57, "Thinking in Samoan", "Semester 6 - Speaking", "Sep 2028"],
  [58, "Read Books", "Final Stage - Mastery", "Oct 2028"],
  [59, "Watch TV", "Final Stage - Mastery", "Oct 2028"],
  [60, "Understand Humor", "Final Stage - Mastery", "Oct 2028"],
  [61, "Understand Slang", "Final Stage - Mastery", "Oct 2028"],
  [62, "Regional Vocabulary", "Final Stage - Mastery", "Oct 2028"],
  [63, "Cultural Etiquette", "Final Stage - Mastery", "Oct 2028"],
  [64, "Religion", "Final Stage - Mastery", "Oct 2028"],
  [65, "Village Life", "Final Stage - Mastery", "Oct 2028"],
  [66, "Traditions", "Final Stage - Mastery", "Oct 2028"],
  [67, "Formal Speech", "Final Stage - Mastery", "Oct 2028"],
  [68, "Everyday Conversation", "Final Stage - Mastery", "Oct 2028"],
  [69, "Fluency Assessment", "Final Stage - Mastery", "Oct 2028"],
  [70, "Preparation for Samoa", "Final Stage - Mastery", "Oct 2028"],
];

const topicDetails: Record<number, string[]> = {
  1: foundationNotes.intro,
  2: foundationNotes.alphabet,
  3: ["Read open syllables aloud. Samoan syllables generally end in vowels.", "Separate new words into syllables before saying them at normal speed.", "Read short paragraphs aloud and mark words that need macrons or glottal stops."],
  4: ["Copy the alphabet with macrons and ʻ daily.", "Dictate words into a notebook, then check spelling and marks.", "Write every new word with an English gloss and one example sentence."],
  5: [...foundationNotes.greetings, "Vocabulary sets: family, numbers, food, animals, body, days, months, weather, colors, time, school, travel, nature."],
  6: foundationNotes.pronouns,
  10: foundationNotes.particles,
  11: foundationNotes.particles,
  16: ["O ai? - who?", "O le ā? - what?", "O fea? - where?", "Aiseā? - why?", "O afea? - when?", "E fia? - how many / how much?"],
  20: foundationNotes.sentencePatterns,
  37: ["Translate meaning, not word order.", "Keep a translation journal with source, draft, correction, and final version.", "Back-translate your Samoan into English to catch missing grammar."],
  46: ["Record yourself weekly.", "Check long vowels, glottal stops, stress, and the ng sound.", "Compare your recording to a native speaker sample before moving on."],
  57: ["Narrate routine actions in Samoan for ten minutes.", "Use circumlocution instead of switching to English.", "Keep a list of ideas you cannot yet express."],
  67: ["Study respectful speech and formal settings carefully.", "Do not improvise chiefly or ceremonial language without guidance.", "Ask a native speaker or tutor to review formal phrases before using them."],
  70: ["Airport, hotels, restaurants, emergencies, meeting people, road signs, culture, respect, and customs.", "Create travel scripts and rehearse them until they feel automatic.", "Prepare a personal phrasebook for arrival, transport, medical needs, and introductions."],
};

function createLessons(id: number, title: string): Lesson[] {
  const details = topicDetails[id] ?? [
    `Define the role of ${title.toLowerCase()} in Samoan communication.`,
    "Collect ten trustworthy examples from a dictionary, textbook, tutor, song, show, or native speaker.",
    "Turn the examples into active recall cards and original sentences.",
  ];

  return [
    {
      title: "Lesson 1 - Learn",
      objective: `Understand the core idea of ${title.toLowerCase()}.`,
      content: details,
      activities: [
        "Copy the key examples into your notebook and underline the Samoan structure.",
        "Say each example aloud slowly, then again at normal speed.",
        "Write one question you would ask a tutor or native speaker about this topic.",
      ],
      practice: ["Write a one-page note in your own words.", "Make 10 flashcards.", "Read all examples aloud three times."],
    },
    {
      title: "Lesson 2 - Pattern Practice",
      objective: `Use ${title.toLowerCase()} in controlled drills.`,
      content: [
        "Samoan practice should move from model sentences to substitutions, then to original speech.",
        "When writing, pay attention to word boundaries, glottal stops, vowel length, and repeated particles.",
        "Short accurate sentences are better than long sentences with unchecked grammar.",
      ],
      activities: [
        "Make a substitution table with five nouns, five verbs, and five time or question words.",
        "Create ten sentence pairs: English prompt on the left, Samoan attempt on the right.",
        "Mark every uncertain word with a question mark for later correction.",
      ],
      practice: ["Create 15 sentence substitutions.", "Translate 10 short English prompts.", "Correct mistakes in a red-pen pass."],
    },
    {
      title: "Lesson 3 - Production",
      objective: `Produce original Samoan using ${title.toLowerCase()}.`,
      content: ["Move from recognition to output.", "Use your own life, family, school, work, and travel plans as subject matter.", "Speak before writing when possible."],
      activities: [
        "Record yourself speaking for 60-90 seconds without reading full sentences.",
        "Write a cleaned-up version of what you said.",
        "Add at least three corrected phrases to your mistake log.",
      ],
      practice: ["Record a 60-second spoken response.", "Write 8 original sentences.", "Ask a speaker, tutor, or later AI review pass to mark errors."],
    },
    {
      title: "Lesson 4 - Review",
      objective: `Review ${title.toLowerCase()} until it is usable without notes.`,
      content: ["Retest old cards.", "Mix the topic with older modules.", "Keep only the mistakes in your weekly review list."],
      activities: [
        "Take a closed-notes mini test.",
        "Sort mistakes into pronunciation, vocabulary, grammar, and culture.",
        "Choose the weakest item and create a new drill for next week.",
      ],
      practice: ["Take a 15-minute quiz.", "Rewrite weak answers.", "Add three items to the next monthly test bank."],
    },
  ];
}

export const modules: Module[] = modulePlan.map(([id, title, track, window]) => ({
  id,
  title,
  track,
  window,
  outcomes: [
    `Explain ${title.toLowerCase()} without reading notes.`,
    `Recognize ${title.toLowerCase()} in real Samoan examples.`,
    `Use ${title.toLowerCase()} in speech or writing.`,
  ],
  lessons: createLessons(id, title),
  assignment:
    id < 20
      ? "Build a notebook page, 20 flashcards, and 10 corrected example sentences."
      : id < 38
        ? "Submit a short writing task, correction pass, and reflection on recurring errors."
        : id < 58
          ? "Record listening or speaking evidence and summarize what became easier."
          : "Create a mastery artifact: transcript, essay, conversation recording, or travel script.",
}));

export const exams: Exam[] = [
  {
    month: "November 2026",
    title: "Alphabet and Reading Check",
    modules: "1-3",
    format: ["Oral alphabet reading", "Pronunciation recording", "Short written quiz"],
    prompts: ["Read 20 words aloud.", "Explain macrons and the glottal stop.", "Syllable-break 10 unfamiliar words."],
  },
  {
    month: "February 2027",
    title: "Foundation Year Semester 1 Exam",
    modules: "1-5",
    format: ["Vocabulary test", "Dictation", "Reading aloud", "Short culture response"],
    prompts: ["Write 50 core words.", "Introduce yourself in Samoan.", "Read a beginner paragraph aloud."],
  },
  {
    month: "May 2027",
    title: "Grammar Midterm",
    modules: "6-11",
    format: ["Pronoun chart", "Verb marker drills", "Present, past, and future translation"],
    prompts: ["Translate 20 tense prompts.", "Write 10 sentences about your week.", "Explain inclusive and exclusive we."],
  },
  {
    month: "August 2027",
    title: "Foundation Year Final",
    modules: "6-19",
    format: ["Grammar exam", "Numbers and time practical", "Oral interview"],
    prompts: ["Ask and answer 12 questions.", "Describe a family photo.", "Write dates, prices, and times."],
  },
  {
    month: "November 2027",
    title: "Sentence Construction Check",
    modules: "20-24",
    format: ["Sentence writing", "Question formation", "Command and opinion prompts"],
    prompts: ["Write 25 simple sentences.", "Turn 10 statements into questions.", "Record a two-minute opinion."],
  },
  {
    month: "February 2028",
    title: "Year Two Semester 3 Exam",
    modules: "20-28",
    format: ["Complex sentence test", "Conversation grammar role play", "Error correction"],
    prompts: ["Explain cause and effect.", "Compare two people or places.", "Hold a four-minute guided conversation."],
  },
  {
    month: "May 2028",
    title: "Writing Midterm",
    modules: "29-34",
    format: ["Paragraph writing", "Letter writing", "Diary entry"],
    prompts: ["Write five polished sentences.", "Write a personal letter.", "Keep a seven-day diary sample."],
  },
  {
    month: "July 2028",
    title: "Year Two Writing Final",
    modules: "29-37",
    format: ["Story", "Essay", "Two-way translation"],
    prompts: ["Write a 300-word essay draft.", "Translate a short English text.", "Back-translate your Samoan draft."],
  },
  {
    month: "August 2028",
    title: "Listening Midterm",
    modules: "38-40",
    format: ["Dictation", "Slow and native-speed comprehension", "Summary"],
    prompts: ["Transcribe 60 seconds of clear audio.", "Summarize a native-speed clip.", "List new vocabulary by topic."],
  },
  {
    month: "August 2028",
    title: "Listening Final",
    modules: "38-45",
    format: ["Music, interview, and news comprehension", "Transcript correction", "Oral summary"],
    prompts: ["Summarize a news clip.", "Explain the main idea of an interview.", "Identify unknown words from context."],
  },
  {
    month: "September 2028",
    title: "Speaking Midterm",
    modules: "46-51",
    format: ["Pronunciation", "Shadowing", "Travel, shopping, and restaurant role play"],
    prompts: ["Record a shadowing sample.", "Order food politely.", "Solve a travel problem in Samoan."],
  },
  {
    month: "September 2028",
    title: "Speaking Final",
    modules: "46-57",
    format: ["Conversation", "Storytelling", "Public speaking", "Thinking-in-Samoan log"],
    prompts: ["Tell a five-minute story.", "Give a short prepared talk.", "Complete a no-English thinking session."],
  },
  {
    month: "October 2028",
    title: "Fluency and Samoa Readiness Assessment",
    modules: "58-70",
    format: ["Reading portfolio", "Listening portfolio", "Conversation exam", "Travel simulation"],
    prompts: ["Read and discuss a real text.", "Understand a real media clip.", "Complete airport, hotel, emergency, and social scripts."],
  },
];

export const studyRules = [
  "Study five days per week: two input days, two output days, one review/test day.",
  "Every module must produce evidence: notes, cards, writing, audio, correction, or a test result.",
  "Keep a mistake log. Repeated mistakes become next week's drills.",
  "Use native speaker review whenever possible, especially for pronunciation, culture, and formal speech.",
  "Do not move to the next exam until old errors have been corrected and retested.",
];

export const sources = [
  {
    label: "Samoan language overview",
    url: "https://en.wikipedia.org/wiki/Samoan_language",
  },
  {
    label: "Koma liliu / glottal stop overview",
    url: "https://en.wikipedia.org/wiki/%CA%BBOkina",
  },
];

const cardSeed: Array<[string, string, string, string, string]> = [
  ["greeting-talofa", "Talofa", "Hello", "Greetings", "Semester 1 - The Language"],
  ["greeting-faafetai", "Fa'afetai", "Thank you", "Greetings", "Semester 1 - The Language"],
  ["greeting-faamolemole", "Fa'amolemole", "Please", "Greetings", "Semester 1 - The Language"],
  ["greeting-tofa", "Tofa soifua", "Goodbye", "Greetings", "Semester 1 - The Language"],
  ["family-aiga", "Aiga", "Family", "Family", "Semester 1 - The Language"],
  ["family-tina", "Tina", "Mother", "Family", "Semester 1 - The Language"],
  ["family-tama", "Tama", "Father / boy", "Family", "Semester 1 - The Language"],
  ["family-tuafafine", "Tuafafine", "Sister of a male", "Family", "Semester 1 - The Language"],
  ["family-tuagane", "Tuagane", "Brother of a female", "Family", "Semester 1 - The Language"],
  ["school-aoga", "Aoga", "School / study", "School", "Semester 1 - The Language"],
  ["food-vai", "Vai", "Water", "Food", "Semester 1 - The Language"],
  ["food-meaai", "Mea'ai", "Food", "Food", "Semester 1 - The Language"],
  ["number-tasi", "Tasi", "One", "Numbers", "Semester 1 - The Language"],
  ["number-lua", "Lua", "Two", "Numbers", "Semester 1 - The Language"],
  ["number-tolu", "Tolu", "Three", "Numbers", "Semester 1 - The Language"],
  ["color-mumu", "Mumu", "Red", "Colors", "Semester 1 - The Language"],
  ["color-paepae", "Pa'epa'e", "White", "Colors", "Semester 1 - The Language"],
  ["weather-aso", "Aso", "Day", "Weather and Time", "Semester 1 - The Language"],
  ["pronoun-au", "A'u", "I / me", "Pronouns", "Semester 2 - Grammar"],
  ["pronoun-oe", "Oe", "You", "Pronouns", "Semester 2 - Grammar"],
  ["pronoun-ia", "Ia", "He / she / it", "Pronouns", "Semester 2 - Grammar"],
  ["pronoun-matou", "Matou", "We, excluding you", "Pronouns", "Semester 2 - Grammar"],
  ["pronoun-tatou", "Tatou", "We, including you", "Pronouns", "Semester 2 - Grammar"],
  ["pronoun-latou", "Latou", "They", "Pronouns", "Semester 2 - Grammar"],
  ["verb-alu", "Alu", "Go", "Verbs", "Semester 2 - Grammar"],
  ["verb-sau", "Sau", "Come", "Verbs", "Semester 2 - Grammar"],
  ["verb-faitau", "Faitau", "Read / count", "Verbs", "Semester 2 - Grammar"],
  ["verb-tautala", "Tautala", "Speak", "Verbs", "Semester 2 - Grammar"],
  ["time-past", "Na ou alu.", "I went.", "Verb Markers", "Semester 2 - Grammar"],
  ["time-present", "Ou te alu.", "I go / I am going.", "Verb Markers", "Semester 2 - Grammar"],
  ["time-future", "O le a ou alu.", "I will go.", "Verb Markers", "Semester 2 - Grammar"],
  ["question-who", "O ai?", "Who?", "Questions", "Semester 2 - Grammar"],
  ["question-where", "O fea?", "Where?", "Questions", "Semester 2 - Grammar"],
  ["question-when", "O afea?", "When?", "Questions", "Semester 2 - Grammar"],
  ["sentence-name", "O lo'u igoa o __.", "My name is __.", "Sentences", "Semester 3 - Sentence Construction"],
  ["sentence-learn", "Ou te fia aoao le gagana Samoa.", "I want to learn Samoan.", "Sentences", "Semester 3 - Sentence Construction"],
  ["sentence-student", "O a'u o se tagata aoga.", "I am a student.", "Sentences", "Semester 3 - Sentence Construction"],
  ["sentence-good-day", "E lelei le aso.", "The day is good.", "Descriptions", "Semester 3 - Sentence Construction"],
  ["sentence-read-book", "Na ou faitau i le tusi.", "I read the book.", "Sentences", "Semester 3 - Sentence Construction"],
  ["command-come", "Sau iinei.", "Come here.", "Commands", "Semester 3 - Sentence Construction"],
  ["opinion-like", "Ou te fiafia i le musika.", "I like the music.", "Opinions", "Semester 3 - Sentence Construction"],
  ["because-aua", "Aua", "Because", "Cause and Effect", "Semester 3 - Sentence Construction"],
  ["writing-tusi", "Tusi", "Book / letter / write", "Writing", "Semester 4 - Writing"],
  ["writing-parakalafa", "Parakalafa", "Paragraph", "Writing", "Semester 4 - Writing"],
  ["writing-tala", "Tala", "Story / news", "Writing", "Semester 4 - Writing"],
  ["writing-api", "Api", "Notebook", "Writing", "Semester 4 - Writing"],
  ["translation-meaning", "Translate meaning, not word order.", "Translation principle", "Translation", "Semester 4 - Writing"],
  ["diary-today", "O le aso...", "Today is...", "Diary", "Semester 4 - Writing"],
  ["letter-dear", "Lau pele...", "Dear...", "Letters", "Semester 4 - Writing"],
  ["essay-intro", "Muamua", "First / firstly", "Essays", "Semester 4 - Writing"],
  ["listen-faalogo", "Faalogo", "Listen", "Listening", "Semester 5 - Listening"],
  ["listen-pese", "Pese", "Song", "Listening", "Semester 5 - Listening"],
  ["listen-tala-fou", "Tala fou", "News", "Listening", "Semester 5 - Listening"],
  ["listen-faatalanoaga", "Faatalanoaga", "Interview / discussion", "Listening", "Semester 5 - Listening"],
  ["listen-malamalama", "Malamalama", "Understand / light", "Listening", "Semester 5 - Listening"],
  ["listen-televise", "Televise", "Television", "Listening", "Semester 5 - Listening"],
  ["listen-leo", "Leo", "Voice", "Listening", "Semester 5 - Listening"],
  ["speak-tautala", "Tautala", "Speak", "Speaking", "Semester 6 - Speaking"],
  ["speak-fesili", "Fesili", "Question / ask", "Speaking", "Semester 6 - Speaking"],
  ["speak-tali", "Tali", "Answer / respond", "Speaking", "Semester 6 - Speaking"],
  ["travel-malaevaalele", "Malaevaalele", "Airport", "Travel", "Semester 6 - Speaking"],
  ["travel-faletalimalo", "Faletalimalo", "Hotel", "Travel", "Semester 6 - Speaking"],
  ["restaurant-faleaiga", "Faleaiga", "Restaurant", "Restaurants", "Semester 6 - Speaking"],
  ["shopping-faleoloa", "Faleoloa", "Shop / store", "Shopping", "Semester 6 - Speaking"],
  ["friend-uo", "Uo", "Friend", "Conversation", "Semester 6 - Speaking"],
  ["mastery-aganuu", "Aganuu", "Culture / customs", "Culture", "Final Stage - Mastery"],
  ["mastery-faaaloalo", "Faaaloalo", "Respect", "Culture", "Final Stage - Mastery"],
  ["mastery-nuu", "Nuu", "Village", "Village Life", "Final Stage - Mastery"],
  ["mastery-lotu", "Lotu", "Church / religion / prayer", "Religion", "Final Stage - Mastery"],
  ["mastery-malie", "Malie", "Funny / agreeable / good", "Humor", "Final Stage - Mastery"],
  ["mastery-faasamoa", "Faa Samoa", "The Samoan way", "Culture", "Final Stage - Mastery"],
  ["mastery-faalavelave", "Faalavelave", "Important family/community obligation", "Culture", "Final Stage - Mastery"],
  ["mastery-fono", "Fono", "Meeting / council", "Formal Speech", "Final Stage - Mastery"],
];

export const starterFlashcards: Flashcard[] = cardSeed.map(([id, front, back, category, track]) => ({
  id,
  front,
  back,
  category,
  track,
}));

export const quizBank: QuizQuestion[] = [
  {
    id: "alphabet-letters",
    type: "short-answer",
    prompt: "List the core Samoan alphabet letters used in native words.",
    answer: "a, e, i, o, u, f, g, l, m, n, p, s, t, v",
    rubric: "Check that all five vowels and nine common consonants are present.",
  },
  {
    id: "glottal-stop",
    type: "multiple-choice",
    prompt: "What does the turned comma in Samoan writing usually mark?",
    options: ["A glottal stop", "A question", "A plural noun", "A future verb"],
    answer: "A glottal stop",
    rubric: "The turned comma marks a glottal stop and should be pronounced carefully.",
  },
  {
    id: "pronoun-inclusive",
    type: "multiple-choice",
    prompt: "Which pronoun means 'we' including the person being spoken to?",
    options: ["matou", "tatou", "latou", "outou"],
    answer: "tatou",
    rubric: "Tatou is inclusive we; matou excludes the listener.",
  },
  {
    id: "present-marker",
    type: "short-answer",
    prompt: "Translate: Ou te alu.",
    answer: "I go / I am going.",
    rubric: "Accept a present or present-progressive meaning.",
  },
  {
    id: "past-marker",
    type: "short-answer",
    prompt: "Translate: Na ou alu.",
    answer: "I went.",
    rubric: "The marker na places the action in the past.",
  },
  {
    id: "future-marker",
    type: "short-answer",
    prompt: "Translate: O le a ou alu.",
    answer: "I will go.",
    rubric: "The phrase o le a marks future action.",
  },
  {
    id: "question-words",
    type: "short-answer",
    prompt: "Write three Samoan question words or question phrases with English meanings.",
    rubric: "Examples include O ai, O le a, O fea, Aisea, O afea, and E fia.",
  },
  {
    id: "sentence-intro",
    type: "writing",
    prompt: "Write a five-sentence introduction about yourself in Samoan.",
    rubric: "Use greeting, name, where you are from, what you study, and one personal detail.",
  },
  {
    id: "translation-basic",
    type: "writing",
    prompt: "Translate into Samoan: I want to learn the Samoan language.",
    answer: "Ou te fia aoao le gagana Samoa.",
    rubric: "Check the intent, verb phrase, and word order. Native-speaker review is best.",
  },
  {
    id: "speaking-reading",
    type: "speaking",
    prompt: "Record yourself reading five flashcards and one full sentence aloud.",
    rubric: "Listen for vowels, glottal stops, rhythm, and hesitation. Save notes in the mistake log.",
  },
];

export const weeklyTemplate = [
  "Input: read the lesson and collect examples.",
  "Vocabulary: review due cards and add new ones.",
  "Grammar: complete controlled drills.",
  "Output: write or speak original sentences.",
  "Assessment: quiz, correction pass, and mistake log update.",
];
