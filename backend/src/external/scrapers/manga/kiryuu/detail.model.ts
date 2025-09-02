export interface PageMeta {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogTitle?: string;
  ogType?: string;
  ogUrl?: string;
}

export interface YoastSchema {
  webPage?: {
    id?: string;
    url?: string;
    name?: string;
    datePublished?: string;
    dateModified?: string;
    thumbnailUrl?: string;
  };
  image?: {
    url?: string;
    width?: number | string;
    height?: number | string;
  };
  webSite?: {
    url?: string;
    name?: string;
  };
  organization?: {
    name?: string;
    logo?: string;
  };
  breadcrumb?: any; // Breadcrumb structure can be complex, using `any` for simplicity here.
}

export interface Breadcrumb {
  position?: string;
  name?: string;
  url?: string;
}

export interface MangaImages {
  cover?: string;
  banner?: string;
}

export interface Bookmark {
  enabled?: boolean;
  id?: string;
}

export interface Rating {
  value?: string;
  percentage?: string;
  count?: string;
}

export interface MangaInfo {
  status?: string;
  type?: string;
  released?: string;
  author?: string;
  postedBy?: string;
  postedOn?: string;
  updatedOn?: string;
  views?: string;
}

export interface Genre {
  name?: string;
  url?: string;
}

export interface Description {
  text?: string;
  html?: string;
}

export interface Chapter {
  number?: string;
  title?: string;
  url?: string;
  date?: string;
  downloadUrl?: string;
}

export interface ChapterLink {
  title?: string;
  url?: string;
}

export interface FirstLatest {
  first?: Partial<ChapterLink>;
  latest?: Partial<ChapterLink>;
}

export interface SocialShareLink {
  platform?: string;
  url?: string;
  ariaLabel?: string;
  target?: string;
}

export interface PopularItem {
  rank?: string;
  title?: string;
  url?: string;
  image?: string;
  genres?: Genre[];
  rating?: string;
  ratingPercentage?: string;
}

export interface Popular {
  weekly?: PopularItem[];
  monthly?: PopularItem[];
  allTime?: PopularItem[];
}

export interface NewSeriesItem {
  title?: string;
  url?: string;
  image?: string;
  genres?: Genre[];
  year?: string;
}

export interface RelatedSeriesItem {
  title?: string;
  url?: string;
  image?: string;
  status?: string;
  type?: string;
  chapter?: string;
  rating?: string;
  ratingPercentage?: string;
}

export interface Totals {
  chapterCount?: number;
  relatedCount?: number;
  popularTotal?: number;
}

export interface MangaDetail {
  pageMeta?: PageMeta;
  yoastSchema?: YoastSchema | null;
  breadcrumbs?: Breadcrumb[];
  title?: string;
  altTitles?: string[];
  images?: MangaImages;
  bookmark?: Bookmark;
  followedByPeople?: string;
  rating?: Rating;
  info?: MangaInfo;
  genres?: Genre[];
  description?: Description;
  chapters?: Chapter[];
  firstLatest?: FirstLatest;
  socialShare?: SocialShareLink[];
  sidebar?: {
    popular?: Popular;
    newSeries?: NewSeriesItem[];
  };
  relatedSeries?: RelatedSeriesItem[];
  totals?: Totals;
}