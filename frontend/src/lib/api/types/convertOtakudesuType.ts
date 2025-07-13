export interface IConvertOtakudesuDetailModel {
  id?:                number;
  series_id?:         string;
  bookmark?:          null;
  cover?:             string;
  judul?:             string;
  type?:              string;
  countdown?:         null;
  status?:            string;
  rating?:            string;
  published?:         string;
  author?:            string;
  genre?:             string[];
  genreurl?:          string[];
  sinopsis?:          string;
  history?:           string[];
  historyDurasi?:     number[];
  historyDurasiFull?: number[];
  chapter?:           Chapter[];
}

export interface Chapter {
  id?:         number;
  ch?:         string;
  url?:        string;
  date?:       string;
  history?:    string;
  lastDurasi?: null;
  fullDurasi?: null;
}
