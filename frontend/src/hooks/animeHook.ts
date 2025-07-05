import { FetchApi } from "$utils/Fetch";
import { fromStore } from "svelte/store";
import { animeProvider } from "$/stores/providerStore";

export const fetchAnimeHome = async () => {
  try {
    const response = await FetchApi.get(`/anime/${fromStore(animeProvider).current}/home`);

    const apiData = response.data.data;
    return apiData;
  } catch (error) {
    console.error("Error fetching popular manga:", error);
    return [];
  }
};

export const fetchAnimeDetail = async (slug: string) => {
  try {
    const response = await FetchApi.get(`/anime/${fromStore(animeProvider).current}/anime/${slug}`);

    const apiData = response.data;
    return apiData;
  } catch (error) {
    console.error("Error fetching popular manga:", error);
    return [];
  }
};

export const fetchAnimeEpisode = async (episodeId: string) => {
  try {
    const response = await FetchApi.get(`/anime/${fromStore(animeProvider).current}/episode/${episodeId}`);

    const apiData = response.data;
    return apiData;
  } catch (error) {
    console.error("Error fetching popular manga:", error);
    return [];
  }
};

export const fetchAnimeServer = async (serverId: string) => {
  try {
    const response = await FetchApi.get(`/anime/${fromStore(animeProvider).current}/server/${serverId}`);

    const apiData = response.data;
    return apiData;
  } catch (error) {
    console.error("Error fetching popular manga:", error);
    return [];
  }
};