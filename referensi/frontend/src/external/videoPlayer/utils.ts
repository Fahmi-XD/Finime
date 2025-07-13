export function extensionToMimeType(filename: string): string | undefined {
  const mimes: Record<string, string> = { mp4: 'video/mp4', ogv: 'video/ogg', webm: 'video/webm' };
  const ext = (filename.match(/\.([^.]*?)(?=\?|#|$)/) || [])[1];
  if (ext in mimes) return mimes[ext];
  return undefined;
}

export function prepareVideoSources(source: string | string[] | undefined): Array<{ src: string; type?: string }> {
  let sources: Array<{ src: string; type?: string }>;
  if (!source) {
    sources = [];
  } else if (source instanceof Array) {
    sources = source
      .map((item) => {
        const type = extensionToMimeType(item);
        return typeof type === 'undefined' ? { src: item } : { src: item, type };
      })
      .filter((item) => item);
  } else {
    const type = extensionToMimeType(source);
    sources = typeof type === 'undefined' ? [{ src: source }] : [{ src: source, type }];
  }
  return sources;
}

export function uid(): string {
  let firstPart = (Math.random() * 46656) | 0;
  let secondPart = (Math.random() * 46656) | 0;
  firstPart = ('000' + firstPart.toString(36)).slice(-3);
  secondPart = ('000' + secondPart.toString(36)).slice(-3);
  return firstPart + secondPart;
}

export async function preloadImage(url: string): Promise<HTMLImageElement | undefined> {
  return new Promise((resolve, reject) => {
    if (url) {
      const image = new Image();
      image.addEventListener(
        'load',
        () => {
          resolve(image);
        },
        { once: true }
      );
      image.addEventListener(
        'error',
        () => {
          resolve(undefined);
        },
        { once: true }
      );
      image.src = url;
    } else {
      resolve(undefined);
    }
  });
}
