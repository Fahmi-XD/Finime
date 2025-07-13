import { fetchApi } from "$lib/utils/fetch";
import type * as AuthTypes from "$lib/api/types/authType";

export class AuthClient {
  static async register(data: AuthTypes.IRegister) {
    const response = await fetchApi("/auth/register", "POST", data);
    return response;
  }

  static async login(data: AuthTypes.ILogin) {
    const response = await fetchApi("/auth/login", "POST", data);
    return response;
  }
}