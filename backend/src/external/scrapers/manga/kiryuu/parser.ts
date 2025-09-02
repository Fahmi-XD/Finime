import { Scrape } from "@external/scrapers/scrape.js";
import FormData from "form-data";

import type { MangaData, ScrapedData } from "./genre.model.js";
import type { ISearchModel, All } from "./search.model.js";
import type { PageMeta, YoastSchema, Genre, Description, Rating, Chapter, PopularItem, ChapterLink, SocialShareLink, Bookmark, Popular, RelatedSeriesItem, NewSeriesItem, Breadcrumb, FirstLatest, MangaDetail } from "./detail.model.js";
import type { CheerioAPI, Cheerio, Element } from "cheerio";

export class KiryuuParser extends Scrape {

  static baseUrl = "https://kiryuu02.com";

  static async byGenre(genre: string, page: string) {
    const GENRE_MAP: Record<string, string> = {
      "4-koma": "2400",
      "action": "2",
      "adaptation": "3475",
      "adult": "128",
      "adventure": "3",
      "animals": "8050",
      "anthology": "4701",
      "antihero": "8431",
      "award winning": "7613",
      "beasts": "8555",
      "bodyswap": "8052",
      "boys' love": "7695",
      "bully": "6565",
      "cartoon": "8053",
      "childhood friends": "8171",
      "comedy": "14",
      "comic": "8054",
      "cooking": "1372",
      "crime": "5175",
      "crossdressing": "5820",
      "dance": "7980",
      "dark fantasy": "6264",
      "delinquent": "6566",
      "delinquents": "7578",
      "dementia": "8055",
      "demon": "5464",
      "demons": "37",
      "doujinshi": "902",
      "drama": "11",
      "dungeons": "8056",
      "ecchi": "66",
      "emperor's daughter": "8087",
      "fan-colored": "8088",
      "fantas": "8462",
      "fantasy": "4",
      "fetish": "8057",
      "full color": "4460",
      "game": "1494",
      "games": "4242",
      "gang": "6848",
      "gender bender": "84",
      "genderswap": "5614",
      "ghosts": "7600",
      "girls": "7669",
      "girls' love": "6119",
      "gore": "2167",
      "gorre": "6286",
      "gyaru": "6343",
      "harem": "23",
      "hero": "7497",
      "historical": "24",
      "horror": "67",
      "imageset": "8058",
      "incest": "5620",
      "isekai": "15",
      "josei": "78",
      "josei(w)": "7675",
      "kids": "8017",
      "leveling": "3434",
      "loli": "1315",
      "lolicon": "852",
      "long strip": "5623",
      "mafia": "7599",
      "magi": "7330",
      "magic": "38",
      "magical girls": "5569",
      "manga": "5055",
      "manhua": "1048",
      "manhwa": "1311",
      "martial art": "1720",
      "martial arts": "18",
      "mature": "30",
      "mecha": "329",
      "medical": "1709",
      "military": "3510",
      "mirror": "6850",
      "modern": "4376",
      "monster girls": "5657",
      "monsters": "5656",
      "murim": "5587",
      "music": "2024",
      "mystery": "7",
      "necromancer": "4377",
      "ninja": "8059",
      "non-human": "8060",
      "office workers": "7614",
      "official colored": "5777",
      "one-shot": "3956",
      "oneshot": "3419",
      "overpowered": "4378",
      "parody": "3872",
      "pets": "4379",
      "philosophical": "6455",
      "police": "4975",
      "post-apocalyptic": "6122",
      "project": "5840",
      "psychological": "92",
      "regression": "5862",
      "reincarnation": "40",
      "revenge": "7676",
      "reverse harem": "7655",
      "reverse isekai": "8061",
      "romance": "8",
      "royal family": "7670",
      "royalty": "7671",
      "school": "1194",
      "school life": "12",
      "sci-fi": "49",
      "seinen": "19",
      "seinen(m)": "7677",
      "seinin": "5182",
      "sexual violence": "5622",
      "shotacon": "1519",
      "shoujo": "9",
      "shoujo ai": "240",
      "shoujo(g)": "7672",
      "shounen": "5",
      "shounen ai": "97",
      "shounen(b)": "7673",
      "shounn": "6500",
      "showbiz": "8015",
      "slice of life": "20",
      "smut": "1070",
      "space": "8062",
      "sport": "8010",
      "sports": "166",
      "super power": "3613",
      "superhero": "4479",
      "supernatural": "21",
      "supranatural": "5599",
      "survival": "5886",
      "system": "3493",
      "thriller": "1124",
      "time travel": "6056",
      "traditional games": "8063",
      "tragedy": "36",
      "transmigration": "8051",
      "vampire": "4024",
      "vampires": "5617",
      "video games": "5616",
      "villainess": "7150",
      "violence": "5660",
      "virtual reality": "5615",
      "web comic": "5626",
      "webtoon": "7674",
      "webtoons": "701",
      "wuxia": "378",
      "xuanhuan": "8064",
      "yaoi": "903",
      "yuri": "224",
      "zombies": "5877"
    }
    return await this.htmlParser<Partial<ScrapedData>>({
      url: this.baseUrl + "/manga/?page=" + page + "&genre%5B%5D=" + GENRE_MAP[genre.toLocaleLowerCase()] + "&order=update",
      initial: {},
      cf: false
    }, async ($, data) => {
      const mangaList: MangaData[] = [];

      // Select all manga items in the main list
      $('.listupd .bs .bsx').each((index: number, element: any) => {
        const $element = $(element);

        // Extract title and URL
        const titleElement = $element.find('.tt');
        const title = titleElement.text().trim();
        const url = $element.find('a').attr('href') || '';

        // Extract image
        const imageElement = $element.find('img');
        const image = imageElement.attr('src') || '';

        // Extract chapter info
        const chapterElement = $element.find('.epxs');
        const chapter = chapterElement.text().trim();

        // Extract rating
        const ratingElement = $element.find('.numscore');
        const rating = ratingElement.text().trim();

        // Extract rating percentage
        const ratingBarElement = $element.find('.rtb span');
        const ratingPercentage = ratingBarElement.attr('style')?.match(/width:(\d+%)/)?.pop() || '0%';

        // Extract type (Manga, Manhwa, Manhua, etc.)
        const typeElement = $element.find('.type');
        const type = typeElement.text().trim();

        // Check if it's hot
        const isHot = $element.find('.hotx').length > 0;

        // Check if it's colored
        const isColored = $element.find('.colored').length > 0;

        // Extract genres (if available in the main list)
        const genres: string[] = [];
        $element.find('.genres a').each((_, genreElement) => {
          const genre = $(genreElement).text().trim();
          if (genre) genres.push(genre);
        });

        if (title) {
          mangaList.push({
            title,
            url,
            image,
            chapter,
            rating,
            ratingPercentage,
            type,
            isHot,
            isColored,
            genres: genres.length > 0 ? genres : undefined
          });
        }
      });

      return {
        manga: mangaList
      };
    })
  }

