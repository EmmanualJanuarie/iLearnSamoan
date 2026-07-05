# iLearn Samoan

A personal school-style Samoan learning app built with React, TypeScript, and Vite.

The private curriculum runs from September 2026 through October 2028 and is organized like a long-form language course:

- Foundation year: alphabet, pronunciation, reading, writing, vocabulary, and grammar.
- Year two: sentence construction, writing, paragraphs, essays, and translation.
- Year three: listening, speaking, conversation, storytelling, and thinking in Samoan.
- Final stage: books, media, humor, culture, formal speech, everyday conversation, and Samoa readiness.

The app includes:

- 70 modules with one structured lesson per module.
- Each lesson includes purpose, examples or use, activities, and a five-page homework challenge.
- A month-based test calendar.
- Interactive test questions with answer keys and rubrics.
- A weekly study calendar with study days, review days, test prep, and off days.
- Weekly native-speaker practice with preparation, conversation, and follow-up tasks.
- Daily time guidance for each active module.
- Lesson completion gates before a module can be marked complete.
- Semester report cards that unlock only after the semester ends.
- A module notebook and mistake log.
- Semester-specific flashcards with simple spaced-review boxes.
- Weekly review card bank for cards marked "Don't know", grouped by category.
- A browser-based speaking recorder for pronunciation practice.
- Cloud progress sync with Supabase authentication and row-level security.
- Local progress fallback through browser storage before sign-in.

## Private Cloud Sync Setup

1. Create a Supabase project.
2. Open the Supabase SQL editor.
3. Run the SQL in `supabase/schema.sql`.
4. Copy `.env.example` to `.env.local`.
5. Add your Supabase project URL, public anon key, and allowed owner email.
6. Restart the dev server.
7. Create the owner account using `emmanual.ilearnsamoan@gmail.com`.
8. After the owner account exists, disable public signups in Supabase Auth settings.

```bash
cp .env.example .env.local
npm run dev
```

Do not put a Supabase service-role key in this frontend app. Only use the public anon key. The database table uses row-level security so a signed-in user can only read and write their own progress row.

The React app also hides all study pages unless the signed-in user email is `emmanual.ilearnsamoan@gmail.com`. The database RLS policy repeats that restriction so progress data is protected even if someone tries to call Supabase directly.

## Run

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Notes

This is a personal learning system, not a substitute for a fluent teacher or native speaker. Use native speaker review for pronunciation, culture, and formal speech.
