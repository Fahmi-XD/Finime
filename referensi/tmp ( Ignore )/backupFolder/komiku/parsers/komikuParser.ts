/**
 * Scraper Dari Website Komiku
 */

import Scrape from "@scrapers/scrape.js";
import * as IKOMIKU from "../models/komikuModel.js";

export class KomikuParser extends Scrape {

  private static readonly baseUrl = "https://api.komiku.org/";
  private static readonly replaceMangaPage = "https://komiku.org";

  static async getPopularManga(pagenumber: string) {
    const path = pagenumber === "1" ? `other/rekomendasi/` : `other/rekomendasi/page/${pagenumber}/`;

    return this.htmlParser(
      {
        url: this.baseUrl + path,
        initial: {
          status: false,
          message: "Tidak dapat menemukan manga yang anda cari.",
          manga_list: [],
        }
      },

      async ($) => {
        const element = $(".bge");
        let thumb, title, endpoint, type, upload_on, sortDesc;
        let manga_list: any = [];
        element.each((idx, el) => {
          title = $(el).find(".kan").find("h3").text().trim();
          endpoint = $(el)?.find("a")?.attr("href")?.replace(this.replaceMangaPage, "").replace("/manga/", "");
          type = $(el).find("div.bgei > a > div.tpe1_inf > b").text();
          thumb = $(el).find("div.bgei > a > img").attr("src");
          sortDesc = $(el).find("div.kan > p").text().trim();
          upload_on = $(el).find("div.kan > span.judul2").text().split("•")[1].trim();
          manga_list.push({
            title,
            type,
            thumb,
            endpoint,
            upload_on,
            sortDesc
          });
        });

        return {
          status: true,
          message: "success",
          manga_list,
        }
      }
    );
  }

  static async getUpdateManga(orderBy: string) {
    const path = `other/hot/?orderby=${orderBy}&tipe=manga`;

    return this.htmlParser(
      {
        url: this.baseUrl + path,
        initial: {
          status: false,
          message: "Tidak dapat menemukan manga update.",
          manga_list: [],
        }
      },

      async ($) => {
        const element = $(".bge");
        let thumb, title, endpoint, type, upload_on, sortDesc, view;
        let manga_list: any = [];
        element.each((idx, el) => {
          title = $(el).find(".kan").find("h3").text().trim();
          endpoint = $(el)?.find("a")?.attr("href")?.replace(this.replaceMangaPage, "").replace("/manga/", "");
          type = $(el).find("div.bgei > a > div.tpe1_inf > b").text();
          thumb = $(el).find("div.bgei > a > img").attr("src");
          view = $(el).find("div.kan > .judul2").text();
          sortDesc = $(el).find("div.kan > p").text().trim();
          upload_on = $(el).find("div.kan > span.judul2").text().split("•")[1].trim();
          manga_list.push({
            title,
            type,
            thumb,
            endpoint,
            upload_on,
            view,
            sortDesc
          });
        });

        return {
          status: true,
          message: "success",
          manga_list,
        }
      }
    );
  }

  static async searchManga(query: string) {
    const url = this.baseUrl + `?post_type=manga&s=${query}`;

    return this.htmlParser(
      {
        url,
        initial: {
          status: true,
          message: "Gagal mendapatkan list manga.",
          manga_list: [],
        }
      },

      async ($) => {
        const element = $(".bge");
        let manga_list: any = [];
        let title, thumb, type, endpoint, updated_on;
        element.each((idx, el) => {
          endpoint = $(el).find("a").attr("href")?.replace(this.replaceMangaPage, "").replace("/manga/", "");
          thumb = $(el).find("div.bgei > a > img").attr("data-src") || $(el).find("div.bgei > a > img").attr("src");
          type = $(el).find("div.bgei > a > div.tpe1_inf > b").text();
          title = $(el).find(".kan").find("h3").text().trim();
          updated_on = $(el).find("div.kan > p").text().split(".")[0].trim();
          manga_list.push({
            title,
            thumb,
            type,
            endpoint,
            updated_on,
          });
        });

        return {
          status: true,
          message: "success",
          manga_list,
        };
      }
    )
  }

  static async mangaPagination(pagenumber: string) {
    const path = pagenumber === "1" ? "/manga/" : `/manga/page/${pagenumber}/`;
    const url = this.baseUrl + path;

    return this.htmlParser(
      {
        url,
        initial: {
          status: true,
          message: "Gagal mendapatkan list manga.",
          manga_list: [],
        }
      },

      async ($) => {
        const element = $(".bge");
        let manga_list: any = [];
        let title, type, updated_on, endpoint, thumb, chapter;


        element.each((idx, el) => {
          title = $(el).find(".kan > a").find("h3").text().trim();
          endpoint = $(el).find("a").attr("href")?.replace(this.replaceMangaPage, "").replace("/manga/", "");
          type = $(el).find(".bgei > a").find(".tpe1_inf > b").text();
          updated_on = $(el).find(".kan > span").text().split("• ")[1].trim();
          thumb = $(el).find(".bgei > a").find("img").attr("src");
          chapter = $(el)
            .find("div.kan > div:nth-child(5) > a > span:nth-child(2)")
            .text();
          manga_list.push({
            title,
            thumb,
            type,
            updated_on,
            endpoint,
            chapter,
          });

        });
        return {
          status: true,
          message: "success",
          manga_list,
        };
      }
    );
  }

