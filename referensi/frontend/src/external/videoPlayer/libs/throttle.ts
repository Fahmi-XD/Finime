/*!
 * just-throttle
 * Copyright (c) 2016 angus croll The MIT License (MIT)
 */

export default function throttle<T extends (...args: any[]) => any>(
  fn: T,
  interval: number,
  callFirst: boolean
): (...args: Parameters<T>) => ReturnType<T> | undefined {
  let wait = false;
  let callNow = false;
  return function (...args: Parameters<T>): ReturnType<T> | undefined {
    callNow = callFirst && !wait;
    const context = this;
    if (!wait) {
      wait = true;
      setTimeout(function () {
        wait = false;
        if (!callFirst) {
          return fn.apply(context, args);
        }
      }, interval);
    }
    if (callNow) {
      callNow = false;
      return fn.apply(this, args);
    }
  };
} 