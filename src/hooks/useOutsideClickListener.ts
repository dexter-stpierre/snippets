import { RefObject, useEffect } from "react";

export function useOutsideClickListener(
  refs: RefObject<HTMLElement>[],
  fn: () => void
) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        refs.every((ref) => ref.current && !ref.current.contains(event.target as Node))
      ) {
        fn();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [refs, fn]);
}
