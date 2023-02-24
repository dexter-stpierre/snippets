import { ChangeEvent, useMemo, useState } from "react";
import { useAutoUpdatingRef } from "./useAutoUpdatingRef";

type UseInputReturn = [
  string,
  {
    handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    resetInput: () => void;
  }
];

export function useInput(defaultState: string): UseInputReturn {
  const [state, setState] = useState(defaultState);

  const defaultStateRef = useAutoUpdatingRef(defaultState);

  const handlers = useMemo(
    () => ({
      handleInputChange: (e: ChangeEvent<HTMLInputElement>) => {
        setState(e.target.value);
      },
      resetInput: () => {
        setState(defaultStateRef.current);
      },
      clearInput: () => {
        setState("");
      }
    }),
    [defaultStateRef]
  );

  return [state, handlers];
}
