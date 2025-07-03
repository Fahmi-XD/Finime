/**
 * Class Induk Dari Scrape, Taruh Fungsi Yang Akan Digunakan Berkali kali Selama Scraping
 */


import axios, { AxiosResponse } from "axios";
import * as cheerio from "cheerio";

export default class Scrape {

  protected static async fetch(url: string): Promise<AxiosResponse<any, any>> {
    try {
      const response = await axios({
        url,
        method: "GET",
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
        },
      });

      if (response.status === 301 || response.status === 302) {
        const redirectUrl = response.headers.location;
        if (redirectUrl) {
          return await this.fetch(redirectUrl);
        }
      }

      if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response
    } catch (error) {
      throw error as AxiosResponse<any, any>;
    }
  }

  protected static async htmlParser<T>(
    {
      url,
      initial
    }: {
      url: string;
      initial: T
    },
    parser: ($: cheerio.CheerioAPI) => Promise<T>
  ): Promise<T> {
    try {
      const response = await this.fetch(url);
      const $ = cheerio.load(response.data);
      const parserResult = await parser($);
      return parserResult as T;
    } catch {
      return initial
    }
  }

}