export interface AnimeDownloadLink {
  label: string;
  url: string;
}

export interface AnimeDownloadGroup {
  type: string;
  links: AnimeDownloadLink[];
}

export interface IAnimeEpisodeDetail {
  meta: Record<string, string|undefined>;
  title: string;
  canonical: string;
  description: string;
  og: Record<string, string|undefined>;
  twitter: Record<string, string|undefined>;
  keywords: string[];
  publishedTime?: string;
  animeId?: string;
  postId?: string;
  isEpisode?: string;
  isHentai?: string;
  hiddenInputs: Record<string, string>;
  breadcrumb: { name: string; url?: string }[];
  timezone?: string;
  nowPlus1Sec?: string;
  updatedAtPlus5Min?: string;
  updatedAtPlus2Min?: string;
  isNot48Hours?: string;
  checkEp?: string;
  checkBatch?: string;
  exactPostId?: string;
  saveWatchHistoryRoute?: string;
  kuramaskipStatus?: string;
  driveCheckPingRoute?: string;
  driveCheckQuotaRoute?: string;
  servers?: { value: string; label: string }[];
  downloadLinks?: AnimeDownloadGroup[];
  videoUrls: string[] | string;
}