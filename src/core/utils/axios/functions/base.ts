import baseAxios from "axios";
import { AppCollectionURL } from "@/core/utils/router/constants";

const axios = baseAxios.create();

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        const publicPaths = [
          AppCollectionURL.public.login(),
          AppCollectionURL.public.register(),
        ];
        const currentPath = window.location.pathname;

        const isOnPublicPage = publicPaths.includes(currentPath);

        if (!isOnPublicPage) {
          window.location.href = AppCollectionURL.public.login();
        }
      }
    }
    return Promise.reject(error);
  }
);

export default axios;
