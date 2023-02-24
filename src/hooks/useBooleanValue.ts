import { useMemo, useState } from "react";

type UseBooleanValueReturn = [
  boolean,
  {
    on: () => void;
    off: () => void;
    toggle: () => void;
  }
];

export function useBooleanValue(
  defaultValue: boolean = false
): UseBooleanValueReturn {
  const [isOpen, setIsOpen] = useState(defaultValue);

  const handlers = useMemo(
    () => ({
      on: () => {
        setIsOpen(true);
      },
      off: () => {
        setIsOpen(false);
      },
      toggle: () => {
        setIsOpen((s) => !s);
      }
    }),
    []
  );

  return [isOpen, handlers];
}
