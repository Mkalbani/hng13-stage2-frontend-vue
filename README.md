# TicketFlow (Vue)

TicketFlow is a lightweight ticket management frontend built with Vue 3 and Vite — a small, local demo app inspired by the React implementation (converted to Vue). It includes routing, a simple local-storage based auth flow, toast notifications, and Tailwind CSS for styling.

## Features

- Landing + hero with curved background and CTA
- Dashboard with quick actions and stats
- Ticket management (create, edit, delete) with localStorage persistence
- Simple auth flow (signup/login) with demo credentials
- Toast notifications (auto-dismiss)

## Tech stack

- Vue 3 (SFCs)
- Vite
- Tailwind CSS
- PostCSS + Autoprefixer

## Quick start

Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

Open http://localhost:5173 (or the URL Vite prints) in your browser.

### Demo credentials

- Email: `demo@ticketapp.com`
- Password: `Demo123!`

These demo credentials always work and bypass the minimal local signup check.

## Useful scripts

- `npm run dev` — start dev server with HMR
- `npm run build` — build for production
- `npm run preview` — locally preview the production build

## Project structure (high level)

- `src/main.js` — app bootstrap (loads global CSS, providers, router)
- `src/App.vue` — root layout (header, router-view, footer)
- `src/router` — routes and navigation guards
- `src/pages` — top-level pages (Landing, Dashboard, Tickets, Auth)
- `src/components` — reusable components (Header, Footer, Toasts, icons)
- `src/composables` — small composable modules: `useAuth`, `useToast`
- `src/assets` — global CSS (Tailwind directives + base variables)

## Notes and behaviors

- Auth is intentionally simple and stored in `localStorage` under `ticketapp_users` and `ticketapp_session` for demo purposes. Signup will persist a user locally; login requires a matching persisted user unless you use the demo credentials.
- Toasts auto-dismiss after a short duration. If you need different behavior change the duration in `src/composables/useToast.js`.
- Tailwind is already configured (`tailwind.config.js`) and included via `src/assets/main.css`.

## Contributing

This repo is a small demo — open a PR or file an issue if you want improvements. For big changes it's easiest to run the app locally and iterate with HMR.

## License

MIT-style (check repository root if a LICENSE file is present).
