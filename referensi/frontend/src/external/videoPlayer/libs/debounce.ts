/*!
 * just-debounce-it
 * Copyright (c) 2016 angus croll The MIT License (MIT)
 */

export default function debounce<T extends (...args: any[]) => any>(
  fn: T,
  wait: number,
  callFirst: boolean
): (...args: Parameters<T>) => ReturnType<T> | undefined {
  let timeout: number | null = null;
  return function (...args: Parameters<T>): ReturnType<T> | undefined {
    if (!wait) {
      return fn.apply(this, args);
    }
    const context = this;
    const callNow = callFirst && !timeout;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(function () {
      timeout = null;
      if (!callNow) {
        return fn.apply(context, args);
      }
    }, wait);

    if (callNow) {
      return fn.apply(this, args);
    }
  };
} 