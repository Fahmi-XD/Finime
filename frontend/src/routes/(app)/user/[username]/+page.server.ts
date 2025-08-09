import type { PageServerLoad } from "./$types";
import { UserMobileClient } from "$lib/api/clients/mobile/userClient";

export const load: PageServerLoad = async ({ params }) => {
  const { username } = params;
  
  let user = {};

  try {
    user = await UserMobileClient.getUserInfoByUsername(username);
  } catch (error) {
    console.log(error)
    user = {};
  }

  return {
    userByUsername: user
  };
}