const userAgent =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36";
const userAgent2 =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36";

interface FetchConfig {
  method?: string;
  responseType?: string;
  headers?: Record<string, string>;
  [key: string]: any;
}

export async function jinaAi(
  url: string,
  ref: string,
  fetchConfig?: FetchConfig,
  callback?: (response: Response) => void
): Promise<any> {
  const response = await fetch(`https://r.jina.ai/${url}`, {
    method: fetchConfig?.method || "GET",
    headers: {
      "User-Agent": userAgent2,
      Referer: ref,
      ...fetchConfig?.headers,
      'Authorization': 'Bearer jina_f8719ed869a545309dc2a774b9efc5c0rLBO0XhWdlXvXZ3VBIGMF7OKoi-e',
      'Accept': 'application/json',
      'X-Return-Format': 'html'
    },
    body: fetchConfig?.data,
  });

  if (callback) callback(response);

  const jsn = (await response.json() as any)

  if (response.status === 403) {
    return {
      error: "Access denied. You may need to use a different user agent or check the URL.",
      status: response.status,
    };
  }

  if (fetchConfig?.responseType === "text") {
    return jsn.data.html;
  }

  return jsn.data.html;
}

export async function wajikFetch(
  url: string,
  ref: string,
  fetchConfig?: FetchConfig,
  callback?: (response: Response) => void
): Promise<any> {
  const response = await fetch(url, {
    method: fetchConfig?.method || "GET",
    headers: {
      "User-Agent": userAgent2,
      Referer: ref,
      ...fetchConfig?.headers,
    },
    body: fetchConfig?.data,
  });

  if (callback) callback(response);

  if (response.status === 403) {
    return {
      error: "Access denied. You may need to use a different user agent or check the URL.",
      status: response.status,
    };
  }

  if (fetchConfig?.responseType === "text") {
    return await response.text();
  }

  return await response.json();
}

export async function getFinalUrl(
  url: string,
  ref: string,
  fetchConfig?: FetchConfig
): Promise<any> {
  const response = await fetch(url, {
    method: "HEAD",
    headers: {
      "User-Agent": userAgent2,
      Referer: ref,
      ...fetchConfig?.headers,
    },
    redirect: "manual",
  });

  const location = response.headers.get("location");

  if (location) return location;

  return url;
}

export async function getFinalUrls(
  urls: string[],
  ref: string,
  config: {
    fetchConfig?: FetchConfig;
    retryConfig?: {
      retries?: number;
      delay?: number;
    };
  }
): Promise<any[]> {
  const { retries = 3, delay = 1000 } = config.retryConfig || {};

  const retryRequest = async (url: string): Promise<any> => {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        return await getFinalUrl(url, ref, config.fetchConfig);
      } catch (error) {
        if (attempt === retries) throw error;

        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  };

  const requests = urls.map((url) => retryRequest(url));
  const responses = await Promise.allSettled(requests);

  const results = responses.map((response) => {
    if (response.status === "fulfilled") return response.value;

    return "";
  });

  return results;
}
