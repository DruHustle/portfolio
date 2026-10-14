/** Storage can become unavailable at any time, including after initial access. */
function createSafeStorage(type: "localStorage" | "sessionStorage") {
  const fallback = new Map<string, string>();
  let memoryOnly = false;
  const storage = () =>
    typeof window === "undefined" ? undefined : window[type];
  return {
    getItem(key: string): string | null {
      if (!memoryOnly) {
        try {
          const target = storage();
          if (target) {
            const value = target.getItem(key);
            if (value === null) fallback.delete(key);
            else fallback.set(key, value);
            return value;
          }
        } catch {
          memoryOnly = true;
        }
      }
      return fallback.get(key) ?? null;
    },
    setItem(key: string, value: string): void {
      fallback.set(key, value);
      if (memoryOnly) return;
      try {
        storage()?.setItem(key, value);
      } catch {
        memoryOnly = true;
      }
    },
    removeItem(key: string): void {
      fallback.delete(key);
      if (memoryOnly) return;
      try {
        storage()?.removeItem(key);
      } catch {
        memoryOnly = true;
      }
    },
    clear(): void {
      fallback.clear();
      if (memoryOnly) return;
      try {
        storage()?.clear();
      } catch {
        memoryOnly = true;
      }
    },
  };
}

// After access fails, retain a consistent in-memory view for this page's lifetime.
export const safeLocalStorage = createSafeStorage("localStorage");
export const safeSessionStorage = createSafeStorage("sessionStorage");
