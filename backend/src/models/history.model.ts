export interface IAnimeHistoryModel {
  title?: string;
  cover?: string;
  current_eps?: string;
  total_eps?: string;
  anime_id?: string;
  date?: string;
  schedule?: string;
  source?: string;
  watch_eps?: string;
  rating?: string | null;
}

export interface IMangaHistoryModel {
  title?: string;
  cover?: string;
  current_eps?: string;
  total_eps?: string;
  manga_id?: string;
  date?: string;
  schedule?: string;
  source?: string;
  read_chapter?: string;
  rating?: string | null;
}