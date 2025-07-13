export interface ISearchResponse {
    statusCode:    number;
    statusMessage: string;
    message:       string;
    ok:            boolean;
    data:          Data;
    pagination:    null;
}

export interface Data {
    animeList: AnimeList[];
}

export interface AnimeList {
    title:        string;
    poster:       string;
    status:       string;
    score:        string;
    animeId:      string;
    href:         string;
    otakudesuUrl: string;
    genreList:    GenreList[];
}

export interface GenreList {
    title:        string;
    genreId:      string;
    href:         string;
    otakudesuUrl: string;
}
