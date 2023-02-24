import { useEffect } from "react";

export function useResizeWindowListener(
  fn: () => void,
  { leading } = { leading: true }
) {
  useEffect(() => {
    if (leading) fn();
    window.addEventListener("resize", fn);
    return () => {
      window.removeEventListener("resize", fn);
    };
  }, [fn, leading]);
}
