export interface ISearchModel {
    animes?:    Animes;
    topAnimes?: Animes;
}

export interface Animes {
    current_page?:   number;
    data?:           Datum[];
    first_page_url?: string;
    from?:           number;
    last_page?:      number;
    last_page_url?:  string;
    links?:          Link[];
    next_page_url?:  string;
    path?:           string;
    per_page?:       number;
    prev_page_url?:  null;
    to?:             number;
    total?:          number;
}

export interface Datum {
    id?:                      number;
    title?:                   string;
    slug?:                    string;
    synopsis?:                string;
    synopsis_short?:          string;
    total_episodes?:          number | null;
    aired_from?:              string;
    aired_to?:                null | string;
    scheduled_day?:           null | string;
    scheduled_time?:          Date | null;
    score?:                   number | null;
    votes?:                   number;
    rating?:                  string;
    duration?:                string;
    quality?:                 string;
    type?:                    string;
    status?:                  string;
    image_portrait_url?:      string;
    image_landscape_url?:     string;
    mal_url?:                 string;
    latest_post_at?:          Date;
    created_at?:              Date;
    updated_at?:              Date;
    deleted_at?:              null;
    abbreviation?:            string;
    folder_name?:             string;
    source?:                  string;
    season_id?:               number;
    anilist_url?:             null | string;
    data_source?:             string;
    popularity?:              number;
    members?:                 number;
    full_alt_titles?:         string;
    latest_comment_at?:       Date | null;
    base_rank?:               number;
    is_movie?:                null;
    country_code?:            null | string;
    latest_comment_id?:       number | null;
    latest_comment_reply_id?: number | null;
    duplicate_id?:            null;
    scheduled_date?:          Date | null;
    on_hold?:                 number;
    is_adult?:                number;
    genres?:                  Genre[];
    posts?:                   Post[];
}

export interface Genre {
    id?:         number;
    label?:      string;
    slug?:       string;
    type?:       string;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: null;
    pivot?:      Pivot;
}

export interface Pivot {
    anime_id?: number;
    genre_id?: number;
}

export interface Post {
    id?:                      number;
    admin_id?:                number;
    anime_id?:                number;
    title?:                   string;
    episode?:                 number;
    credit?:                  string;
    latest_comment_at?:       Date | null;
    created_at?:              Date;
    updated_at?:              Date;
    deleted_at?:              null;
    type?:                    string;
    episode_batch?:           null | string;
    version_name?:            null;
    episode_decimal?:         null | string;
    is_published?:            number;
    release_type?:            null;
    latest_comment_id?:       number | null;
    latest_comment_reply_id?: number | null;
    notes?:                   null;
    views?:                   number;
    last_added_views?:        number;
}

export interface Link {
    url?:    null | string;
    label?:  string;
    active?: boolean;
}
