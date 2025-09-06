export interface IUserModel {
    users?: User[];
    message?: string;
}

export interface User {
    id?:         string;
    username?:   string;
    name?:       string;
    anime?:      Anime[];
    manga?:      Anime[];
    avatar?:     null | string;
    banner?:     null | string;
    email?:      string;
    pronoun?:    null | string;
    lastSeen?:   Date | null;
    role?:       string;
    isVerify?:   boolean;
    bio?:        null | string;
    badges?:     string[];
    created_at?: Date;
    updated_at?: null;
}

export interface Anime {
    id?:         string;
    anime_id?:   string;
    user_id?:    string;
    created_at?: Date;
    manga_id?:   string;
}