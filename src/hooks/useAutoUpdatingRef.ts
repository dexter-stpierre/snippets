import { MutableRefObject, useRef } from "react";

export function useAutoUpdatingRef<T>(data: T): MutableRefObject<T> {
  const dataRef = useRef(data);

  dataRef.current = data;

  return dataRef;
}
