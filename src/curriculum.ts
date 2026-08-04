export type Lesson = {
  title: string;
  topic: string;
  objective: string;
  priorKnowledge: string[];
  keyConcepts: string[];
  explanation: string[];
  examples: string[];
  realLifeApplication: string[];
  demonstration: string[];
  activities: string[];
  assessment: string[];
  summary: string[];
};

export type Module = {
  id: number;
  title: string;
  track: string;
  window: string;
  outcomes: string[];
  lessons: Lesson[];
  assignment: string;
  homework: string[];
  answerKey: {
    activities: string[];
    homework: string[];
  };
};

export type Exam = {
  checkpoint: string;
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
    "This course starts with the sound system, alphabet, reading, writing, and basic vocabulary before moving into grammar.",
    "After grammar, the course moves into sentence construction, writing, translation, listening, speaking, and real conversation.",
    "The final stage focuses on cultural understanding, formal speech awareness, everyday conversation, and practical preparation for Samoa.",
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
  [1, "Introduction to Samoan", "Semester 1 - The Language", "Foundation phase"],
  [2, "Alphabet", "Semester 1 - The Language", "Foundation phase"],
  [3, "Pronunciation and Sounds", "Semester 1 - The Language", "Foundation phase"],
  [4, "Long Vowels and Glottal Stop", "Semester 1 - The Language", "Foundation phase"],
  [5, "Syllables and Stress", "Semester 1 - The Language", "Foundation phase"],
  [6, "Reading Samoan Words", "Semester 2 - Grammar", "Grammar phase"],
  [7, "Writing Samoan Carefully", "Semester 2 - Grammar", "Grammar phase"],
  [8, "Core Vocabulary Sets", "Semester 2 - Grammar", "Grammar phase"],
  [9, "Pronouns", "Semester 2 - Grammar", "Grammar phase"],
  [10, "Nouns and Articles", "Semester 2 - Grammar", "Grammar phase"],
  [11, "Verbs and Verb Markers", "Semester 2 - Grammar", "Grammar phase"],
  [12, "Present, Past, and Future", "Semester 2 - Grammar", "Grammar phase"],
  [13, "Adjectives and Adverbs", "Semester 2 - Grammar", "Grammar phase"],
  [14, "Prepositions", "Semester 2 - Grammar", "Grammar phase"],
  [15, "Conjunctions", "Semester 2 - Grammar", "Grammar phase"],
  [16, "Question Words", "Semester 2 - Grammar", "Grammar phase"],
  [17, "Negatives", "Semester 2 - Grammar", "Grammar phase"],
  [18, "Possession", "Semester 2 - Grammar", "Grammar phase"],
  [19, "Numbers, Money, Time, Measurements", "Semester 2 - Grammar", "Grammar phase"],
  [20, "Simple Sentences", "Semester 3 - Sentence Construction", "Sentence phase"],
  [21, "Questions", "Semester 3 - Sentence Construction", "Sentence phase"],
  [22, "Commands", "Semester 3 - Sentence Construction", "Sentence phase"],
  [23, "Descriptions", "Semester 3 - Sentence Construction", "Sentence phase"],
  [24, "Opinions", "Semester 3 - Sentence Construction", "Sentence phase"],
  [25, "Comparisons", "Semester 3 - Sentence Construction", "Sentence phase"],
  [26, "Cause and Effect", "Semester 3 - Sentence Construction", "Sentence phase"],
  [27, "Complex Sentences", "Semester 3 - Sentence Construction", "Sentence phase"],
  [28, "Conversation Grammar", "Semester 3 - Sentence Construction", "Sentence phase"],
  [29, "One Sentence", "Semester 4 - Writing", "Writing phase"],
  [30, "Five Sentences", "Semester 4 - Writing", "Writing phase"],
  [31, "Paragraphs", "Semester 4 - Writing", "Writing phase"],
  [32, "Descriptions", "Semester 4 - Writing", "Writing phase"],
  [33, "Letters", "Semester 4 - Writing", "Writing phase"],
  [34, "Diary Entries", "Semester 4 - Writing", "Writing phase"],
  [35, "Stories", "Semester 4 - Writing", "Writing phase"],
  [36, "Personal Reflections", "Semester 4 - Writing", "Writing phase"],
  [37, "Translation English to Samoan and Samoan to English", "Semester 4 - Writing", "Writing phase"],
  [38, "Beginner Listening", "Semester 5 - Listening", "Listening phase"],
  [39, "Intermediate Listening", "Semester 5 - Listening", "Listening phase"],
  [40, "Native Speed", "Semester 5 - Listening", "Listening phase"],
  [41, "Music", "Semester 5 - Listening", "Listening phase"],
  [42, "Movies", "Semester 5 - Listening", "Listening phase"],
  [43, "Podcasts", "Semester 5 - Listening", "Listening phase"],
  [44, "Interviews", "Semester 5 - Listening", "Listening phase"],
  [45, "News", "Semester 5 - Listening", "Listening phase"],
  [46, "Pronunciation", "Semester 6 - Speaking", "Speaking phase"],
  [47, "Shadowing", "Semester 6 - Speaking", "Speaking phase"],
  [48, "Role Play", "Semester 6 - Speaking", "Speaking phase"],
  [49, "Travel", "Semester 6 - Speaking", "Speaking phase"],
  [50, "Shopping", "Semester 6 - Speaking", "Speaking phase"],
  [51, "Restaurants", "Semester 6 - Speaking", "Speaking phase"],
  [52, "Making Friends", "Semester 6 - Speaking", "Speaking phase"],
  [53, "Dating", "Semester 6 - Speaking", "Speaking phase"],
  [54, "Professional Conversations", "Semester 6 - Speaking", "Speaking phase"],
  [55, "Storytelling", "Semester 6 - Speaking", "Speaking phase"],
  [56, "Public Speaking", "Semester 6 - Speaking", "Speaking phase"],
  [57, "Thinking in Samoan", "Semester 6 - Speaking", "Speaking phase"],
  [58, "Read Books", "Final Stage - Mastery", "Mastery phase"],
  [59, "Watch TV", "Final Stage - Mastery", "Mastery phase"],
  [60, "Understand Humor", "Final Stage - Mastery", "Mastery phase"],
  [61, "Understand Slang", "Final Stage - Mastery", "Mastery phase"],
  [62, "Regional Vocabulary", "Final Stage - Mastery", "Mastery phase"],
  [63, "Cultural Etiquette", "Final Stage - Mastery", "Mastery phase"],
  [64, "Religion", "Final Stage - Mastery", "Mastery phase"],
  [65, "Village Life", "Final Stage - Mastery", "Mastery phase"],
  [66, "Traditions", "Final Stage - Mastery", "Mastery phase"],
  [67, "Formal Speech", "Final Stage - Mastery", "Mastery phase"],
  [68, "Everyday Conversation", "Final Stage - Mastery", "Mastery phase"],
  [69, "Fluency Assessment", "Final Stage - Mastery", "Mastery phase"],
  [70, "Preparation for Samoa", "Final Stage - Mastery", "Mastery phase"],
];

