/**
 * Class Induk Dari Scrape, Taruh Fungsi Yang Akan Digunakan Berkali kali Selama Scraping
 */


import axios, { AxiosResponse } from "axios";
import * as cheerio from "cheerio";

export class Scrape {

  protected static async fetch(url: string): Promise<AxiosResponse<any, any>> {
    try {
      const response = await axios({
        url,
        method: "GET",
        timeout: 10000,
        validateStatus: (status) => status >= 200 && status < 300,
        maxRedirects: 5,
        maxContentLength: 100000000,
        maxBodyLength: 100000000,
        responseType: "json",
        responseEncoding: "utf-8",
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

  protected static async fetchJinaAI(url: string): Promise<AxiosResponse<any, any>> {
    try {
      const response = await axios({
        url: `https://r.jina.ai/${url}`,
        method: "GET",
        timeout: 10000,
        validateStatus: (status) => status >= 200 && status < 300,
        maxRedirects: 5,
        maxContentLength: 100000000,
        maxBodyLength: 100000000,
        responseType: "json",
        responseEncoding: "utf-8",
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
          'Authorization': 'Bearer jina_f8719ed869a545309dc2a774b9efc5c0rLBO0XhWdlXvXZ3VBIGMF7OKoi-e',
          'Accept': 'application/json',
          'X-Return-Format': 'html'
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
      initial,
      cf = false
    }: {
      url: string;
      initial: T,
      cf?: boolean
    },
    parser: ($: cheerio.CheerioAPI, data: T) => Promise<T>
  ): Promise<T> {
    try {
      const response = await (cf ? this.fetchJinaAI : this.fetch)(url);
      // console.log(response.data.data.html)
      const $ = cheerio.load((cf ? response.data.data.html : response.data));
      const parserResult = await parser($, initial);
      return parserResult as T;
    } catch {
      return initial
    }
  }

  protected static async apiParser<R, T>(
    {
      url,
      initial
    }: {
      url: string;
      initial: T
    },
    parser: (response: R, data: T) => Promise<T>
  ): Promise<T> {
    try {
      const response = await this.fetch(url);
      const parserResult = await parser(response.data as R, initial);
      return parserResult as T;
    } catch {
      return initial
    }
  }

}