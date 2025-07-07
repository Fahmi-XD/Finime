import HttpException from "./httpException.js";

export function getQParam(query: Record<string, unknown>): string | Response {
  const q = query.q;

  if (q === undefined || typeof q !== "string") {
    return HttpException.standarException(400, { q: "masukkan query parameter: ?q=string" });
  }

  return q;
}

export function getUrlParam(query: Record<string, unknown>): string | Response {
  const url = query.url;

  if (!url || typeof url !== "string") {
    return HttpException.standarException(400, { url: "masukkan query parameter: ?url=string" });
  }

  return url;
}

export function getPageParam(query: Record<string, unknown>): number | Response {
  const error = {
    status: 400,
    message: "masukkan query parameter: ?page=number",
  };

  const raw = query.page;

  if (raw === undefined) return 1;
  const page = Number(raw);

  if (isNaN(page) || page < 1) {
    return HttpException.standarException(400, error);
  }

  return page;
}
