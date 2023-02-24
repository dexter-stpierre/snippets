export function addEventListenerToElement<
  K extends keyof DocumentAndElementEventHandlersEventMap
>(
  element: HTMLElement,
  eventName: K,
  listener: (
    this: DocumentAndElementEventHandlers,
    ev: DocumentAndElementEventHandlersEventMap[K]
  ) => any
) {
  element.addEventListener(eventName, listener);
  return () => element.removeEventListener(eventName, listener);
}