const topicDetails: Record<number, string[]> = {
  1: foundationNotes.intro,
  2: foundationNotes.alphabet,
  3: ["Read open syllables aloud. Samoan syllables generally end in vowels.", "Separate new words into syllables before saying them at normal speed.", "Read short paragraphs aloud and mark words that need macrons or glottal stops."],
  4: ["Copy the alphabet with macrons and ʻ daily.", "Dictate words into a notebook, then check spelling and marks.", "Write every new word with an English gloss and one example sentence."],
  5: [...foundationNotes.greetings, "Vocabulary sets: family, numbers, food, animals, body, weather, colors, time, school, travel, nature."],
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

const lessonPacks: Record<number, Partial<Lesson>> = {
  1: {
    objective: "Understand what Samoan is, where the course is going, and what skills you will build first.",
    explanation: [
      "Samoan is a Polynesian language known as Gagana Samoa. It is used in Samoa, American Samoa, and Samoan communities around the world.",
      "This course begins slowly. First you learn the language system: alphabet, sounds, vowel length, glottal stop, syllables, and stress.",
      "After the sound system, the course moves into reading, careful writing, useful vocabulary, grammar, sentences, listening, speaking, culture, and practical use.",
      "The goal is not to memorize random phrases. The goal is to understand how Samoan works well enough to build your own correct sentences and understand real speech over time.",
    ],
    examples: [
      "Course path: sounds -> syllables -> words -> grammar -> sentences -> writing -> listening -> speaking -> culture.",
      "A beginner goal: recognize and pronounce Samoan words carefully.",
      "A later goal: hold a natural conversation and understand everyday Samoan media.",
    ],
    realLifeApplication: [
      "A clear course path helps you avoid jumping randomly between apps, phrases, and videos.",
      "Knowing what comes next makes it easier to measure progress like a school subject.",
      "This introduction prepares you to treat Samoan with respect as a real language connected to people and culture.",
    ],
  },
  2: {
    objective: "Learn the Samoan alphabet and pronounce every core letter clearly.",
    explanation: [
      "The core Samoan alphabet taught to beginners has 14 letters.",
      "Modern Samoan uses a Latin-based alphabet. The common native-letter set is usually taught as five vowels and nine consonants: a, e, i, o, u, f, g, l, m, n, p, s, t, v.",
      "The letters h, k, and r may appear in loanwords or certain contexts, but the core beginner alphabet should be learned first.",
      "The Samoan letter g is pronounced like the ng sound in English singer, not like the g in go.",
      "Samoan spelling is more sound-based than English spelling. Careful pronunciation begins with learning the letter sounds clearly.",
    ],
    examples: [
      "A - ah - aso means day",
      "E - eh - eleele means earth or dirt",
      "I - ee - i'a means fish",
      "O - oh - ofa/alofa means love",
      "U - oo - ula means necklace or red",
      "F - f - fale means house",
      "G - ng - gagana means language",
      "L - l - lima means hand or five",
      "M - m - mata means eye or face",
      "N - n - nuu means village",
      "P - p - povi means cow",
      "S - s - sami means sea",
      "T - t - tama means boy or father",
      "V - v - vai means water",
    ],
    realLifeApplication: [
      "The alphabet helps you read names, signs, songs, prayers, subtitles, and dictionary entries.",
      "Recognizing letters accurately prevents you from building bad pronunciation habits early.",
      "Alphabet mastery makes later reading and spelling less intimidating.",
    ],
  },
  3: {
    objective: "Pronounce basic Samoan sounds clearly, especially vowels and the g/ng sound.",
    explanation: [
      "Samoan pronunciation depends strongly on clean vowels. Avoid reducing vowels the way English often does.",
      "Practice each vowel separately before combining vowels with consonants.",
      "The g sound is produced like ng in singer. It should not become a hard English g.",
      "Early pronunciation practice should be slow. Speed comes after clarity.",
    ],
    examples: ["ma, me, mi, mo, mu", "fa, fe, fi, fo, fu", "ga, ge, gi, go, gu with g as ng"],
    realLifeApplication: [
      "Clear sounds help people understand you even when your vocabulary is still small.",
      "Pronunciation practice prepares you for listening because you recognize sounds you can produce.",
      "Recording yourself helps you notice English habits that interfere with Samoan.",
    ],
  },
  4: {
    objective: "Understand that vowel length and the glottal stop can change pronunciation and sometimes meaning.",
    explanation: [
      "A macron over a vowel marks a long vowel: ā, ē, ī, ō, ū. A long vowel is held longer than a short vowel.",
      "The glottal stop is a catch or break in the voice. In Samoan learning materials it may be shown with a turned comma or apostrophe.",
      "Some sources mark macrons and glottal stops carefully, while casual writing may omit them. As a learner, copy the marks when your source provides them.",
      "Do not guess marks from memory. If unsure, mark the word for review and check it against a reliable dictionary or course source.",
    ],
    examples: ["a versus ā", "o versus ō", "fa'a often shows a glottal stop after fa"],
    realLifeApplication: [
      "Careful marks help you pronounce names and words respectfully.",
      "Long vowels and glottal stops train your ear for real speech.",
      "This module prepares you to read more accurate learning materials.",
    ],
  },
  5: {
    objective: "Break Samoan words into simple syllables and practice natural stress without rushing.",
    explanation: [
      "Samoan words are often easier to pronounce when you break them into syllables.",
      "Many syllables are open, meaning they end in a vowel. This gives Samoan a clear vowel rhythm.",
      "Stress and rhythm should be learned from audio when possible. As a beginner, pronounce every vowel clearly and avoid swallowing endings.",
      "Syllable practice is the bridge between alphabet knowledge and reading whole words.",
    ],
    examples: ["ta-lo-fa", "Sa-mo-a", "fa'a-fe-tai", "a-lo-fa"],
    realLifeApplication: [
      "Syllable practice makes long words less scary.",
      "Breaking words apart helps with spelling, pronunciation, and listening.",
      "This skill prepares you for reading Samoan words in Module 6.",
    ],
  },
  9: {
    objective: "Recognize common Samoan pronouns and understand inclusive and exclusive 'we'.",
    explanation: [
      "Samoan pronouns include basic forms such as a'u, oe, ia, matou, tatou, outou, and latou.",
      "A major idea for English speakers is the difference between inclusive and exclusive we. Tatou includes the person being spoken to; matou excludes that person.",
      "Pronouns appear in many simple sentence patterns and become important when speaking about yourself, other people, and groups.",
    ],
    examples: ["a'u - I / me", "oe - you", "ia - he / she / it", "matou - we excluding you", "tatou - we including you"],
    realLifeApplication: [
      "Pronouns let you introduce yourself, talk about family, and understand who is included in a plan.",
      "Inclusive and exclusive we helps avoid confusion in group conversation.",
    ],
  },
  11: {
    objective: "Recognize simple verb phrases and common markers used around verbs.",
    explanation: [
      "Samoan verbs do not work like English verbs with many endings. Meaning is often shown by words or markers around the verb.",
      "A beginner can start with patterns such as Ou te alu, Na ou alu, and O le a ou alu.",
      "Do not over-translate word by word. Learn the full pattern and what it does.",
    ],
    examples: ["Ou te alu. - I go / I am going.", "Na ou alu. - I went.", "O le a ou alu. - I will go."],
    realLifeApplication: [
      "Verb markers help you talk about what you do, did, and will do.",
      "These patterns are useful for diary entries, travel plans, and conversations.",
    ],
  },
};

function createActivities(id: number, title: string): string[] {
  const fallback = [
    `${id}.1 Read the examples aloud three times. Cover the English and try to remember the meaning.`,
    `${id}.2 Copy five examples and underline the word or pattern that belongs to this module.`,
    `${id}.3 Match five Samoan items from the lesson with their English meanings.`,
    `${id}.4 Write five short original examples using only words or patterns you have already studied.`,
    `${id}.5 Complete a self-check: mark each example as easy, unsure, or needs review.`,
  ];

  const byId: Record<number, string[]> = {
    1: [
      "1.1 Read the two introduction paragraphs aloud once.",
      "1.2 Circle the skills you will study first: alphabet, sounds, long vowels, glottal stop, syllables.",
      "1.3 Put these course stages in order: speaking, alphabet, sentences, listening, syllables.",
      "1.4 Write one sentence saying what you want to do with Samoan as you become well informed.",
      "1.5 Choose the first three habits you will use: notebook, flashcards, recording, review, tests.",
    ],
    2: [
      "2.1 Read the Samoan alphabet aloud three times: A E I O U F G L M N P S T V.",
      "2.2 Separate these letters into vowels and consonants: A M O T U F E.",
      "2.3 Circle every vowel in these words: TALO, FALE, SAMOA, ALOFA.",
      "2.4 Read these words aloud: fale, tama, sami, vai, alofa.",
      "2.5 Write each Samoan letter five times while saying its sound.",
    ],
    3: [
      "3.1 Say each vowel clearly: a, e, i, o, u.",
      "3.2 Read these syllables aloud: ma, me, mi, mo, mu.",
      "3.3 Read these syllables aloud with f: fa, fe, fi, fo, fu.",
      "3.4 Practise g as ng: ga, ge, gi, go, gu.",
      "3.5 Record yourself reading: mala, fale, sami, tagata, gagana.",
    ],
    4: [
      "4.1 Read each pair and hold the marked vowel longer: a / ā, e / ē, i / ī, o / ō, u / ū.",
      "4.2 Put a check next to the words that show a glottal stop: fa'a, i'a, tama, alofa.",
      "4.3 Clap once for each syllable in: fa'a-fe-tai, i'a, Sa-mo-a.",
      "4.4 Copy these marks carefully: ā, ē, ī, ō, ū, '.",
      "4.5 Read aloud slowly: fa'a Samoa, i'a, fa'afetai.",
    ],
    5: [
      "5.1 Break these words into syllables: talofa, Samoa, alofa, faafetai.",
      "5.2 Read each syllable separately, then read the whole word.",
      "5.3 Count the syllables in: tama, fale, tagata, faamolemole.",
      "5.4 Write five Samoan words and draw slashes between syllables.",
      "5.5 Read your five words aloud without rushing the final vowel.",
    ],
    9: [
      "9.1 Match pronouns: a'u, oe, ia, matou, tatou, outou, latou.",
      "9.2 Choose matou or tatou: 'we, including you' and 'we, excluding you'.",
      "9.3 Circle the pronoun in: O a'u o se tagata aoga.",
      "9.4 Replace the English pronoun with Samoan: I, you, they, we including you.",
      "9.5 Write five short labels: a'u = I, oe = you, etc.",
    ],
    11: [
      "11.1 Match the sentence to time: Ou te alu, Na ou alu, O le a ou alu.",
      "11.2 Circle the verb in each sentence: alu, sau, faitau.",
      "11.3 Change 'Ou te alu' to past using Na.",
      "11.4 Change 'Na ou alu' to future using O le a.",
      "11.5 Read all three model sentences aloud until they feel automatic.",
    ],
  };

  if (title.includes("Question")) {
    return [
      `${id}.1 Match: O ai? = who, O fea? = where, O afea? = when, E fia? = how many/how much.`,
      `${id}.2 Choose the correct question phrase for a person, place, time, and number.`,
      `${id}.3 Turn three English prompts into Samoan question prompts using the lesson examples.`,
      `${id}.4 Read the questions aloud and mark the word that makes it a question.`,
      `${id}.5 Answer each question in English to prove you understand it.`,
    ];
  }

  if (title.includes("Numbers")) {
    return [
      `${id}.1 Write numbers 1-10 in Samoan from your notes.`,
      `${id}.2 Match numbers to prices, times, and measurements.`,
      `${id}.3 Read five numbers aloud slowly.`,
      `${id}.4 Write three pretend prices and three pretend measurements.`,
      `${id}.5 Check whether each number is useful for travel, shopping, or time.`,
    ];
  }

  return fallback;
}

function createAssessment(id: number, title: string): string[] {
  const byId: Record<number, string[]> = {
    2: [
      "Can you name all 14 core Samoan letters?",
      "Can you separate vowels from consonants?",
      "Can you pronounce g as ng?",
      "Can you identify vowels inside simple Samoan words?",
      "Can you read five simple words aloud?",
    ],
    3: [
      "Can you pronounce all five vowels clearly?",
      "Can you read ma, me, mi, mo, mu without changing the vowel sounds?",
      "Can you pronounce g as ng in gagana?",
      "Can you hear the difference between careful and rushed pronunciation?",
      "Can you read five beginner words aloud?",
    ],
    9: [
      "Can you identify a'u, oe, ia, matou, tatou, outou, and latou?",
      "Can you explain the difference between matou and tatou?",
      "Can you choose the right pronoun for I, you, and they?",
      "Can you spot a pronoun in a simple sentence?",
      "Can you make five pronoun flashcards?",
    ],
  };

  return (
    byId[id] ?? [
      `Can you recognize ${title.toLowerCase()} in lesson examples?`,
      `Can you match ${title.toLowerCase()} examples to their meanings?`,
      `Can you complete five practice items about ${title.toLowerCase()}?`,
      "Can you correct one mistake from your own work?",
      "Can you move weak items into weekly review?",
    ]
  );
}

function createLessons(id: number, title: string): Lesson[] {
  const pack = lessonPacks[id];
  const details = topicDetails[id] ?? [
    `${title} helps you understand or produce a specific part of Samoan communication.`,
    "The lesson examples should be copied exactly before you create your own examples.",
    "Use the examples to practise recognition first, then production.",
  ];

  return [
    {
      title: `${title} Lesson`,
      topic: title,
      objective:
        pack?.objective ??
        (id === 1
          ? "Understand what Samoan is and what this course will teach first."
          : `Learn ${title.toLowerCase()} well enough to recognize it, practise it, and use it in simple Samoan tasks.`),
      priorKnowledge:
        id === 1
          ? [
              "What languages do you already speak, and how did you learn them?",
              "What parts of language learning feel familiar: sounds, vocabulary, grammar, reading, writing, listening, or speaking?",
              "Where do you expect to use Samoan: family, travel, culture, church, study, friendship, or everyday conversation?",
            ]
          : [
              `What do you already know about ${title.toLowerCase()} from English or another language you speak?`,
              "Which words, phrases, or grammar points from earlier modules might connect to this topic?",
              "What would you need to ask a Samoan speaker to check whether your understanding is natural?",
            ],
      keyConcepts:
        id === 1
          ? [
              "The course moves from sounds and letters to words, grammar, sentences, writing, listening, speaking, culture, and practical use.",
              "Fluency is built through repeated input, output, correction, and review rather than one-time memorization.",
              "Samoan learning should include respect for culture and awareness that formal speech needs native-speaker guidance.",
            ]
          : [
              `${title} is studied as a usable language skill, not only as a definition to memorize.`,
              "Accuracy matters: spelling, word order, particles, vowel length, and pronunciation can affect meaning.",
              "The goal is to recognize the pattern, use it in controlled examples, then use it in your own speech or writing.",
            ],
      explanation: pack?.explanation ??
        id === 1
          ? [
              "This module introduces the full learning path. You will first build the foundation: how Samoan is written, how sounds work, how to read simple words, and how to write carefully.",
              "After the foundation, the course moves into grammar. That includes pronouns, nouns, articles, verbs, tense and aspect markers, adjectives, adverbs, prepositions, conjunctions, questions, negatives, possession, numbers, money, time, and measurements.",
              "The middle of the course focuses on building sentences and writing. You will move from one sentence to five sentences, then paragraphs, descriptions, letters, diary entries, stories, personal reflections, and translation between English and Samoan.",
              "The final part of the course focuses on listening, speaking, conversation, media, cultural knowledge, formal speech awareness, and practical preparation for Samoa.",
            ]
          : [
              `${title} matters because it gives you another piece of the language system. Instead of treating it as a separate school topic, connect it to real communication: greeting someone, describing a person, asking for help, telling a story, or understanding spoken Samoan.`,
              "Study the topic in three passes. First, recognize it when you see or hear it. Second, copy trustworthy examples and change one part at a time. Third, produce your own examples and get them corrected.",
              "When a Samoan example includes macrons or glottal stops in your source, copy them carefully. If your source does not mark them, do not guess; mark the item for later dictionary or course-material review.",
              "For culture-heavy or formal topics, learn recognition before production. It is better to understand when formal or respectful language is being used than to improvise formal speech too early.",
            ],
      examples: pack?.examples ?? details,
      realLifeApplication: pack?.realLifeApplication ??
        id === 1
          ? [
              "Planning your learning helps you stay consistent over the long term instead of relying on motivation alone.",
              "The course structure mirrors school learning: modules, lessons, homework, tests, report cards, and review.",
              "Your real-life goal is not only to pass tests, but to understand and communicate with Samoan speakers respectfully.",
            ]
          : [
              `Use ${title.toLowerCase()} when reading signs, messages, songs, captions, dictionary examples, conversations, and your own writing.`,
              "Connect the topic to daily life: family, school, food, travel, weather, time, work, church, friends, and personal stories.",
              "Use this topic in short tasks first so you can check your own understanding before moving to harder examples.",
            ],
      demonstration:
        id === 1
          ? [
              "Write the course path as a ladder: sounds -> words -> grammar -> sentences -> writing -> listening -> speaking -> culture -> fluency assessment.",
              "Create one notebook page titled 'Why I am learning Samoan' and one page titled 'Mistakes I will review'.",
              "Open the app planner and identify the next useful module.",
            ]
          : [
              `Write three lines: Topic: ${title}; Example; My sentence.`,
              "Copy one example exactly, then replace one word while keeping the structure the same.",
              "Read the original example and your new version aloud, then mark anything that feels uncertain.",
            ],
      activities: createActivities(id, title),
      assessment: createAssessment(id, title),
      summary:
        id === 1
          ? [
              "This course will move from foundation skills to grammar, writing, listening, speaking, culture, and readiness for real use.",
              "Every module should produce evidence: notes, homework, cards, recordings, corrections, or test answers.",
              "Fluency will require consistency, correction, and real input from Samoan speakers and media.",
            ]
          : [
              `${title} is one part of the larger system you are building.`,
              "The learning cycle is recognition, controlled practice, original use, correction, and review.",
              "Keep examples short and accurate, and move uncertain items into your review list.",
            ],
      },
    ];
}

function createHomework(id: number, title: string): string[] {
  const byId: Record<number, string[]> = {
    1: [
      "1.H1 Homework: write the course stages in order: alphabet, sounds, syllables, words, grammar, sentences, listening, speaking.",
      "1.H2 Homework: write one sentence explaining what Gagana Samoa means.",
      "1.H3 Homework: choose three study tools you will use from this app.",
      "1.H4 Homework: write the main phases of the course.",
      "1.H5 Challenge for you: write three reasons you want to learn Samoan.",
    ],
    2: [
      "2.H1 Homework: write the Samoan alphabet twice.",
      "2.H2 Homework: separate these letters into vowels and consonants: A F I L O S U V.",
      "2.H3 Homework: circle the vowels in these words: FALE, TAMA, SAMI, ALOFA, VAI.",
      "2.H4 Homework: read these ten words aloud: fale, tama, sami, vai, alofa, aso, i'a, ula, eleele, Samoa.",
      "2.H5 Challenge for you: record yourself saying the alphabet and the ten words.",
    ],
    3: [
      "3.H1 Homework: read each vowel sound five times: a, e, i, o, u.",
      "3.H2 Homework: read the syllable rows ma/me/mi/mo/mu and fa/fe/fi/fo/fu.",
      "3.H3 Homework: write five words that contain the letter g.",
      "3.H4 Homework: record yourself saying gagana, tagata, logo, gofie, galo.",
      "3.H5 Challenge for you: listen to your recording and write which sound was hardest.",
    ],
    4: [
      "4.H1 Homework: copy ā, ē, ī, ō, ū ten times each.",
      "4.H2 Homework: mark which words contain a glottal stop: fa'a, tama, i'a, fale, fa'afetai.",
      "4.H3 Homework: read fa'a, i'a, and fa'afetai aloud five times.",
      "4.H4 Homework: write two short notes: what a macron does and what a glottal stop does.",
      "4.H5 Challenge for you: find three Samoan words online or in notes that show a glottal stop.",
    ],
    5: [
      "5.H1 Homework: split talofa, Samoa, alofa, tama, and faafetai into syllables.",
      "5.H2 Homework: count the syllables in fale, tagata, faamolemole, aso, and vai.",
      "5.H3 Homework: read each word one syllable at a time, then as a whole word.",
      "5.H4 Homework: write five new Samoan words and divide them into syllables.",
      "5.H5 Challenge for you: record yourself reading all ten words smoothly.",
    ],
    9: [
      "9.H1 Homework: match a'u, oe, ia, matou, tatou, outou, latou to English meanings.",
      "9.H2 Homework: choose matou or tatou for 'we including you' and 'we excluding you'.",
      "9.H3 Homework: circle the pronoun in five simple sentences from the lesson or notes.",
      "9.H4 Homework: make seven pronoun flashcards.",
      "9.H5 Challenge for you: write five English sentences and replace the pronoun with Samoan.",
    ],
    11: [
      "11.H1 Homework: match Ou te alu, Na ou alu, O le a ou alu to present, past, and future.",
      "11.H2 Homework: change Ou te sau into past and future.",
      "11.H3 Homework: circle the verb in alu, sau, faitau sentence examples.",
      "11.H4 Homework: write three sentences using alu, sau, and faitau.",
      "11.H5 Challenge for you: record the three tense patterns without reading the English.",
    ],
  };

  return (
    byId[id] ?? [
      `${id}.H1 Homework: copy five lesson examples and write the English meaning beside each one.`,
      `${id}.H2 Homework: complete five matching items using the module's words or patterns.`,
      `${id}.H3 Homework: write five short Samoan attempts using this module's skill.`,
      `${id}.H4 Homework: correct your five attempts using the lesson examples as your guide.`,
      `${id}.H5 Challenge for you: create five flashcards from the items you missed or forgot.`,
    ]
  );
}

function createAnswerKey(id: number, title: string): Module["answerKey"] {
  const practicalDefaults = {
    activities: [
      `${id}.1 Answer: all lesson examples were read aloud and meanings checked.`,
      `${id}.2 Answer: five examples were copied and the module pattern was marked.`,
      `${id}.3 Answer: five matching items were completed using the lesson meanings.`,
      `${id}.4 Answer: five short attempts were written using known words or patterns.`,
      `${id}.5 Answer: each item was marked easy, unsure, or needs review.`,
    ],
    homework: [
      `${id}.H1 Answer: five lesson examples copied with English meanings.`,
      `${id}.H2 Answer: five matching items completed from the module content.`,
      `${id}.H3 Answer: five short Samoan attempts written.`,
      `${id}.H4 Answer: attempts checked against the examples; errors marked.`,
      `${id}.H5 Answer: five weak items added to cards or weekly review.`,
    ],
  };

  if (id === 1) {
    return {
      activities: [
        "1.1 Answer: read the two introduction paragraphs.",
        "1.2 Answer: alphabet, sounds, long vowels, glottal stop, syllables.",
        "1.3 Answer: alphabet -> syllables -> sentences -> listening -> speaking.",
        "1.4 Sample answer: I want to understand and speak everyday Samoan with confidence.",
        "1.5 Sample answer: notebook, flashcards, recording.",
      ],
      homework: [
        "1.H1 Answer: alphabet, sounds, syllables, words, grammar, sentences, listening, speaking.",
        "1.H2 Answer: Gagana Samoa means the Samoan language.",
        "1.H3 Sample answer: cards, notebook, speaking recorder.",
        "1.H4 Answer: foundation, grammar, sentences, writing, listening, speaking, and mastery.",
        "1.H5 Any clear personal reasons are acceptable.",
      ],
    };
  }

  if (id === 2) {
    return {
      activities: [
        "2.1 Answer: A E I O U F G L M N P S T V.",
        "2.2 Answer: vowels A O U E; consonants M T F.",
        "2.3 Answer: TALO has A O; FALE has A E; SAMOA has A O A; ALOFA has A O A.",
        "2.4 Self-check: fale, tama, sami, vai, alofa were read aloud with clear vowels.",
        "2.5 Self-check: all 14 letters written five times.",
      ],
      homework: [
        "2.H1 Answer: A E I O U F G L M N P S T V, written twice.",
        "2.H2 Answer: vowels A I O U; consonants F L S V.",
        "2.H3 Answer: FALE = A E; TAMA = A A; SAMI = A I; ALOFA = A O A; VAI = A I.",
        "2.H4 Self-check: all ten words read aloud.",
        "2.H5 Self-check: recording includes alphabet and ten words.",
      ],
    };
  }

  if (id === 3) {
    return {
      activities: [
        "3.1 Answer: a, e, i, o, u were pronounced clearly.",
        "3.2 Self-check: ma, me, mi, mo, mu were read with different vowel sounds.",
        "3.3 Self-check: fa, fe, fi, fo, fu were read clearly.",
        "3.4 Answer: g is pronounced ng, not hard English g.",
        "3.5 Self-check: recording includes mala, fale, sami, tagata, gagana.",
      ],
      homework: [
        "3.H1 Self-check: each vowel read five times.",
        "3.H2 Self-check: both syllable rows read aloud.",
        "3.H3 Sample answers: gagana, tagata, galo, logo, gofie.",
        "3.H4 Self-check: recording saved.",
        "3.H5 Any honest difficulty note is acceptable.",
      ],
    };
  }

  if (id === 4) {
    return {
      activities: [
        "4.1 Answer: marked vowels are held longer.",
        "4.2 Answer: fa'a and i'a show glottal stops.",
        "4.3 Answer: fa'a-fe-tai = 3; i'a = 2; Sa-mo-a = 3.",
        "4.4 Self-check: ā, ē, ī, ō, ū, and ' copied accurately.",
        "4.5 Self-check: glottal stop heard as a small break.",
      ],
      homework: [
        "4.H1 Self-check: each marked vowel copied ten times.",
        "4.H2 Answer: fa'a, i'a, fa'afetai.",
        "4.H3 Self-check: fa'a, i'a, and fa'afetai read five times.",
        "4.H4 Answer: macron lengthens a vowel; glottal stop creates a small break.",
        "4.H5 Answers vary; words should visibly include a glottal mark.",
      ],
    };
  }

  if (id === 5) {
    return {
      activities: [
        "5.1 Answer: ta-lo-fa; Sa-mo-a; a-lo-fa; fa-a-fe-tai.",
        "5.2 Self-check: each word read by syllable, then whole.",
        "5.3 Answer: tama = 2; fale = 2; tagata = 3; faamolemole = 6.",
        "5.4 Answers vary; each word should show syllable breaks.",
        "5.5 Self-check: final vowels were not swallowed.",
      ],
      homework: [
        "5.H1 Answer: ta-lo-fa; Sa-mo-a; a-lo-fa; ta-ma; fa-a-fe-tai.",
        "5.H2 Answer: fale = 2; tagata = 3; faamolemole = 6; aso = 2; vai = 1.",
        "5.H3 Self-check: syllable then whole-word reading completed.",
        "5.H4 Answers vary; syllable divisions should be reasonable.",
        "5.H5 Self-check: recording saved.",
      ],
    };
  }

  if (id === 9) {
    return {
      activities: [
        "9.1 Expected answer: pronouns replace or point to people: I, you, he/she, we, they.",
        "9.2 Expected answer: tatou includes the listener; matou excludes the listener.",
        "9.3 Sample Q&A: Who is included in tatou? Who is excluded in matou?",
        "9.4 Sample production: O a'u o se tagata aoga. Keep uncertain phrases marked.",
        "9.5 Self-check: you can explain inclusive/exclusive we and list at least five pronouns.",
      ],
      homework: [
        "9.H1 Answer should explain a'u, oe, ia, matou, tatou, outou, latou.",
        "9.H2 Easy: translate a'u/oe/ia. Medium: choose matou or tatou. Difficult: write a sentence with tatou.",
        "9.H3 Correct work should use pronouns consistently and avoid confusing matou with tatou.",
        "9.H4 Quiz answer should show that tatou includes the listener and matou excludes the listener.",
        "9.H5 Add weak pronouns to cards, especially matou/tatou/outou/latou.",
      ],
    };
  }

  if (id === 11 || id === 12) {
    return {
      activities: [
        `${id}.1 Expected answer: the module is about showing action and time around verbs.`,
        `${id}.2 Expected examples: Ou te alu; Na ou alu; O le a ou alu.`,
        `${id}.3 Good questions ask how present, past, and future are marked.`,
        `${id}.4 Original examples should keep the marker and pronoun pattern stable.`,
        `${id}.5 Self-check: you can translate I go, I went, and I will go.`,
      ],
      homework: [
        `${id}.H1 Expected explanation: verb meaning is supported by markers such as te, na, and o le a.`,
        `${id}.H2 Drill answer should include present, past, and future prompts.`,
        `${id}.H3 Sample correct sentences: Ou te alu. Na ou sau. O le a ou faitau.`,
        `${id}.H4 Quiz answers should identify which sentence is past, present, or future.`,
        `${id}.H5 Add any confused marker to flashcards and record the three model sentences.`,
      ],
    };
  }

  return practicalDefaults;
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
  homework: createHomework(id, title),
  answerKey: createAnswerKey(id, title),
  assignment:
    id < 20
      ? "Build a notebook page, 20 flashcards, and 10 corrected example sentences."
      : id < 38
        ? "Submit a short writing task, correction pass, and reflection on recurring errors."
        : id < 58
          ? "Record listening or speaking evidence and summarize what became easier."
          : "Create a mastery artifact: transcript, reflection, conversation recording, or travel script.",
}));

