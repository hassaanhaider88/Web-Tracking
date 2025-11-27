
# Web Tracking - Frontend (Vite + React)

This is a minimal React frontend for the Web Tracking project.
It expects a backend running at http://localhost:3000 with the routes described in the project spec.

## Quick start

1. Install dependencies:
   ```
   npm install
   ```

2. Start dev server:
   ```
   npm run dev
   ```

3. Open http://localhost:5173

## Notes
- Tailwind is configured via tailwind.config.js and postcss.config.cjs.
- API helper attaches Authorization header from localStorage token `wt_token`.
- Socket.io client connects to http://localhost:3000 with auth token.
- Tracking snippet is available on the project detail page.
