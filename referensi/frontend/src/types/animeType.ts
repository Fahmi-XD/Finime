export interface IAnimeDetail {
  title: string;
  poster: string;
  japanese: string;
  score: string;
  producers: string;
  status: string;
  episodes: number;
  duration: string;
  aired: string;
  studios: string;
  batch: null;
  synopsis: {
    paragraphs: any[];
    connections: any[];
  };
  genreList: IGenreList[];
  episodeList: {
    title: number;
    episodeId: string;
    href: string;
    otakudesuUrl: string;
  }[];
  recommendedAnimeList: {
    title: string;
    poster: string;
    animeId: string;
    href: string;
    otakudesuUrl: string;
  }[];
}

export interface IGenreList {
  title: string;
  genreId: string;
  href: string;
  otakudesuUrl: string;
}