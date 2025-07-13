export interface IToMyAnimeListResponse {
    member:      string;
    index:       number;
    rating:      number;
    myanimelist: Myanimelist;
    characters?: Characters;
    fullInfo?:   FullInfo;
}

export interface Characters {
    data: Datum[];
}

export interface Datum {
    character:    Character;
    role:         Role;
    favorites:    number;
    voice_actors: VoiceActor[];
}

export interface Character {
    mal_id:  number;
    url:     string;
    images?: CharacterImages;
    name:    string;
    type?:   string;
}

export interface CharacterImages {
    jpg:  Jpg;
    webp: Webp;
}

export interface Jpg {
    image_url: string;
}

export interface Webp {
    image_url:       string;
    small_image_url: string;
}

export enum Role {
    Main = "Main",
    Supporting = "Supporting",
}

export interface VoiceActor {
    person:   Genre;
    language: Language;
}

export enum Language {
    Japanese = "Japanese",
}

export interface Genre {
    mal_id:  number;
    url:     string;
    images?: GenreImages;
    name:    string;
    type?:   string;
}

export interface GenreImages {
    jpg: Jpg;
}

export interface FullInfo {
    data: Data;
}

export interface Data {
    mal_id:          number;
    url:             string;
    images:          { [key: string]: Image };
    trailer:         Trailer;
    approved:        boolean;
    titles:          Title[];
    title:           string;
    title_english:   string;
    title_japanese:  string;
    title_synonyms:  string[];
    type:            string;
    source:          string;
    episodes:        null;
    status:          Status;
    airing:          boolean;
    aired:           Aired;
    duration:        string;
    rating:          string;
    score:           number;
    scored_by:       number;
    rank:            number;
    popularity:      number;
    members:         number;
    favorites:       number;
    synopsis:        string;
    background:      string;
    season:          string;
    year:            number;
    broadcast:       Broadcast;
    producers:       Character[];
    licensors:       any[];
    studios:         Genre[];
    genres:          Genre[];
    explicit_genres: any[];
    themes:          Character[];
    demographics:    Character[];
    relations:       Relation[];
    theme:           Theme;
    external:        External[];
    streaming:       any[];
}

export interface Aired {
    from:   Date;
    to:     null;
    prop:   Prop;
    string: string;
}

export interface Prop {
    from: From;
    to:   From;
}

export interface From {
    day:   number | null;
    month: number | null;
    year:  number | null;
}

export interface Broadcast {
    day:      string;
    time:     string;
    timezone: string;
    string:   string;
}

export interface External {
    name: string;
    url:  string;
}

export interface Image {
    image_url:       string;
    small_image_url: string;
    large_image_url: string;
}

export interface Relation {
    relation: string;
    entry:    Genre[];
}

export enum Status {
    CurrentlyAiring = "Currently Airing",
    FinishedAiring = "Finished Airing",
}

export interface Theme {
    openings: string[];
    endings:  string[];
}

export interface Title {
    type:  string;
    title: string;
}

export interface Trailer {
    youtube_id: string;
    url:        string;
    embed_url:  string;
    images:     TrailerImages;
}

export interface TrailerImages {
    image_url:         string;
    small_image_url:   string;
    medium_image_url:  string;
    large_image_url:   string;
    maximum_image_url: string;
}

export interface Myanimelist {
    title:     string;
    status:    Status;
    score:     string;
    poster:    string;
    animeId:   string;
    href:      string;
    jikanUrl:  string;
    genreList: GenreList[];
}

export interface GenreList {
    title:    string;
    genreId:  string;
    href:     string;
    jikanUrl: string;
}
