import { fetchApi } from "$lib/utils/fetch";
import type { ICommentModel } from "$lib/api/types/mobile/commentType";

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
}