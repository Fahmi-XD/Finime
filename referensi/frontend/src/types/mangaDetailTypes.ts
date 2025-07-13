export interface IMangaDetailResponse {
    title:          string;
    type:           string;
    author:         string;
    status:         string;
    manga_endpoint: string;
    thumb:          string;
    genre_list:     GenreList[];
    synopsis:       string;
    chapter:        Chapter[];
    card_info:      CardInfo;
}

export interface CardInfo {
    judul_komik:     string;
    judul_indonesia: string;
    jenis_komik:     string;
    Konsep_cerita:   string;
    author:          string;
    status:          string;
    umur_pembaca:    string;
    cara_baca:       string;
}

export interface Chapter {
    chapter_title:    string;
    chapter_endpoint: string;
}

export interface GenreList {
    genre_name: string;
}
