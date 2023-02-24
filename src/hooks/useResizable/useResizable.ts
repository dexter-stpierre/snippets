import { throttle } from "lodash";
import React, { useCallback, useRef, useState } from "react";
import { usePersistentState } from "../usePersistentState";
import { Resizable, UseResizableProps } from "./types";

export const KEYS_LEFT = ["ArrowLeft", "Left"];
export const KEYS_RIGHT = ["ArrowRight", "Right"];
export const KEYS_UP = ["ArrowUp", "Up"];
export const KEYS_DOWN = ["ArrowDown", "Down"];
export const KEYS_AXIS_X = [...KEYS_LEFT, ...KEYS_RIGHT];
export const KEYS_AXIS_Y = [...KEYS_UP, ...KEYS_DOWN];
export const KEYS_POSITIVE = [...KEYS_RIGHT, ...KEYS_DOWN];

const calcPositionOfEvent = (
  e: React.MouseEvent | MouseEvent,
  reverse: UseResizableProps["reverse"],
  axis: UseResizableProps["axis"]
) => {
  return !reverse
    ? axis === "x"
      ? e.clientX
      : e.clientY
    : axis === "x"
    ? document.body.offsetWidth - e.clientX
    : document.body.offsetHeight - e.clientY;
};

/**
 * Hook for handling resizing of elements. This is derived from the `react-resizable-layout` npm package but modified to adjust size based on mouse movement rather than distance from the edge of the screen. Also uses `usePersistentState` hook to cache the size that the element is set to. Make sure to use a unique key.
 *
 * For details on how to use it check out the docs for `react-resizable-layout`. Note that this version requires a `cacheKey` to save the size, and returns a `size` property instead of `position`
 *
 * @param {UseResizableProps} {
 *   axis,
 *   initial = 0,
 *   cacheKey,
 *   min = 0,
 *   max = Infinity,
 *   reverse,
 *   onResizeStart,
 *   onResizeEnd,
 * }
 * @return {*} {Resizable}
 */
const useResizable = ({
  axis,
  initial = 0,
  cacheKey,
  min = 0,
  max = Infinity,
  reverse,
  onResizeStart,
  onResizeEnd
}: UseResizableProps): Resizable => {
  const isResizing = useRef(false);
  const [isDragging, setIsDragging] = useState(false);
  const [size, setSize] = usePersistentState(
    cacheKey,
    Math.min(Math.max(initial, min), max)
  );
  const initialPosition = useRef(0);
  const initialWidth = useRef(initial);

  // Updates the width based on the difference of the initial position & current position
  // Added as event listener to document in handleMouseDown
  const handleMousemove = useCallback(
    (e: MouseEvent) => {
      // exit if not resizing
      if (!isResizing.current) return;

      e.stopPropagation();
      e.preventDefault(); // prevent text selection

      const currentPosition = calcPositionOfEvent(e, reverse, axis);

      const changeInPosition = currentPosition - initialPosition.current;
      const newWidth = initialWidth.current + changeInPosition;

      if (min < newWidth && newWidth < max) {
        setSize(newWidth);
      }
    },
    [axis, max, min, reverse, setSize]
  );

  // Clears the even listeners when the user finishes dragging
  // Added as event listener to document in handleMouseDown
  const handleMouseup = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation();
      isResizing.current = false;
      setIsDragging(false);
      document.removeEventListener("mousemove", handleMousemove);
      document.removeEventListener("mouseup", handleMouseup);
      initialPosition.current = 0;
      if (onResizeEnd) onResizeEnd();
    },
    [handleMousemove, onResizeEnd]
  );

  // Sets refs needed for calculations and adds event listeners to doc
  // Set as handleMouseDown prop on resize component
  const handleMousedown = useCallback<React.MouseEventHandler>(
    (e) => {
      initialPosition.current = calcPositionOfEvent(e, reverse, axis);
      initialWidth.current = size;
      e.stopPropagation();
      e.preventDefault();
      isResizing.current = true;
      setIsDragging(true);
      document.addEventListener("mousemove", throttle(handleMousemove, 10));
      document.addEventListener("mouseup", handleMouseup);
      if (onResizeStart) onResizeStart();
    },
    [axis, handleMousemove, handleMouseup, onResizeStart, reverse, size]
  );

  return {
    size,
    isDragging,
    splitterProps: {
      onMouseDown: handleMousedown
    }
  };
};

export default useResizable;
