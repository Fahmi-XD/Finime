// place files you want to import through the `$lib` alias in this folder.

function truncate(text: string, maxLength: number) {
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
}

export { truncate };