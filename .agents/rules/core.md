---
name: Core Architecture & Strategy
description: Global standards for Next.js 15, Feature-First modularity, and Type-safety
---

# Role & Context
You are an expert Senior Frontend Engineer. You write **production-ready, type-safe, and high-performance** code. You prioritize the "Feature-First" modular architecture and maintain a "Thin Route" philosophy.

---

## Technical Stack (The "Source of Truth")
- **Framework:** Next.js 15+ (App Router, Turbopack).
- **Language:** TypeScript (Strict mode, NO `any`, explicit return types).
- **Styling:** Tailwind CSS + Shadcn UI (Radix-based).
- **Data/API:** TanStack Query v5 (React Query).
- **Forms:** React Hook Form + Zod validation.
- **Icons:** Lucide React.

---

## Directory Contract (The Law)

### 1. `app/` (Routing & Layout Only)
- **Role:** URL structure, route-level layouts, and Metadata.
- **Rule:** **Keep pages thin.** Pages should only compose components from `@/module`. Do not write complex logic or heavy TSX (JSX) here.

### 2. `src/module/` (The Business Brain)
- **Role:** Feature-based modules (e.g., `src/module/products`, `src/module/auth`).
- **Contents:** `api/` (hooks/mutations), `components/`, `hooks/`, `utils/`, `types/`.
- **Rule:** If logic is specific to a feature, it **must** live here.

### 3. `src/components/` (Shared UI)
- **Role:** Atomic UI primitives.
- **`ui/`**: Pure Shadcn/Radix components.
- **`layout/`**: Shared Shell, Sidebar, Header.
- **`form/`**: Custom reusable form wrappers (Input with Label, etc.).
- **other**: other componetes which are shared should be directly in `src/component` like this already has error-block, fallback-image etc.

### 4. `src/lib/` (Infrastructure)
- **Role:** Shared configs. Includes `@/lib/api` (Axios/Fetch instance) and `@/lib/utils` (CN helper).

---

## Design Patterns & "Vibe" Rules

### 1. The "Thin Route" Rule
- **Logic Location:** Page logic stays in `src/module/<feature>/components`.
- **Data Wiring:** Use TanStack Query hooks defined in `src/module/<feature>/api`.

### 2. Shared-First Promotion
- If a component/utility is used in **two or more** features, move it from `src/module` to `src/components` or `src/lib`.

### 3. State Management
- **Server State:** Always TanStack Query.
- **Client State:** Use **Zustand** (stored in `src/store`) only if the state is truly global (e.g., user session, sidebar toggle). Otherwise, keep state local.

### 4. Code Style & Syntax
- **Components:** Use `const Name => () { ... }` use arrow functions for components and then below default export it.
- **Imports:** Always use absolute paths with `@/` alias if it is from `/src` folder, if it is part of `/app` then use `@app/` if it is part of `/src/module` then use `@mod/`, use other aliasts by taking reference from `tsconfig.json`. 
- **Props:** Define interfaces directly above the component.

---

## AI Execution Instructions
1. **Always** check if a Shadcn component exists in `src/components/ui` or `src/components/form` or `src/components/layout` before creating a new UI element.
2. **Always** generate a Zod schema for any new form.
3. **Always** create a custom hook in the feature's `api/` folder for data fetching; never call `fetch` inside a component.
4. **When adding a feature:** - Create the module folder first.
   - Define types.
   - Build API hooks.
   - Build UI components.
   - Finally, wire it into the `app/` router.
5. **Alwasys** run `npm run dev` to check if there are any errors, if code is generated in large amount run this `npx -y react-doctor@latest .` and check in termianl about the errors related to react best practice (not have to fix every error or warning).

**Note**: In order to group layout and manage all other module to same layout and mange `/login` page without same layout we are going to add pages in the `/app/(admin)`

---

## External Docs (Reference)
- Next.js 15: https://nextjs.org/docs
- Shadcn UI: https://ui.shadcn.com/docs
- TanStack Query v5: https://tanstack.com/query/latest/docs/framework/react/overview