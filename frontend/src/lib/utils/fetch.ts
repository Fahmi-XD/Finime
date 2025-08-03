import axios from "axios";
import { PUBLIC_API } from "$env/static/public";
import Cookie from "js-cookie";

export const fetchApi = async (url: string, method: string, data: any, headers: any = {}) => {
  const token = Cookie.get("token") || "";

  const response = await axios({
    url: `${PUBLIC_API}/api/v1${url}`,
    method,
    timeout: 10_000,
    data,
    headers: {
      "x-token": token,
      ...headers
    }
  });

  return response.data;
};
