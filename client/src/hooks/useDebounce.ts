import { useEffect, useState } from "react";

export const useDebounce = (value: string): string => {
  const [debounceValue, setDebounceValue] = useState<string>(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceValue(value);
    }, 400);

    return () => {
      clearTimeout(timeout);
    };
  }, [value]);

  return debounceValue;
};
