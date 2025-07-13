export interface IMangaSearchResponse {
    status:     boolean;
    message:    string;
    manga_list: MangaList[];
}

export interface MangaList {
    title:      string;
    thumb:      string;
    type:       string;
    endpoint:   string;
    updated_on: string;
}
