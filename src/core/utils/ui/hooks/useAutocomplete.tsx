import { Fragment, useEffect, useState, useRef } from "react";
import { useDebounceCallback, useIntersectionObserver } from "usehooks-ts";

export interface useAutocompleteProps {
  onQuery?: (data: string) => void;
}

export default function useAutocomplete({
  onQuery = () => {},
}: useAutocompleteProps) {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const debounced = useDebounceCallback(onQuery, 500);
  const containerRef = useRef<HTMLDivElement | null>(null);
  // useOnClickOutside(containerRef, () => {
  //   setQuery(selected?.name ?? "");
  //   setIsFocus(false);
  //   setIsOpen(false);
  // });

  const { ref, isIntersecting } = useIntersectionObserver();
  return {
    isFocus,
    setIsFocus,
    query,
    setQuery,
    isOpen,
    setIsOpen,
    inputRef,
    debounced,
    containerRef,
    ref,
    isIntersecting,
  };
}
