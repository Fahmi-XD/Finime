import type { IBadges } from "$/types/badgesType";
import { FetchApi } from "$utils/Fetch";

export const fetchAllBadges = async (): Promise<IBadges[]> => {
  try {
    const response = await FetchApi.get(`/badges`);

    const apiData = response.data as IBadges[];
    return apiData;
  } catch (error) {
    console.error("Error fetching popular manga:", error);
    return [];
  }
};