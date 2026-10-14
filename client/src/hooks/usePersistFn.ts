import { useRef } from "react";

/** Keep a callback identity stable while calling the latest implementation. */
export function usePersistFn<Args extends unknown[], Result>(
  fn: (...args: Args) => Result
) {
  const fnRef = useRef(fn);
  fnRef.current = fn;
  const persistFn = useRef<((...args: Args) => Result) | null>(null);
  if (!persistFn.current) {
    persistFn.current = function (this: unknown, ...args: Args) {
      return fnRef.current.apply(this, args);
    };
  }
  return persistFn.current;
}