export const exams: Exam[] = [
  {
    checkpoint: "Foundation checkpoint",
    title: "Alphabet and Reading Check",
    modules: "1-3",
    format: ["Oral alphabet reading", "Pronunciation recording", "Short written quiz"],
    prompts: ["Read 20 words aloud.", "Explain macrons and the glottal stop.", "Syllable-break 10 unfamiliar words."],
  },
  {
    checkpoint: "Foundation checkpoint",
    title: "Semester 1 Foundation Exam",
    modules: "1-5",
    format: ["Vocabulary test", "Dictation", "Reading aloud", "Short culture response"],
    prompts: ["Write 50 core words.", "Introduce yourself in Samoan.", "Read a beginner paragraph aloud."],
  },
  {
    checkpoint: "Grammar checkpoint",
    title: "Grammar Midterm",
    modules: "6-11",
    format: ["Pronoun chart", "Verb marker drills", "Present, past, and future translation"],
    prompts: ["Translate 20 tense prompts.", "Write 10 sentences about your week.", "Explain inclusive and exclusive we."],
  },
  {
    checkpoint: "Grammar checkpoint",
    title: "Grammar Final",
    modules: "6-19",
    format: ["Grammar exam", "Numbers and time practical", "Oral interview"],
    prompts: ["Ask and answer 12 questions.", "Describe a family photo.", "Write prices, times, and measurements."],
  },
  {
    checkpoint: "Sentence checkpoint",
    title: "Sentence Construction Check",
    modules: "20-24",
    format: ["Sentence writing", "Question formation", "Command and opinion prompts"],
    prompts: ["Write 25 simple sentences.", "Turn 10 statements into questions.", "Record a two-minute opinion."],
  },
  {
    checkpoint: "Sentence checkpoint",
    title: "Semester 3 Sentence Exam",
    modules: "20-28",
    format: ["Complex sentence test", "Conversation grammar role play", "Error correction"],
    prompts: ["Explain cause and effect.", "Compare two people or places.", "Hold a four-minute guided conversation."],
  },
  {
    checkpoint: "Writing checkpoint",
    title: "Writing Midterm",
    modules: "29-34",
    format: ["Paragraph writing", "Letter writing", "Diary entry"],
    prompts: ["Write five polished sentences.", "Write a personal letter.", "Keep a seven-day diary sample."],
  },
  {
    checkpoint: "Writing checkpoint",
    title: "Writing Final",
    modules: "29-37",
    format: ["Story", "Personal reflection", "Two-way translation"],
    prompts: ["Write a 200-word personal reflection draft.", "Translate a short English text.", "Back-translate your Samoan draft."],
  },
  {
    checkpoint: "Listening checkpoint",
    title: "Listening Midterm",
    modules: "38-40",
    format: ["Dictation", "Slow and native-speed comprehension", "Summary"],
    prompts: ["Transcribe 60 seconds of clear audio.", "Summarize a native-speed clip.", "List new vocabulary by topic."],
  },
  {
    checkpoint: "Listening checkpoint",
    title: "Listening Final",
    modules: "38-45",
    format: ["Music, interview, and news comprehension", "Transcript correction", "Oral summary"],
    prompts: ["Summarize a news clip.", "Explain the main idea of an interview.", "Identify unknown words from context."],
  },
  {
    checkpoint: "Speaking checkpoint",
    title: "Speaking Midterm",
    modules: "46-51",
    format: ["Pronunciation", "Shadowing", "Travel, shopping, and restaurant role play"],
    prompts: ["Record a shadowing sample.", "Order food politely.", "Solve a travel problem in Samoan."],
  },
  {
    checkpoint: "Speaking checkpoint",
    title: "Speaking Final",
    modules: "46-57",
    format: ["Conversation", "Storytelling", "Public speaking", "Thinking-in-Samoan log"],
    prompts: ["Tell a five-minute story.", "Give a short prepared talk.", "Complete a no-English thinking session."],
  },
  {
    checkpoint: "Mastery checkpoint",
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
  ["reflection-muamua", "Muamua", "First / firstly", "Personal Reflections", "Semester 4 - Writing"],
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