  static async getMangaDetail(slug: string) {
    const url = this.replaceMangaPage + `/manga/${slug}`;

    return this.htmlParser<IKOMIKU.IDetailKomikuModel>(
      {
        url,
        initial: {
          title: "",
          type: "",
          author: "",
          status: "",
          manga_endpoint: "",
          thumb: "",
          genre_list: [],
          synopsis: "",
          chapter: [],
          card_info: {
            judul_komik: "",
            judul_indonesia: "",
            jenis_komik: "",
            Konsep_cerita: "",
            author: "",
            status: "",
            umur_pembaca: "",
            cara_baca: ""
          }
        }
      },

      async ($, data) => {
        const element = $(".perapih");
        let genre_list: any = [];
        let chapter = [];

        const getMeta = element.find(".inftable > tbody").first();
        data.title = $("#Judul > h1").text().trim();
        data.type = $("tr:nth-child(2) > td:nth-child(2)").find("b").text();
        data.author = $("#Informasi > table > tbody > tr:nth-child(4) > td:nth-child(2)").text().trim();
        data.status = $(getMeta).children().eq(4).find("td:nth-child(2)").text();

        data.manga_endpoint = slug;

        data.thumb = element.find(".ims > img").attr("src") || "";

        element.find(".genre > li").each((idx, el) => {
          let genre_name = $(el).find("a").text();
          genre_list.push({
            genre_name,
          });
        });

        data.genre_list = genre_list || [];

        const getSinopsis = element.find("#Sinopsis").first();
        data.synopsis = $(getSinopsis).find("p").text().trim();

        const chapterList = $("#Daftar_Chapter > tbody").find("tr");
        for (let i = 0; i < chapterList.length; i++) {
          const el = chapterList[i];
          let chapter_title = $(el).find("a").text().trim();
          let chapter_endpoint = $(el).find("a").attr("href");
          if (chapter_endpoint !== undefined) {
            const rep = chapter_endpoint.replace("/ch/", "");
            chapter.push({
              chapter_title,
              chapter_endpoint: rep,
            });
          }
          data.chapter = chapter;
        }

        const inftable = $(".inftable").first();
        const card_info = {
          judul_komik: "",
          judul_indonesia: "",
          jenis_komik: "",
          Konsep_cerita: "",
          author: "",
          status: "",
          umur_pembaca: "",
          cara_baca: ""
        };
        for (let i = 0; i < Object.entries(card_info).length; i++) {
          const key = Object.keys(card_info)[i];
          const value = inftable.find(`tr:nth-child(${i + 1}) > td:nth-child(2)`).text().trim();
          if (value) {
            card_info[key as keyof typeof card_info] = value;
          }
        }

        data.card_info = card_info;

        return data;
      }
    )
  }

  static async getChapterDetail(slug: string) {
    const url = this.replaceMangaPage + `/ch/${slug}`;

    return this.htmlParser(
      {
        url,
        initial: {
          chapter_endpoint: "",
          chapter_name: "",
          title: "",
          chapter_pages: 0,
          chapter_image: []
        }
      },

      async ($) => {
        const content = $("#article");
        let chapter_image: any = [];
        const obj: any = {};
        obj.chapter_endpoint = slug + "/";
        obj.chapter_name = slug.split('-').join(' ').trim()

        obj.title = $('#Judul > header > p > a > b').text().trim()

        /**
         * @Komiku
         */
        const getTitlePages = content.find(".dsk2")

        const h1Text = $(getTitlePages).find("h1").text().replace("Komik ", "");
        if (h1Text) obj.title = h1Text;

        // getTitlePages.filter(() => {
        //   return obj.title = $(getTitlePages).find("h1").text().replace("Komik ", "");
        // });

        /**
         * @Komiku
         */
        const getPages = $('#Baca_Komik > img')

        // const getPages = $('#chimg > img')
        obj.chapter_pages = getPages.length;
        getPages.each((i, el) => {
          chapter_image.push({
            chapter_image_link: $(el).attr("src")?.replace('i0.wp.com/', ''),
            image_number: i + 1,
          });
        });
        obj.chapter_image = chapter_image;

        return obj;
      }
    );
  }

}