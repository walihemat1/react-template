# React Admin Template

A simple React + Vite admin template using JavaScript.

Built to stay readable, modular, and easy to replace as the app grows.

## Tech Stack

- React + Vite
- Tailwind CSS
- shadcn/ui-style components
- Lucide icons
- React Router
- Redux Toolkit
- RTK Query
- react-hook-form + zod
- ESLint + Prettier

## Getting Started

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env` when you want local environment values.

## Scripts

```bash
npm run dev            # start Vite dev server
npm run start          # start Vite on 127.0.0.1
npm run build          # production build
npm run preview        # preview production build
npm run lint           # run ESLint
npm run format         # format files
npm run format:check   # check formatting
npm run check          # format check, lint, and build
```

## Project Structure

```txt
src/
  app/          App setup, providers, and theme context
  assets/       Static app assets
  components/   Shared reusable components
  config/       App config, roles, and permissions
  features/     Feature-specific components
  hooks/        Shared hooks when needed
  layouts/      Auth and dashboard layouts
  lib/          Small reusable utilities
  pages/        Route page components
  routes/       Route config and route guards
  services/     Mock services and RTK Query APIs
  store/        Redux store and slices
  styles/       Global styles and theme tokens
```

## Auth and RBAC

Auth is intentionally mocked in `src/services/auth-service.js`.

The demo login stores a user in `localStorage`. Roles and permissions are defined in `src/config/rbac.js`.

Protected routes can require authentication, roles, and permissions.

## Users Feature

The Users feature demonstrates the main template patterns:

- RTK Query mock API
- list/create/edit/delete
- `DataTable`
- `UserForm`
- RBAC checks
- loading, empty, error, and confirm states

## Dashboard Layout

The dashboard shell includes a collapsible RTL-aware sidebar, a top header, theme switching, language direction switching, and a simple user menu.

## Notes

This is a starter template, not a framework. Prefer small files, clear names, and simple feature folders over deep abstractions.
