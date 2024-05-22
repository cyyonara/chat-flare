import { useState, useEffect } from "react";

export const useDebounce = (value: string, delay: number = 200): string => {
  const [debounceValue, setDebounceValue] = useState<string>(value);

  useEffect(() => {
    let timeout = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [value]);

  return debounceValue;
};
