export type AtLeast<T, Keys extends keyof T> = Partial<T> &
  Required<Pick<T, Keys>>;
