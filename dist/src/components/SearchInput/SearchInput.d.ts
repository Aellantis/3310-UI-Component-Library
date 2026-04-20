import React from "react";
interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    debounceMs?: number;
    disabled?: boolean;
    "aria-label"?: string;
}
export declare const SearchInput: React.FC<SearchInputProps>;
export {};
