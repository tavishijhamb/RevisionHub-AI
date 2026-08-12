# RevisionHub AI — Frontend

The static web client for RevisionHub AI. It handles the full user journey — landing page, PDF upload, processing screens, and the study views (dashboard, summary, flashcards, quiz) — and talks to the [backend](../backend) API for data and to the [AI service](../ai) (via the backend) for generated content.

## Pages

| File | Purpose |
|---|---|
| `index.html` | Landing page — intro, features, how it works |
| `upload.html` | PDF upload screen (max 20 MB) |
| `processing.html` | "Analyzing PDF" loading screen shown during text extraction |
| `processing-content.html` | Loading screen shown while AI content is being generated |
| `dashboard.html` | Hub for choosing Summary / Flashcards / Quiz once a PDF is ready |
| `summary.html` | Displays the AI-generated summary |
| `flashcards.html` | Displays the AI-generated flashcards |
| `quiz.html` | Displays the AI-generated multiple-choice quiz |

## Structure

- `js/` — one script per page (`upload.js`, `dashboard.js`, `processing.js`, `processing-content.js`, `summary.js`, `flashcards.js`, `quiz.js`), handling that page's logic and API calls
- `style.css` — shared styling for the whole app
- `images/` — static assets

## Running locally

This is a static site with no build step. Open `index.html` directly in a browser, or serve the folder with any static file server, e.g.:

```bash
npx serve .
```

Make sure the [backend](../backend) is running so upload and generation requests succeed.
