import React, { useEffect, useRef, useState } from "react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  debounceMs?: number;
  disabled?: boolean;
  "aria-label"?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = "",
  debounceMs = 0,
  disabled = false,
  "aria-label": ariaLabel,
}) => {
  const safeDebounceMs = debounceMs < 0 ? 0 : debounceMs;

  useEffect(() => {
    if (debounceMs < 0) {
      console.warn("SearchInput: debounceMs cannot be negative, coercing to 0");
    }
  }, [debounceMs]);

  const [internalValue, setInternalValue] = useState(value);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const onChangeRef = useRef(onChange);
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    if (safeDebounceMs === 0) {
      onChangeRef.current(internalValue);
      return;
    }

    const timer = setTimeout(() => {
      onChangeRef.current(internalValue);
    }, safeDebounceMs);

    return () => clearTimeout(timer);
  }, [internalValue, safeDebounceMs]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInternalValue(e.target.value);
  };

  const handleClear = () => {
    setInternalValue("");
  };

  return (
    <div style={{ position: "relative" }}>
      <input
        type="text"
        value={internalValue}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        aria-label={ariaLabel}
        style={{
          padding: "0.5rem",
          border: "1px solid #d1d5db",
          borderRadius: "0.375rem",
          width: "100%",
          boxSizing: "border-box",
          paddingRight: internalValue ? "2rem" : "0.5rem",
        }}
      />

      {internalValue && !disabled && (
        <button
          onClick={handleClear}
          aria-label="Clear search"
          style={{
            position: "absolute",
            right: "0.5rem",
            top: "50%",
            transform: "translateY(-50%)",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "1.25rem",
            color: "#6b7280",
          }}
        >
          ×
        </button>
      )}
    </div>
  );
};