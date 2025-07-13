export type RegisterUserRequest = {
  username: string;
  password: string;
  name: string;
  email: string;
};

export type LoginUserRequest = {
  username: string;
  password: string;
}

export type UserResponse = {
  username: string;
  name: string;
  token?: string;
};

export type UpdateUserRequest = {
  username?: string;
  name?: string;
  avatar?: string;
  email?: string;
  pronoun?: string;
  bio?: string;
  badges?: string[];
  banner?: string;
}

export type ChangePasswordRequest = {
  old_password: string;
  new_password: string;
}
