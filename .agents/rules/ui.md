---
trigger: always_on
description: Rules for Shadcn UI, Tailwind CSS, and Layout consistency
---

# UI & Styling Standards

## Core Principles
- **Library:** Exclusively use **Shadcn UI** components. 
- **Responsiveness:** Always design **Mobile-First**. Use Tailwind breakpoints (`md:`, `lg:`, `xl:`) for desktop adjustments.

## Implementation Rules
### 1. The "No Magic" Rule
- **Variables Only:** Never use hardcoded hex codes or arbitrary spacing values.
- **Tokens:** Use CSS variables (e.g., `bg-primary`, `text-muted-foreground`, `border-input`) from `src/style/globals.css`.
- **Tailwind sizing:** Do not use direct px size for tailwind classes like `w-[40px]` instead use tailwind build in messurement like `w-10`

### 2. Component Organization & Ownership
- **Scan First:** Check `@/components/**` before generating new re-suable UI componet.
- **Installation:** If a Shadcn component is missing, use the browser tool to find the command: `npx shadcn@latest add [component]`.
- **Tiered Hierarchy:**
  - `components/ui/`: Raw Shadcn primitives (e.g., `Separator`, `Skeleton`). Use these directly for simple needs.
  - `components/composite/`: Complex UI blocks or wrappers (e.g., `DataTable`, `CustomSelect`).
  - `components/form/`: Specialized form field wrappers has extra fields like lable, errMsg etc`.

### 3. API-Driven UI Patterns
For any component fetching data, follow this strict rendering pattern to handle all states:

```typescript
const getContent = () => {
  if (isLoading) return <Skeleton className="h-40 w-full" />; // Match target UI shape Or use <CustomSpiner /> or <SpinnerOverly />
  if (error) return <ErrorBlock message="Failed to load data" />;
  if (!data || data.length === 0) return <ErrorBlock template="no-data" />;

  return <MainComponent data={data} />;
};

return (
  <section className="space-y-4">
    <PageHeader title="Overview" />
    {getContent()}
  </section>
);
```
Note: Separation of "No Data" and "Error" states is required for Admin dashboards to reduce support tickets.

4. **Component Responsibility (Atomic Design)**
Single Responsibility: A component should do one thing. If a section's state re-renders a large unrelated area, split it.

Action Wrappers: Create dedicated components for API mutations, even if it's just a button (e.g., ``StatusToggleButton.tsx``). This keeps the parent table/list clean.

5. **Layout & Spacing**
Consistency: Use standard Tailwind spacing (e.g., `p-4`, `gap-6`, `space-y-4`).

Standard Container: Use `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` for main content areas.

6. **Icons**
Must use `/src/components/icons` componets for every icons.

Mostely there would be **custom** icons available, if there are not then use lucide after importing and adding in the icon `MAP`

7. **Typography**
Must use `/src/components/ui/typography.tsx` componets for all the static text we add with respective variants it needed

8. **Form Components**
- While creating new component for form **Always** add form optional label.
- Always use `<Controller />` from `react-hook-form` an wrape to other form componets to use in form.
- If form consume many fields devids them into sections and use them with `<FormProvider>` from `react-hook-form`.
- Use zod for form validatoin

9. **Form Components**
- Alwasy use FallbackImage component to show imags, wethere it is from server or static. (check in `/src/components/common/fallback-image.tsx`

10. **Charts**
- Alway check rechart charts and graphs to show in the dashboard

## References
- **Shadcn Docs:** https://ui.shadcn.com/docs
- **React Hook Form Docs:** https://react-hook-form.com/docs
- **Zod Docs:** https://zod.dev/
- **Palette Pattern:** Refer to `src/style/globals.css` for the custom brand colors. Use the `primary` variable for all brand-specific actions.
- **Logical Properties:** (2026 Update) Use `ms-*` (start) and `me-*` (end) instead of `ml-*` and `mr-*` to support RTL layouts where necessary.
- **Recharts Docs:** https://recharts.github.io/en-US/api/