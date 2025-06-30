import { writable, fromStore, type Writable } from "svelte/store";
import { FetchApi } from "../utils/Fetch";
import Cookies from "js-cookie";
import * as Icons from "@lucide/svelte";

export type UserProfile = {
  id: string
  username: string
  name: string
  avatar?: string
  role?: string
  bio?: string | null
  badge?: string[]
  isVerify: boolean;
  contact: {
    email: string
    first_name: string
    last_name: string
  }
  metadata: {
    AnimeRead: number
    mangaRead: number
  }
};

export const user: Writable<UserProfile | null> = writable(null);

export async function fetchUser() {
  if (Cookies.get("accessToken")) {
    try {
      const response = await FetchApi.get("/user");
      user.set(response.data);
    } catch (error) {
      user.set(null);
      Cookies.remove("accessToken");
    }
  } else {
    user.set(null);
  }
}

export async function fetchAllBadge() {
  const response = await FetchApi.get("/badges");
  // const userBadge = fromStore(user).current?.badge || [""]
  // response.data = (response.data as Array<any>).filter(item => userBadge.includes(item?.id as string))
  for (let i = 0; i < response.data.length; i++) {
    response.data[i].icon = Icons[response.data[i].icon as keyof typeof Icons]
  }
  return response.data
}
