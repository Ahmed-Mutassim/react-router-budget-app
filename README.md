
# React Router Budget (Vite + React)

This repository is a small budgeting demo built with Vite, React 19, React Router (v6), and Recharts for visualization. It stores budgets and expenses in `localStorage` and provides a Dashboard page with a Recharts donut chart summarizing your overall budgets.

This README covers how to set up the development environment, run the app locally, and explains the project structure so contributors can understand where to make changes.

## Prerequisites

- Node.js 18+ (or a recent LTS)
- npm (comes with Node) or yarn

## Install

1. Clone the repository and change directory:

```bash
git clone <repo-url>
cd react-router-budget
```

2. Install dependencies:

```bash
npm install
```

Note: this project uses `recharts` for the Dashboard chart. The dependency is already listed in `package.json` and will be installed by the command above.

## Run (development)

Start the Vite dev server:

```bash
npm run dev
```

Vite prints a local URL (e.g. `http://localhost:5173/` or `http://localhost:5174/` if 5173 is busy). Open that in your browser.

## Build / Preview

Build for production:

```bash
npm run build
npm run preview
```

## Project structure (high-level)

- `src/`
	- `main.jsx` - application entry and React root
	- `App.jsx` - router setup and top-level routes
	- `layouts/` - layout components (e.g. `Main.jsx`) and loaders
	- `pages/` - route pages (e.g. `Dashboard.jsx`) and route-specific server helpers (e.g. `dashboard.server.js`)
	- `components/` - UI components (forms, nav, chart component `BudgetPieRechart.jsx`, etc.)
	- `helpers.js` - localStorage helpers and utility functions (createBudget, createExpense, formatting)
	- `utils/analysis.js` - small analysis helpers added for computing totals/percentages
	- `index.css` - global styles

## Important implementation notes

- Route loaders and actions
	- To keep Fast Refresh (HMR) stable we follow this pattern: component files export only components; route `loader` and `action` functions are moved to separate files when necessary (for example `src/pages/dashboard.server.js`). React Fast Refresh plugins can complain if a file exports both components and non-component helpers.

- Case-sensitive imports
	- On case-sensitive filesystems (Linux/macOS with case-sensitivity), import paths must match the filesystem exactly. For example `src/components/Nav.jsx` must be imported using `../components/Nav`, not `../Components/Nav`.

- Forms and route actions
	- Forms in the app post to the current route and include a hidden `_action` field so a single `action` can handle multiple forms (for example `_action=newUser` or `_action=createBudget`). Ensure forms include the correct `_action` value.

## Charts

- `src/components/BudgetPieRechart.jsx` uses Recharts to render a donut chart with:
	- inner radius / outer radius set in percentages for responsive scaling
	- percentage labels rendered inside slices
	- a custom right-side legend (the built-in Recharts `Legend` is disabled to avoid duplicate labels)

If you want to customize the chart, edit `BudgetPieRechart.jsx`. The component accepts a `budgets` array where each budget has `{ id, name, amount, color }`.

## Common issues & troubleshooting

- "Failed to resolve import" or module not found:
	- Check the file path and casing. Save files before relying on the dev server.

- Fast Refresh error: "export is incompatible" or similar:
	- This means a file exported both a React component and other non-component functions (like `loader` / `action`). Move route helpers to a separate module (example: `dashboard.server.js`).

- Form action returned nothing error:
	- Ensure forms include the `_action` hidden input that your route action expects. The action should return a value (a toast, redirect, or `null`).

- Port already in use
	- Vite will pick another port if the default (5173) is occupied. Check the printed URL after `npm run dev`.

## Where to make common changes

- To add/remove budgets: update or use the UI forms (Add Budget). The underlying helper is `createBudget` in `src/helpers.js`.
- To change chart appearance: `src/components/BudgetPieRechart.jsx` and `src/index.css`.
- To add new pages: create a new file in `src/pages` and add a route in `src/App.jsx`.

## Contributing

Feel free to open PRs. Keep these guidelines in mind:

- Maintain the component vs server-file separation for loaders/actions when adding route-level logic.
- Keep imports' case consistent with filenames.
# react-router-budget-app
