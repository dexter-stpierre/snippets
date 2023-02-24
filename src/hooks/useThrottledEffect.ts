import { useEffect, useMemo, useRef } from "react";
import throttle from "lodash.throttle";

interface DebounceOptions {
  leading?: boolean;
}

/**
 * Custom hook for any effect that requires throttling
 * Especially useful for autosaving and on delaying API calls
 * This is based off of this article: https://overreacted.io/making-setinterval-declarative-with-react-hooks/
 * and this SO answer (Last codeblock): https://stackoverflow.com/a/62017005
 *
 * @param {Function} callback Function to call after the delay. Make sure to wrap in useCallback to keep dependencies up to date
 * @param {number} delay The delay desired in milliseconds
 * @param {DebounceOptions} [{leading = false}={}] Leading determines if callback should run on initial run
 */
export const useThrottledEffect = (
  callback: () => void,
  delay: number,
  { leading = false }: DebounceOptions = {}
) => {
  const currentCallback = useRef(() => {});
  const isCallCancelled = useRef(true);

  useEffect(() => {
    currentCallback.current = callback;
  }, [callback]);

  const throttledCallback = useMemo(() => {
    return throttle(
      () => {
        if (isCallCancelled.current) return;
        currentCallback.current();
      },
      delay,
      { leading }
    );
  }, [delay, leading]);

  useEffect(() => {
    throttledCallback();
  }, [callback, throttledCallback]);

  useEffect(() => {
    isCallCancelled.current = false;
    return () => {
      isCallCancelled.current = true;
    };
  }, []);
};
