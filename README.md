# ACS 3310-UI-Component-Library

**Purpose:** Provides reusable React components. Used to display posts, search content, and show publish status across the UI.

---

## Exports

### `SearchInput`

* **Input:** `value: string`, `onChange: (value: string) => void`, `placeholder?: string`, `debounceMs?: number`, `disabled?: boolean`
* **Output:** Rendered search input element
* **Description:** A controlled text input for searching posts. Calls `onChange` on each keystroke, or after `debounceMs` if provided. Renders a clear button when the input is non-empty.

---

### `StatusBadge`

* **Input:** `status: "draft" | "published" | "archived"`, `size?: "sm" | "md"`, `showIcon?: boolean`
* **Output:** Rendered badge element
* **Description:** Displays a small colored label for a post's publish status. Draft is gray, published is green, archived is amber. Display-only — no click handler.

---

### `PostCard`

* **Input:** `title: string`, `author: string`, `status: "draft" | "published" | "archived"`, `excerpt?: string`, `createdAt?: Date`, `onClick?: () => void`, `actions?: React.ReactNode`
* **Output:** Rendered post card element
* **Description:** Displays a summary card for a single post. Uses `StatusBadge` internally for the status. If `onClick` is provided, the card is clickable. `actions` renders in the card footer and does not trigger `onClick`.

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
  excerpt="A quick guide to setting up your first PostKit project."
  createdAt={new Date("2025-03-01")}
  onClick={() => console.log("open post")}
  actions={<><button>Edit</button><button>Delete</button></>}
/>
```

---

## Edge Cases

* `SearchInput`: `debounceMs` of `0` fires synchronously. Negative values are treated as `0`.
* `SearchInput`: Clicking the clear button calls `onChange("")` — the parent must update its own state.
* `StatusBadge`: Passing a status outside the union type is a TypeScript error. If bypassed at runtime, no color or icon is applied.
* `PostCard`: `excerpt` is rendered as-is — callers should truncate and sanitize before passing.
* `PostCard`: An invalid `Date` for `createdAt` silently omits the date rather than rendering "Invalid Date".

---

## Design Notes

* `SearchInput` is controlled — it holds no internal state, keeping the app's source of truth in one place.
* `PostCard` composes `StatusBadge` internally so callers don't have to wire it up manually. `StatusBadge` can still be used standalone.
* Status uses a string literal union instead of an enum so it maps naturally to API response values.
* `actions` accepts `React.ReactNode` rather than a callback so callers can pass any combination of buttons or links without the library needing to know about them.
* `React.ReactNode` represents anything React can render (elements, strings, fragments, arrays, or null). This allows `PostCard` to act as a flexible layout container, letting consumers fully control what appears in the actions area without additional API complexity.
