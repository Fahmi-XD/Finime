export function truncate(string: string, length: number = 51) {
  return string.length > length ? string.slice(0, length - 3) + "..." : string;
}