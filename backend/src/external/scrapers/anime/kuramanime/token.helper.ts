import { KuramanimeParser } from "./api.parser.js";
import ENV from "env.js";
import { Scrape } from "@external/scrapers/scrape.js";

export interface ITokenResponse {
  MIX_PREFIX_AUTH_ROUTE_PARAM: string;
  MIX_AUTH_ROUTE_PARAM: string;
  MIX_AUTH_KEY: string;
  MIX_AUTH_TOKEN: string;
  MIX_PAGE_TOKEN_KEY: string;
  MIX_STREAM_SERVER_KEY: string;
}


export async function getToken() {
  try {
    const responsePlace = await Scrape.fetchJinaAI(KuramanimeParser.baseUrl + "/anime/3802/game-center-shoujo-to-ibunka-kouryuu/episode/1");
    const $ = Scrape.cheerio.load(responsePlace.data.data.html);
    const fileName = $("div[data-kps]").first().attr("data-kps")?.trim()

    const response1 = await Scrape.fetchJinaAI(KuramanimeParser.baseUrl + "/" + ENV.MIX_PREFIX_AUTH_ROUTE_PARAM + "js/" + fileName + ".js");
    const toEval = response1.data.data.html.match(/<pre.*">(.*[\w\W]+)<\/pre>/im)[1].replace("window.", "const ").trim()
    const func = `
(() => {
  ${toEval}

  return process.env;
})()
`
    const evalResponse: ITokenResponse = eval(func);
    const response = await Scrape.fetchJinaAI(KuramanimeParser.baseUrl + "/" + evalResponse.MIX_PREFIX_AUTH_ROUTE_PARAM + evalResponse.MIX_AUTH_ROUTE_PARAM);
    return {
      key: evalResponse.MIX_PAGE_TOKEN_KEY,
      value: response.data.data.html.match(/<pre.*">(.*)<\/pre>/im)[1] || "",
      key2: evalResponse.MIX_STREAM_SERVER_KEY,
      value2: "kuramadrive"
    }
  } catch (error) {
    console.log(error)
    return {
      key: "",
      value: "",
      key2: "",
      value2: ""
    }
  }
}