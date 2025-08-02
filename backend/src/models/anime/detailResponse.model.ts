import { ICharacterStandarResponse } from "./characterResponseModel.js";
import { IStatisticsStandarResponse } from "./statisticsResponseModel.js";
import { IStaffStandarResponse } from "./staffResponseModel.js";
import { IEpisodesStandarResponse } from "./episodesResponseModel.js";

export interface IDetailStandarResponse {
  characters?: ICharacterStandarResponse[];
  statistics?: IStatisticsStandarResponse;
  staff?: IStaffStandarResponse[];
  episodes_list?: IEpisodesStandarResponse[];
  mal_id?:          number;
  url?:             string;
  images?:          { [key: string]: Image };
  trailer?:         Trailer;
  approved?:        boolean;
  titles?:          Title[];
  title?:           string;
  title_english?:   string;
  title_japanese?:  string;
  title_synonyms?:  string[];
  type?:            string;
  source?:          string;
  episodes?:        any;
  status?:          string;
  airing?:          boolean;
  aired?:           Aired;
  duration?:        string;
  rating?:          string;
  score?:           any;
  scored_by?:       any;
  rank?:            any;
  popularity?:      number;
  members?:         number;
  favorites?:       number;
  synopsis?:        string;
  background?:      string;
  season?:          any;
  year?:            any;
  broadcast?:       Broadcast;
  producers?:       any[];
  licensors?:       any[];
  studios?:         Genre[];
  genres?:          Genre[];
  explicit_genres?: any[];
  themes?:          Genre[];
  demographics?:    any[];
  relations?:       Relation[];
  theme?:           Theme;
  external?:        External[];
  streaming?:       any[];
}

export interface Aired {
  from?:   Date;
  to?:     null;
  prop?:   Prop;
  string?: string;
}

export interface Prop {
  from?: From;
  to?:   From;
}

export interface From {
  day?:   number | null;
  month?: number | null;
  year?:  number | null;
}

export interface Broadcast {
  day?:      null;
  time?:     null;
  timezone?: null;
  string?:   string;
}

export interface External {
  name?: string;
  url?:  string;
}

export interface Genre {
  mal_id?: number;
  type?:   string;
  name?:   string;
  url?:    string;
}

export interface Image {
  image_url?:       string;
  small_image_url?: string;
  large_image_url?: string;
}

export interface Relation {
  relation?: string;
  entry?:    Genre[];
}

export interface Theme {
  openings?: any[];
  endings?:  any[];
}

export interface Title {
  type?:  string;
  title?: string;
}

export interface Trailer {
  youtube_id?: string;
  url?:        string;
  embed_url?:  string;
  images?:     Images;
}

export interface Images {
  image_url?:         string;
  small_image_url?:   string;
  medium_image_url?:  string;
  large_image_url?:   string;
  maximum_image_url?: string;
}
