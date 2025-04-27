import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { LoginAuthReactQueryKey } from "../keys";
import {
  GetAuthSocialCallbackErrorResponseInterface,
  GetAuthSocialCallbackPayloadRequestInterface,
  GetAuthSocialCallbackSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/auth";
import { fetchGetAuthSocialCallback } from "@/core/services/rest/simplyhop/auth";
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "universal-cookie";
import { AppCollectionURL } from "@/core/utils/router/constants";

export const useGetSocialCallback = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const code = searchParams.get("code");
  const query = useQuery<
    GetAuthSocialCallbackSuccessResponseInterface,
    GetAuthSocialCallbackErrorResponseInterface
  >({
    queryKey: LoginAuthReactQueryKey.GetSocialCallback(),
    queryFn: () => {
      const payload: GetAuthSocialCallbackPayloadRequestInterface = {
        path: {
          provider: "google",
        },
        params: {
          code: String(code ?? ""),
        },
      };
      return fetchGetAuthSocialCallback(payload);
    },
  });

  React.useEffect(() => {
    if (!!query.data && !query.isFetching) {
      const data = query.data;
      const cookies = new Cookies();
      cookies.set("token", data.data.token, { path: "/" });
      router.push(AppCollectionURL.public.home());
    }
  }, [query.data, query.isFetching]);
  return query;
};
