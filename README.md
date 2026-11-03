# Pulse SaaS Dashboard

A React dashboard prototype for a fictional SaaS product. It brings account screens, subscription plans, usage analytics, session management, and settings together in a single interface.

> **Prototype notice:** This project is a front-end demonstration, not a production SaaS service. Dashboard and account data are local mock data; there is no API, database, or real billing integration.

## Features

- Sign-up and sign-in screens with client-side form validation
- Dashboard overview with metric cards, API volume chart, recent activity, and sample notifications
- Monthly and yearly plan comparison
- API quota summaries and sample endpoint metrics
- Active session list with local revoke actions
- Profile, notification, and appearance settings screens
- Animated interface built with React, Motion, and Tailwind CSS

## Getting started

### Requirements

- Node.js `^20.19.0` or `>=22.12.0`
- npm

### Install and run

```bash
npm install
npm run dev
```

Open the local URL printed by Vite in your terminal.

### Other commands

```bash
npm run build     # Create a production build in dist/
npm run preview   # Serve the production build locally
npm run lint      # Run ESLint
```

Run `npm run build` before `npm run preview`.

## Demo behavior and data

- Sample dashboard, plan, usage, session, and settings data is defined in [`src/data/db.js`](./src/data/db.js). The exported data functions return this in-memory data; they do not make network requests.
- Sign-up and the current session are stored in browser `localStorage` under `auth-users` and `current-session`. Data remains in that browser until it is cleared.
- Sign-in looks up an account by email. The current mock implementation does **not** verify the submitted password.
- Account passwords are stored as entered in `localStorage`. **Do not use real credentials or sensitive personal information with this demo.**
- Session revocations and settings edits are UI-only and do not update a server or persist as account data.
- Plan selection, quota upgrades, API-key generation, notifications, and billing are not connected to working backend services.

To reset the demo account data, clear this site's local storage in your browser's developer tools and reload the page.

## Project structure

```text
public/                 Static assets
src/
  assets/               Images and default Vite/React assets
  components/           Dashboard screens and login form
  context/              Authentication/session context
  data/                 In-memory sample data
  hooks/                Reusable localStorage hook
  App.jsx               Dashboard shell and navigation
  App.css               Application styles
  index.css             Tailwind CSS entry point
  main.jsx              React entry point
index.html              Vite HTML entry point
vite.config.js          Vite, React, and Tailwind configuration
```

## Tech stack

- React 19 and Vite
- Tailwind CSS 4
- Motion for React animations
- Lucide React icons
- React Hook Form
- ESLint

## Extending the prototype

The sample data accessors in `src/data/db.js` are the natural starting point for connecting real services. A production implementation should use a server-side authentication and authorization system, secure password handling, persistent API-backed data, and a real billing provider. Do not treat client-side state or `localStorage` as a security boundary.
