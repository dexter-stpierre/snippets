import { useEffect, useRef, useState } from "react";

interface DebounceOptions {
  leading?: boolean;
}

/**
 * Custom hook for any callback that requires debouncing
 * Especially useful for autosaving and on delaying API calls
 * This is based off of this article: https://overreacted.io/making-setinterval-declarative-with-react-hooks/
 *
 * @param {Function} callback Function to call after the delay. Make sure to wrap in useCallback to keep dependencies up to date
 * @param {number} delay The delay desired in milliseconds
 * @param {DebounceOptions} [{leading = false}={}] Leading determines if callback should run on initial run
 * @return {Function} Function to cancel the function call
 */
export const useDebouncedEffect = (
  callback: Function,
  delay: number,
  { leading = false }: DebounceOptions = {}
): (() => void) => {
  const [isFirstRun, setIsFirstRun] = useState(true);
  const timeoutId = useRef(null);

  const resetTimeout = () => {
    clearTimeout(timeoutId.current);
    timeoutId.current = null;
  };

  useEffect(() => {
    if (isFirstRun && leading) {
      callback();
      setIsFirstRun(false);
      return;
    }

    clearTimeout(timeoutId.current);

    if (delay !== null) {
      const id = setTimeout(callback, delay);
      timeoutId.current = id;
      return () => clearTimeout(id);
    }
  }, [delay, isFirstRun, leading, callback]);

  return resetTimeout;
};
