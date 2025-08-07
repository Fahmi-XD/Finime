export interface ICommentModel {
    id:         string;
    content:    string;
    created_at: Date;
    user:       User;
}

export interface User {
    id:         string;
    username:   string;
    name:       string;
    avatar:     string;
    banner:     string;
    role:       string;
    bio:        string;
    isVerify:   boolean;
    badges:     string[];
    created_at: Date;
    updated_at: null;
}
