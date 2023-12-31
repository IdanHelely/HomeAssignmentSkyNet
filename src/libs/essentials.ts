import { useEffect, useState } from 'react';

const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const randomId = (length: number = 16) => {
  let res = '';

  for (let i = 0; i < length; i++) {
    res += alphabet[Math.floor(Math.random() * (alphabet.length - 1 - 0))];
  }

  return res;
};

/**
 *
 * @param value the value that changes
 * @param delay the number of seconds until the debounced value changes
 * @returns the value but changes after there was no change and the time of the delay ran out
 */
function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay ?? 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

export { randomId, useDebounce };
