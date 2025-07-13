import { writable } from "svelte/store";

export type MangaChapterType = {
  chapter_title: string;
  chapter_endpoint: string;
}

export const listChapter = writable<MangaChapterType[]>([]);
export const currentChapterReading = writable<number>(0);