  static async search(query: string) {
    let data = new FormData();
    data.append('action', 'ts_ac_do_search');
    data.append('ts_ac_query', query);

    return await this.apiParser<ISearchModel, All[]>({
      url: this.baseUrl + "/wp-admin/admin-ajax.php",
      initial: [],
      method: "POST",
      body: data,
      headers: data.getHeaders(),
      cf: false
    }, async (response, data) => {
      return response.series?.[0]?.all || [];
    })
  }

  static async detail(slug: string) {
    return await this.htmlParser<MangaDetail>({
      url: this.baseUrl + "/manga/" + slug + "/",
      initial: {},
      cf: false
    }, async ($, data) => {
      function getBackgroundImageUrl(styleValue: string | undefined): string {
        if (!styleValue) return '';
        const match = styleValue.match(/url\(['"]?(.*?)['"]?\)/i);
        return match ? match[1] : '';
      }

      function extractWidthPercent(styleValue: string | undefined): string {
        if (!styleValue) return '0%';
        const match = styleValue.match(/width:\s*(\d+%)\b/i);
        return match ? match[1] : '0%';
      }

      function cleanText(text: string | null | undefined): string {
        return (text || '')
          .replace(/\s+/g, ' ')
          .replace(/^\s+|\s+$/g, '')
          .trim();
      }

      function textOf($: CheerioAPI, el: Element): string {
        return cleanText($(el).text());
      }

      function attrOf($: CheerioAPI, el: Cheerio<Element>, name: string): string {
        const v = $(el).attr(name);
        return typeof v === 'string' ? v : '';
      }


      // =================================================================
      // SECTION: PARSING FUNCTIONS
      // Fungsi-fungsi spesifik untuk mengekstrak setiap bagian dari HTML.
      // =================================================================

      function parseInfoTable($: CheerioAPI): Record<string, string> {
        const info: Record<string, string> = {};
        $('table.infotable tbody tr').each((_, tr) => {
          const key = cleanText($(tr).find('td').eq(0).text());
          const val = cleanText($(tr).find('td').eq(1).text());
          if (!key) return;
          info[key.toLowerCase()] = val;
        });
        return info;
      }

      function parseGenres($: CheerioAPI): Genre[] {
        const genres: Genre[] = [];
        $('.seriestugenre a[rel="tag"]').each((_, a) => {
          const name = cleanText($(a).text());
          const url = attrOf($, $(a), 'href');
          if (name) genres.push({ name, url });
        });
        return genres;
      }

      function parseAltTitles($: CheerioAPI): string[] {
        const altRaw = cleanText($('.seriestualt').text());
        if (!altRaw) return [];
        return altRaw
          .split(',')
          .map((s) => cleanText(s))
          .filter(Boolean);
      }

      function parseDescription($: CheerioAPI): Description {
        const container = $('.entry-content.entry-content-single').first();
        const html = container.html() || '';
        const text = cleanText(container.text());
        return { text, html };
      }

      function parseRating($: CheerioAPI): Rating {
        const ratingValue = cleanText($('.rating .num[itemprop="ratingValue"], .rating .num, .numscore').first().text());
        const ratingCountMeta = $('meta[itemprop="ratingCount"]').attr('content');
        const ratingCount = ratingCountMeta ? cleanText(ratingCountMeta) : '';
        const barWidth = extractWidthPercent($('.rating .rtb span').attr('style'));
        return {
          value: ratingValue,
          percentage: barWidth,
          count: ratingCount
        };
      }

      function parseFollowedCount($: CheerioAPI): string {
        const text = cleanText($('.bmc').text());
        const match = text.match(/(\d+[\d,.]*)/);
        return match ? match[1] : '';
      }

      function parseChapters($: CheerioAPI): Chapter[] {
        const chapters: Chapter[] = [];
        $('#chapterlist ul.clstyle > li').each((_, li) => {
          const $li = $(li);
          const numberAttr = $li.attr('data-num') || '';
          const a = $li.find('.eph-num a').first();
          const url = attrOf($, a, 'href');
          const title = cleanText($li.find('.chapternum').first().text());
          const date = cleanText($li.find('.chapterdate').first().text());
          const downloadUrl = attrOf($, $li.find('.dt a.dload').first(), 'href');

          chapters.push({
            number: numberAttr,
            title,
            url,
            date,
            downloadUrl
          });
        });
        return chapters;
      }

      function parsePopularGroup($: CheerioAPI, selector: string): PopularItem[] {
        const list: PopularItem[] = [];
        $(`${selector} ul > li`).each((_, li) => {
          const $li = $(li);
          const rank = cleanText($li.find('.ctr').first().text());
          const a = $li.find('h2 a.series').first();
          const url = attrOf($, a, 'href');
          const title = cleanText(a.text());
          const img = attrOf($, $li.find('.imgseries img').first(), 'src');
          const genres: Genre[] = [];
          $li.find('.leftseries span a[rel="tag"]').each((_, g) => {
            const name = cleanText($(g).text());
            const gurl = attrOf($, $(g), 'href');
            if (name) genres.push({ name, url: gurl });
          });
          const ratingValue = cleanText($li.find('.numscore').first().text());
          const ratingPercentage = extractWidthPercent($li.find('.rtb span').first().attr('style'));
          list.push({ rank, title, url, image: img, genres, rating: ratingValue, ratingPercentage });
        });
        return list;
      }

      function parsePopular($: CheerioAPI): Popular {
        return {
          weekly: parsePopularGroup($, '.wpop-weekly'),
          monthly: parsePopularGroup($, '.wpop-monthly'),
          allTime: parsePopularGroup($, '.wpop-alltime')
        };
      }

      function parseRelatedSeries($: CheerioAPI): RelatedSeriesItem[] {
        const related: RelatedSeriesItem[] = [];
        $('.bixbox:has(.releases h2 span:contains("Related Series")) .listupd .bs .bsx').each((_, card) => {
          const $card = $(card);
          const a = $card.find('a').first();
          const url = attrOf($, a, 'href');
          const title = cleanText($card.find('.tt').first().text());
          const image = attrOf($, $card.find('img').first(), 'src');
          const status = cleanText($card.find('.status').first().text());
          const type = cleanText($card.find('.type').first().text());
          const chapter = cleanText($card.find('.epxs').first().text());
          const rating = cleanText($card.find('.numscore').first().text());
          const ratingPercentage = extractWidthPercent($card.find('.rtb span').first().attr('style'));

          related.push({ title, url, image, status, type, chapter, rating, ratingPercentage });
        });
        return related;
      }

      function parsePageMeta($: CheerioAPI): PageMeta {
        return {
          title: cleanText($('title').text()),
          description: $('meta[name="description"]').attr('content') || '',
          canonicalUrl: $('link[rel="canonical"]').attr('href') || '',
          ogImage: $('meta[property="og:image"]').attr('content') || '',
          ogTitle: $('meta[property="og:title"]').attr('content') || '',
          ogType: $('meta[property="og:type"]').attr('content') || '',
          ogUrl: $('meta[property="og:url"]').attr('content') || ''
        };
      }

      function parseBreadcrumbs($: CheerioAPI): Breadcrumb[] {
        const crumbs: Breadcrumb[] = [];
        $('[itemtype="https://schema.org/BreadcrumbList"] [itemtype="https://schema.org/ListItem"]').each((_, li) => {
          const name = cleanText($(li).find('[itemprop="name"]').first().text());
          const url = attrOf($, $(li).find('[itemprop="item"]').first(), 'href');
          const position = cleanText($(li).find('[itemprop="position"]').attr('content')) || '';
          if (name) crumbs.push({ position, name, url });
        });
        return crumbs;
      }

      function parseFirstLatest($: CheerioAPI): FirstLatest {
        const first: Partial<ChapterLink> = {};
        const latest: Partial<ChapterLink> = {};
        const blocks = $('.lastend .inepcx');
        const firstBlock = blocks.eq(0);
        const latestBlock = blocks.eq(1);

        if (firstBlock.length) {
          first.title = cleanText(firstBlock.find('.epcur.epcurfirst').text());
          first.url = attrOf($, firstBlock.find('a').first(), 'href');
        }
        if (latestBlock.length) {
          latest.title = cleanText(latestBlock.find('.epcur.epcurlast').text());
          latest.url = attrOf($, latestBlock.find('a').first(), 'href');
        }
        return { first, latest };
      }

      function parseSocialShare($: CheerioAPI): SocialShareLink[] {
        const shares: SocialShareLink[] = [];
        $('.socialts a').each((_, a) => {
          const platform = cleanText($(a).find('span').first().text()) || cleanText($(a).attr('class') || '');
          const url = attrOf($, $(a), 'href');
          const aria = attrOf($, $(a), 'aria-label');
          const target = attrOf($, $(a), 'target');
          shares.push({ platform, url, ariaLabel: aria, target });
        });
        return shares;
      }

      function parseSidebarNewSeries($: CheerioAPI): NewSeriesItem[] {
        const items: NewSeriesItem[] = [];
        $('#sidebar .section:has(.releases h3:contains("Serial baru")) .serieslist ul li').each((_, li) => {
          const $li = $(li);
          const a = $li.find('a.series').first();
          const url = attrOf($, a, 'href');
          const title = cleanText($li.find('h2 a.series').first().text());
          const image = attrOf($, $li.find('img').first(), 'src');
          const genres: Genre[] = [];
          $li.find('span a[rel="tag"]').each((_, g) => {
            const name = cleanText($(g).text());
            const gurl = attrOf($, $(g), 'href');
            if (name) genres.push({ name, url: gurl });
          });
          const yearText = cleanText($li.find('.leftseries > span').last().text());
          const yearMatch = yearText.match(/\b\d{4}\b/);
          const year = yearMatch ? yearMatch[0] : '';
          if (title) items.push({ title, url, image, genres, year });
        });
        return items;
      }

      function parseYoastSchema($: CheerioAPI): YoastSchema | null {
        const node = $('script.yoast-schema-graph[type="application/ld+json"]').first();
        if (!node.length) return null;
        try {
          const json = JSON.parse(node.text());
          const graph = Array.isArray(json['@graph']) ? json['@graph'] : [];
          const webPage = graph.find((n) => n['@type'] === 'WebPage') || {};
          const imageObj = graph.find((n) => n['@type'] === 'ImageObject') || {};
          const webSite = graph.find((n) => n['@type'] === 'WebSite') || {};
          const organization = graph.find((n) => n['@type'] === 'Organization') || {};
          const breadcrumb = graph.find((n) => n['@type'] === 'BreadcrumbList') || {};
          return {
            webPage: {
              id: webPage['@id'] || '',
              url: webPage.url || '',
              name: webPage.name || '',
              datePublished: webPage.datePublished || '',
              dateModified: webPage.dateModified || '',
              thumbnailUrl: webPage.thumbnailUrl || ''
            },
            image: {
              url: imageObj.url || imageObj.contentUrl || '',
              width: imageObj.width || '',
              height: imageObj.height || ''
            },
            webSite: {
              url: webSite.url || '',
              name: webSite.name || webSite.alternateName || ''
            },
            organization: {
              name: organization.name || '',
              logo: ((organization.logo || {}).url) || ''
            },
            breadcrumb
          };
        } catch (_) {
          return null;
        }
      }

      // Hero section
      const pageTitle = cleanText($('h1.entry-title').first().text());
      const altTitles = parseAltTitles($);
      const coverImage = attrOf($, $('.seriestucontl .thumb img').first(), 'src');
      const bannerStyle = attrOf($, $('.bigbanner').first(), 'style');
      const bannerImage = getBackgroundImageUrl(bannerStyle);
      const followedCount = parseFollowedCount($);
      const rating = parseRating($);

      // Info table
      const info = parseInfoTable($);
      const views = info['views'] || cleanText($('.ts-views-count').first().text());

      const genres = parseGenres($);
      const description = parseDescription($);
      const chapters = parseChapters($);
      const firstLatest = parseFirstLatest($);
      const popular = parsePopular($);
      const related = parseRelatedSeries($);
      const breadcrumbs = parseBreadcrumbs($);
      const socialShare = parseSocialShare($);
      const sidebarNewSeries = parseSidebarNewSeries($);
      const pageMeta = parsePageMeta($);
      const yoastSchema = parseYoastSchema($);

      // Bookmark data-id
      const bookmark: Bookmark = {
        enabled: $('.bookmark[tk-bookmark]').length > 0,
        id: $('.bookmark[tk-bookmark]').attr('data-bookmark-id') || ''
      };

      return {
        pageMeta,
        yoastSchema,
        breadcrumbs,
        title: pageTitle,
        altTitles,
        images: {
          cover: coverImage,
          banner: bannerImage
        },
        bookmark,
        followedByPeople: followedCount,
        rating,
        info: {
          status: info['status'] || '',
          type: info['type'] || '',
          released: info['released'] || '',
          author: info['author'] || '',
          postedBy: info['posted by'] || '',
          postedOn: info['posted on'] || '',
          updatedOn: info['updated on'] || '',
          views
        },
        genres,
        description,
        chapters,
        firstLatest,
        socialShare,
        sidebar: {
          popular,
          newSeries: sidebarNewSeries
        },
        relatedSeries: related,
        totals: {
          chapterCount: chapters.length,
          relatedCount: related.length,
          popularTotal: (popular?.weekly?.length || 0) + (popular?.monthly?.length || 0) + (popular?.allTime?.length || 0)
        }
      };
    });
  }

  static async chapterImage(slug: string) {
    return await this.htmlParser<string[]>({
      url: this.baseUrl + "/" + slug + "/",
      initial: [],
      cf: false
    }, async ($, data) => {
      // cari <noscript> di dalam div
      const noscriptContent = $('#readerarea noscript').html();

      // load ulang noscript HTML ke cheerio
      const $$ = this.cheerio.load(noscriptContent || "");

      // ambil semua <img>
      const images = $$('img').map((i, el) => $$(el).attr('src')).get();

      return images;
    })
  }

}