import baseAxios from "axios";
import { AppCollectionURL } from "@/core/utils/router/constants";
import Cookies from "universal-cookie";
import { removeToken } from "@/app/actions";
const axios = baseAxios.create();

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        const publicPaths = [
          AppCollectionURL.public.login(),
          AppCollectionURL.public.register(),
        ];
        const currentPath = window.location.pathname;

        const isOnPublicPage = publicPaths.includes(currentPath);

        if (!isOnPublicPage) {
          const cookies = new Cookies();
          cookies.remove("token", { path: "/" });
          await removeToken();

          window.location.href = AppCollectionURL.public.login();
        }
      }
    }
    return Promise.reject(error);
  }
);

export default axios;
