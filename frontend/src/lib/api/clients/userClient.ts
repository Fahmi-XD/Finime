import { fetchApi } from "$lib/utils/fetch";
import type * as UserTypes from "$lib/api/types/userType";
import * as lucideIcon from "@lucide/svelte";
import type { Component } from "svelte";

export class UserClient {
  static async getAllBadges(): Promise<UserTypes.IGetAllBadges[]> {
    const response = await fetchApi("/badges", "GET", {});
    
    return response.result.map((badge: UserTypes.IGetAllBadges) => ({
      ...badge,
      icon: (lucideIcon as any)[badge.icon as unknown as string] as Component
    }));
  }

  static async updateUser(data: UserTypes.IUpdateUser, avatar: File | null): Promise<any> {
    const formDataObj = new FormData();
    if (avatar) formDataObj.append("avatar", avatar);
    formDataObj.append("username", data.username as string);
    formDataObj.append("name", data.name as string);
    formDataObj.append("email", data.email as string);
    formDataObj.append("bio", data.bio as string);
    formDataObj.append("banner", data.banner as string);
    formDataObj.append("pronoun", data.pronoun as string);

    const response = await fetchApi("/user", "PATCH", formDataObj, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.result;
  }
}