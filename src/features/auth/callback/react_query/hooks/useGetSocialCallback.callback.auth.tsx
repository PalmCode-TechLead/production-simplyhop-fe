import * as React from "react";
import { useMutation } from "@tanstack/react-query";
import { LoginAuthReactQueryKey } from "../keys";
import {
  GetAuthSocialCallbackErrorResponseInterface,
  GetAuthSocialCallbackPayloadRequestInterface,
  GetAuthSocialCallbackSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/auth";
import { fetchGetAuthSocialCallback } from "@/core/services/rest/simplyhop/auth";
import { GlobalActionEnum, GlobalContext } from "@/core/modules/app/context";
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "universal-cookie";
import { AppCollectionURL } from "@/core/utils/router/constants";

export const useGetSocialCallback = () => {
  const { state: globalState, dispatch: dispatchGlobal } =
    React.useContext(GlobalContext);
  const searchParams = useSearchParams();
  const router = useRouter();

  const code = searchParams.get("code");
  const mutation = useMutation<
    GetAuthSocialCallbackSuccessResponseInterface,
    GetAuthSocialCallbackErrorResponseInterface,
    { id: string }
  >({
    mutationKey: LoginAuthReactQueryKey.GetSocialCallback(),
    mutationFn: (data: { id: string }) => {
      const payload: GetAuthSocialCallbackPayloadRequestInterface = {
        path: {
          provider: data.id,
        },
        params: {
          code: String(code ?? ""),
        },
      };
      return fetchGetAuthSocialCallback(payload);
    },
    onSuccess(data) {
      const cookies = new Cookies();
      cookies.set("token", data.data.token, { path: "/" });
      router.push(AppCollectionURL.public.home());
    },
    onError(error) {
      dispatchGlobal({
        type: GlobalActionEnum.SetAlertData,
        payload: {
          ...globalState.alert,
          items: [
            ...globalState.alert.items,
            {
              id: "ERROR_SOCIAL_CALLBACK",
              variant: "error",
              message: error.message,
            },
          ],
        },
      });
    },
  });
  return mutation;
};
