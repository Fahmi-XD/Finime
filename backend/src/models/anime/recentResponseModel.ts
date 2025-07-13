export interface IRecentStandarResponse {
    mal_id?:  string;
    entry?:   Entry[];
    content?: string;
    date?:    Date;
    user?:    User;
}

export interface Entry {
    mal_id?: number;
    url?:    string;
    images?: { [key: string]: Image };
    title?:  string;
}

export interface Image {
    image_url?:       string;
    small_image_url?: string;
    large_image_url?: string;
}

export interface User {
    url?:      string;
    username?: string;
}
