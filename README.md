# ACS 3310 – UI Component Library

**Purpose:** Reusable React components for displaying posts, search input, and publish status.

## Installation

```bash
npm install 3310-ui-component-library
```


## Exports

### `SearchInput`

- **Input:**  
  `value: string`,  
  `onChange: (value: string) => void`,  
  `placeholder?: string`,  
  `debounceMs?: number`,  
  `disabled?: boolean`,  
  `aria-label?: string`

- **Output:** Rendered search input element

- **Description:**  
  Controlled text input for searching posts. Calls `onChange` on each keystroke, or after `debounceMs` if provided.  
  Renders a clear (×) button when the input is non-empty. The clear button is hidden when `disabled` is true.

---

### `StatusBadge`

- **Input:**  
  `status: "draft" | "published" | "archived"`,  
  `size?: "sm" | "md"`,  
  `showIcon?: boolean`

- **Output:** Rendered badge element

- **Description:**  
  Displays a colored label for a post's publish status:
  - Draft → gray
  - Published → green
  - Archived → amber

  `showIcon` controls whether an icon appears **alongside** the text.  
  The text label is always shown to ensure readability and accessibility.  
  Display-only — no click handler.

---

### `PostCard`

- **Input:**  
  `title: string`,  
  `author: string`,  
  `status: "draft" | "published" | "archived"`,  
  `rawExcerpt?: string`,  
  `createdAt?: Date`,  
  `onClick?: () => void`,  
  `footerActions?: React.ReactNode`

- **Output:** Rendered post card element

- **Description:**  
  Displays a summary card for a post. Uses `StatusBadge` internally.

  If `onClick` is provided, the card body becomes interactive (keyboard accessible via Enter / Space).

  `footerActions` renders in the card footer and does not trigger `onClick` when interacted with.

  `React.ReactNode` represents anything React can render (elements, strings, fragments, arrays, or null), allowing flexible composition of buttons, links, or other UI elements.

---

## Example Usage

```tsx
import { SearchInput, StatusBadge, PostCard } from "postkit-ui-components";
import { useState } from "react";

const [query, setQuery] = useState("");

<SearchInput
  value={query}
  onChange={setQuery}
  placeholder="Search posts..."
  debounceMs={300}
/>

<StatusBadge status="published" size="sm" />

<PostCard
  title="Getting Started with PostKit"
  author="Ashley"
  status="published"
  rawExcerpt="A quick guide to setting up your first PostKit project."
  createdAt={new Date("2025-03-01")}
  onClick={() => console.log("open post")}
  footerActions={
    <>
      <button>Edit</button>
      <button>Delete</button>
    </>
  }
/>
```

---

## Edge Cases

- `SearchInput`: `debounceMs` of 0 fires synchronously. Negative values are coerced to 0 and log a `console.warn` in development.
- `SearchInput`: Clicking the clear button calls `onChange("")`. The parent must update its own state.
- `PostCard`: `rawExcerpt` is rendered as-is. Callers are responsible for sanitizing and truncating content before passing.
- `PostCard`: Invalid `createdAt` values are omitted rather than rendering `Invalid Date`.

---

## Design Notes

- `SearchInput` manages internal state to support debouncing, but stays in sync with the `value` prop.
- `PostCard` composes `StatusBadge` internally for convenience but can still be used standalone.
- `Status` uses a string literal union to map naturally to API responses.
- `rawExcerpt` naming makes it explicit that sanitization is the caller's responsibility.
- `footerActions` clarifies placement and avoids ambiguity compared to a generic actions prop.
- `showIcon` only controls the icon — text is always displayed for clarity.

## Viewing Components
 
This library includes [Storybook](https://storybook.js.org/) for interactive component previews. To launch it locally:
 
```bash
npm run storybook
```
 
Each component has its own stories covering the main props and states.