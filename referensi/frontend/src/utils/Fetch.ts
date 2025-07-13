import axios from "axios";
import { ENV } from "../env";
import Cookies from "js-cookie"

export const FetchApi = axios.create({
  baseURL: `${ENV.API_URL}/api/v1`,
  headers: {
    "Content-Type": "application/json",
    "x-token": `${Cookies.get("accessToken")}`,
  },
});
