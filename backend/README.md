# RevisionHub AI — Backend

The Node.js/Express API that sits between the [frontend](../frontend) and the [AI service](../ai). It handles PDF uploads, extracts text from them, and exposes endpoints the frontend calls to request a summary, flashcards, or a quiz.

## Tech stack

- Express 5
- Multer — PDF upload handling (20 MB limit)
- pdf-parse — text extraction
- Axios — calls out to the AI service
- dotenv, cors

## Structure

```
src/
├── app.js                  # Express app setup, mounts routes
├── routes/
│   ├── uploadRoutes.js      # /, /status, /text, /upload
│   └── generateRoutes.js    # /generate/summary, /generate/flashcards, /generate/quiz
├── controllers/
│   ├── uploadController.js
│   └── generateController.js
├── middleware/
│   └── uploadMiddleware.js  # Multer config / file validation
├── services/
│   ├── pdfService.js        # PDF text extraction
│   └── aiService.js         # Calls the AI microservice
├── data/
│   └── studyData.js         # In-memory store for extracted text
└── utils/
    └── deleteFile.js
server.js                    # Entry point, starts the HTTP server
```

## Endpoints

| Method | Route | Description |
|---|---|---|
| `GET` | `/` | Health check / home |
| `GET` | `/status` | Server status |
| `GET` | `/text` | Returns the currently extracted PDF text |
| `POST` | `/upload` | Upload a PDF (field name `pdf`, max 20 MB) |
| `POST` | `/generate/summary` | Generate a summary from the extracted text |
| `POST` | `/generate/flashcards` | Generate flashcards from the extracted text |
| `POST` | `/generate/quiz` | Generate a quiz from the extracted text |

## Running locally

```bash
npm install
npm run dev   # nodemon, auto-restarts on changes
# or
npm start     # node server.js
```

By default the server listens on `PORT` from your `.env` file, falling back to `5000`.
