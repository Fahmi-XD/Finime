export interface IEpisodesStandarResponse {
  mal_id?:         number;
  url?:            null | string;
  title?:          string;
  title_japanese?: string;
  title_romanji?:  string;
  aired?:          Date;
  score?:          number;
  filler?:         boolean;
  recap?:          boolean;
  forum_url?:      string;
}
