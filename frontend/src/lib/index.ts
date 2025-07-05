// place files you want to import through the `$lib` alias in this folder.

export function jsonKeyToTitleCase<T>(data: T): T {
  if (typeof data !== 'object' || data === null) {
    return data;
  }

  if (Array.isArray(data)) {
    return data.map(item => jsonKeyToTitleCase(item)) as unknown as T;
  }

  const newData: any = {};
  for (const key in data) {
    const newKey = key.replace(/(^\D|_[\D])/g, (_, letter) => letter.toUpperCase()).replace(/_/g, ' ');
    newData[newKey] = jsonKeyToTitleCase(data[key]);
  }
  return newData as T;
}

export function keyToTitleCase(key: string): string {
  const strKey = key.replace(/(^\D|_[\D])/g, (_, letter) => letter.toUpperCase()).replace(/_/g, ' ');

  return strKey;
}

export function truncate(str: string, maxLen = 11) {
  if (typeof str !== "string") throw new TypeError("Expected a string");
  return str.length > maxLen ? str.slice(0, maxLen) + "..." : str;
}