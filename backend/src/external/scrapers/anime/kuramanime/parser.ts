import * as cheerio from 'cheerio';

export interface AnimeDownloadLink {
  label: string;
  url: string;
}

export interface AnimeDownloadGroup {
  type: string;
  links: AnimeDownloadLink[];
}

export interface AnimeEpisodeDetail {
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
}

export function parseAnimeEpisodeDetail(html: string): AnimeEpisodeDetail {
  const $ = cheerio.load(html);

  // Meta tags
  const meta: Record<string, string|undefined> = {};
  $('meta').each((_, el) => {
    const name = $(el).attr('name') || $(el).attr('property');
    if (name) meta[name] = $(el).attr('content');
  });

  // Title
  const title = $('title').text().trim();
  // Canonical
  const canonical = $('link[rel="canonical"]').attr('href') || '';
  // Description
  const description = $('meta[name="description"]').attr('content') || '';

  // OG tags
  const og: Record<string, string|undefined> = {};
  $('meta[property^="og:"]').each((_, el) => {
    const name = $(el).attr('property');
    if (name) og[name] = $(el).attr('content');
  });
  // Twitter tags
  const twitter: Record<string, string|undefined> = {};
  $('meta[name^="twitter:"]').each((_, el) => {
    const name = $(el).attr('name');
    if (name) twitter[name] = $(el).attr('content');
  });
  // Keywords
  const keywords = (meta['keywords'] || '').split(',').map(s => s.trim()).filter(Boolean);
  // Published time
  const publishedTime = meta['article:published_time'];

  // Hidden inputs
  const hiddenInputs: Record<string, string> = {};
  $('input[type="hidden"]').each((_, el) => {
    const id = $(el).attr('id');
    const value = $(el).attr('value') || '';
    if (id) hiddenInputs[id] = value;
  });

  // Breadcrumb (if any)
  const breadcrumb: { name: string; url?: string }[] = [];
  $('.breadcrumb-option a').each((_, el) => {
    breadcrumb.push({ name: $(el).text().trim(), url: $(el).attr('href') });
  });
  $('.breadcrumb-option span').each((_, el) => {
    const name = $(el).text().trim();
    if (name) breadcrumb.push({ name });
  });

  // Server mirrors (from select#changeServer)
  const servers: { value: string; label: string }[] = [];
  $('#changeServer option').each((_, el) => {
    servers.push({
      value: $(el).attr('value') || '',
      label: $(el).text().trim(),
    });
  });

  // Download links (from #animeDownloadLink), grouped by type (e.g. h6 as group title)
  const downloadLinks: AnimeDownloadGroup[] = [];
  let currentGroup: AnimeDownloadGroup | null = null;
  $('#animeDownloadLink').children().each((_, el) => {
    if ($(el).is('h6')) {
      // Start new group
      if (currentGroup) downloadLinks.push(currentGroup);
      currentGroup = { type: $(el).text().trim(), links: [] };
    } else if ($(el).is('a')) {
      if (currentGroup) {
        const url = $(el).attr('href') || '';
        const label = $(el).text().trim() || url;
        if (url) currentGroup.links.push({ label, url });
      }
    }
  });
  if (currentGroup) downloadLinks.push(currentGroup);

  // Other hidden fields
  const timezone = hiddenInputs['selTimezone'];
  const nowPlus1Sec = hiddenInputs['nowPlus1Sec'];
  const updatedAtPlus5Min = hiddenInputs['updatedAtPlus5Min'];
  const updatedAtPlus2Min = hiddenInputs['updatedAtPlus2Min'];
  const isNot48Hours = hiddenInputs['isNot48Hours'];
  const checkEp = hiddenInputs['checkEp'];
  const checkBatch = hiddenInputs['checkBatch'];
  const exactPostId = hiddenInputs['exactPostId'];
  const saveWatchHistoryRoute = hiddenInputs['saveWatchHistoryRoute'];
  const kuramaskipStatus = hiddenInputs['kuramaskipStatus'];
  const driveCheckPingRoute = hiddenInputs['driveCheckPingRoute'];
  const driveCheckQuotaRoute = hiddenInputs['driveCheckQuotaRoute'];

  return {
    meta,
    title,
    canonical,
    description,
    og,
    twitter,
    keywords,
    publishedTime,
    animeId: hiddenInputs['animeId'],
    postId: hiddenInputs['postId'],
    isEpisode: hiddenInputs['isEpisode'],
    isHentai: hiddenInputs['isHentai'],
    hiddenInputs,
    breadcrumb,
    timezone,
    nowPlus1Sec,
    updatedAtPlus5Min,
    updatedAtPlus2Min,
    isNot48Hours,
    checkEp,
    checkBatch,
    exactPostId,
    saveWatchHistoryRoute,
    kuramaskipStatus,
    driveCheckPingRoute,
    driveCheckQuotaRoute,
    servers,
    downloadLinks,
  };
}
