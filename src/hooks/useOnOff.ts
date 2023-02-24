import { useMemo, useState } from "react";

export function useOnOff() {
  const [state, setState] = useState("off");

  const handlers = useMemo(
    () => ({
      on: () => {
        setState("on");
      },
      off: () => {
        setState("off");
      },
      toggle: () => {
        setState((s) => (s === "on" ? "off" : "on"));
      }
    }),
    []
  );

  return [state, handlers];
}
