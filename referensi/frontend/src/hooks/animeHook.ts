import { FetchApi } from "$utils/Fetch";
import { fromStore } from "svelte/store";
import type { IToMyAnimeListResponse } from "$/types/toanimelistType";

export const fetchAnimeHome = async () => {
  try {
    const response = await FetchApi.get(`/anime/home`);

    const apiData = response.data.data;
    return apiData;
  } catch (error) {
    console.error("Error fetching popular manga:", error);
    return [];
  }
};

export const fetchAnimeDetail = async (slug: string) => {
  try {
    const response = await FetchApi.get(`/anime/anime/${slug}`);

    const apiData = response.data;
    return apiData;
  } catch (error) {
    console.error("Error fetching popular manga:", error);
    return [];
  }
};

export const fetchAnimeEpisode = async (episodeId: string) => {
  try {
    const response = await FetchApi.get(`/anime/episode/${episodeId}`);

    const apiData = response.data;
    return apiData;
  } catch (error) {
    console.error("Error fetching popular manga:", error);
    return [];
  }
};

export const fetchAnimeServer = async (serverId: string) => {
  try {
    const response = await FetchApi.get(`/anime/server/${serverId}`);

    const apiData = response.data;
    return apiData;
  } catch (error) {
    console.error("Error fetching popular manga:", error);
    return [];
  }
};

export const fetchAnimeSearch = async (query: string) => {
  try {
    const response = await FetchApi.get(`/anime/search?q=${query}`);

    const apiData = response.data;
    return apiData;
  } catch (error) {
    console.error("Error fetching popular manga:", error);
    return [];
  }
};

export const fetchToAnimeListSearch = async (query: string) => {
  try {
    const response = await FetchApi.get(`/to-myanimelist/${query}`);

    const apiData = response.data as IToMyAnimeListResponse[];
    return apiData;
  } catch (error) {
    console.error("Error fetching popular manga:", error);
    return [];
  }
};