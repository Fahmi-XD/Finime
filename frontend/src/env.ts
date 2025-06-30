import Cookies from "js-cookie";
import { PUBLIC_API } from "$env/static/public";

export const ENV = {
  API_URL: PUBLIC_API,
  ACCESS_TOKEN: Cookies.get("accessToken") || null,
};
