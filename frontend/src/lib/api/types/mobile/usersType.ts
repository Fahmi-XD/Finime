export interface IUserModel {
    users?: User[];
    message?: string;
}

export interface User {
    id?:         string;
    username?:   string;
    name?:       string;
    anime?:      Anime[];
    manga?:      any[];
    avatar?:     string;
    banner?:     string;
    email?:      string;
    pronoun?:    string;
    lastSeen?:   Date;
    role?:       string;
    isVerify?:   boolean;
    bio?:        string;
    badges?:     string[];
    created_at?: Date;
    updated_at?: null;
}

export interface Anime {
    id?:         string;
    anime_id?:   string;
    user_id?:    string;
    created_at?: Date;
}
