import { useRef, useMemo, RefObject } from "react";
import { useBooleanValue } from "./useBooleanValue";

type UsePopperReturn = [
  boolean,
  RefObject<any>,
  {
    open: () => void;
    close: () => void;
    toggle: () => void;
  }
];

export const usePopper = (initialIsOpen: boolean): UsePopperReturn => {
  const [isOpen, isOpenHandlers] = useBooleanValue(initialIsOpen);
  const anchorRef = useRef();

  const handlers = useMemo(
    () => ({
      open: isOpenHandlers.on,
      close: isOpenHandlers.off,
      toggle: isOpenHandlers.toggle
    }),
    [isOpenHandlers]
  );

  return [isOpen, anchorRef, handlers];
};
