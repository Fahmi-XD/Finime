import { fetchApi } from "$lib/utils/fetch";
import type { ICommentModel } from "$lib/api/types/mobile/commentType";
import type { IUserHistory } from "$lib/api/types/mobile/historyType";
import type { IUserModel } from "$lib/api/types/mobile/usersType";

export class UserMobileClient {
  static async postComment(comment: string, animeId: string): Promise<any> {
    const response = await fetchApi("/comment/post", "POST", { content: comment, animeId });
    return response.result;
  }

  static async getComment(animeId: string): Promise<ICommentModel[]> {
    const response = await fetchApi("/comment?animeId=" + animeId, "GET", {});
    return response.result;
  }

  static async deleteComment(commentId: string): Promise<any> {
    const response = await fetchApi("/comment/" + commentId, "DELETE", {});
    return response.result;
  }

  static async getUserInfo(): Promise<any> {
    const response = await fetchApi("/user", "GET", {});
    return response.result;
  }

  static async getUserInfoStatistics(): Promise<any> {
    const response = await fetchApi("/user?statistics=true", "GET", {});
    return response.result;
  }

  static async getUserInfoByUsername(username: string): Promise<any> {
    const response = await fetchApi("/user/username/" + username, "GET", {});
    return response.result;
  }

  static async getUserInfoOnline(): Promise<any> {
    const response = await fetchApi("/user/online", "GET", {});
    return response.result;
  }

  static async getUserInfoHistory(): Promise<IUserHistory[]> {
    const response = await fetchApi("/user/history", "GET", {});
    return response.result.history;
  }

  static async getUsersByQuery(query: string): Promise<IUserModel> {
    const response = await fetchApi("/users?query=" + encodeURIComponent(query), "GET", {});
    return response.result;
  }

  static async sendOnline(): Promise<any> {
    const response = await fetchApi("/live", "GET", {});
    return response.result;
  }
}