import { FetchApi } from "$utils/Fetch";
import { fromStore } from "svelte/store";
import { mangaProvider } from "$/stores/providerStore";
import type { IMangaSearchResponse } from "$/types/mangaSearchType";
import type { IMangaDetailResponse } from "$/types/mangaDetailTypes";

export const fetchPopularManga = async () => {
  try {
    const response = await FetchApi.get(`/manga/${fromStore(mangaProvider).current}/popular/1`);

    const apiData = response.data;
    if (apiData.status && apiData.manga_list) {
      return apiData.manga_list.map((item: any, index: number) => ({
        id: index + 1,
        title: item.title,
        image: item.thumb,
        upload_on: item.upload_on,
        description: item.sortDesc,
        endpoint: item.endpoint,
      }));
    }
  } catch (error) {
    console.error("Error fetching popular manga:", error);
    return [];
  }
};

export const fetchNewsManga = async () => {
  try {
    const response = await FetchApi.get(`/manga/${fromStore(mangaProvider).current}/news`);

    const apiData = response.data;
    if (apiData.status && apiData.manga_list) {
      return apiData.manga_list.map((item: any, index: number) => ({
        id: index + 1,
        title: item.title,
        image: item.thumb,
        endpoint: item.endpoint,
        view: item.view,
        upload_on: item.upload_on,
      }));
    }
  } catch (error) {
    console.error("Error fetching news manga:", error);
    return [];
  }
};

export const fetchDateManga = async () => {
  try {
    const response = await FetchApi.get(`/manga/${fromStore(mangaProvider).current}/news?orderBy=date`);

    const apiData = response.data;
    if (apiData.status && apiData.manga_list) {
      return apiData.manga_list.map((item: any, index: number) => ({
        id: index + 1,
        title: item.title,
        image: item.thumb,
        endpoint: item.endpoint,
        view: item.view
      }));
    }
  } catch (error) {
    console.error("Error fetching date manga:", error);
    return [];
  }
};

export const fetchMangaPage = async (page: number = 1) => {
  try {
    const response = await FetchApi.get(`/manga/${fromStore(mangaProvider).current}/page/${page}`);
    const apiData = response.data;

    if (apiData.status && apiData.manga_list) {
      return apiData.manga_list.map((item: any, index: number) => ({
        id: index + 1,
        title: item.title,
        image: item.thumb,
        upload_on: item.updated_on,
        description: item.chapter,
        endpoint: item.endpoint,
      }));
    }
  } catch (error) {
    console.error("Error fetching manga page data:", error);
    return [];
  }
};

export const fetchMangaDetail = async (slug: string) => {
  try {
    const response = await FetchApi.get(`/manga/${fromStore(mangaProvider).current}/detail/${slug}`);

    if (response.status === 200 && response.data.status !== false) {
      return { manga: response.data, isFound: true };
    } else {
      return {
        manga: {
          status: false,
          message: response.data.message || "Manga not found",
        },
        isFound: false,
      };
    }
  } catch (error) {
    console.error("Error fetching manga details:", error);
    return {
      manga: { status: false, message: "Failed to fetch manga details" },
      isFound: false,
    };
  }
};

export const fetchMangaDetailOri = async (slug: string) => {
  try {
    const response = await FetchApi.get(`/manga/${fromStore(mangaProvider).current}/detail/${slug}`);

    return response.data as IMangaDetailResponse;
  } catch (error) {
    console.error("Error fetching manga details:", error);
    return {
      manga: { status: false, message: "Failed to fetch manga details" },
      isFound: false,
    };
  }
};

export const fetchMangaSearch = async (query: string) => {
  try {
    const response = await FetchApi.get(`/manga/${fromStore(mangaProvider).current}/search?q=${query}`);

    return response.data as IMangaSearchResponse;
  } catch (error) {
    console.error("Error fetching manga:", error);
    return {
      manga: { status: false, message: "Failed to fetch manga" },
      isFound: false,
    };
  }
};

