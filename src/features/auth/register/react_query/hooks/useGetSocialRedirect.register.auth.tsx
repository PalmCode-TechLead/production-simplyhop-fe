import * as React from "react";
import { useMutation } from "@tanstack/react-query";
import { RegisterAuthReactQueryKey } from "../keys";
import {
  GetAuthSocialRedirectErrorResponseInterface,
  GetAuthSocialRedirectPayloadRequestInterface,
  GetAuthSocialRedirectSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/auth";
import { fetchGetAuthSocialRedirect } from "@/core/services/rest/simplyhop/auth";
import { GlobalActionEnum, GlobalContext } from "@/core/modules/app/context";
import { v4 as uuidv4 } from "uuid";

export const useGetSocialRedirect = () => {
  const { state: globalState, dispatch: dispatchGlobal } =
    React.useContext(GlobalContext);
  const mutation = useMutation<
    GetAuthSocialRedirectSuccessResponseInterface,
    GetAuthSocialRedirectErrorResponseInterface,
    { id: string }
  >({
    mutationKey: RegisterAuthReactQueryKey.PostLogin(),
    mutationFn: (data: { id: string }) => {
      const payload: GetAuthSocialRedirectPayloadRequestInterface = {
        path: {
          provider: data.id,
        },
      };
      return fetchGetAuthSocialRedirect(payload);
    },
    onSuccess(data) {
      window.location.href = data.data.url;
    },
    onError(error) {
      dispatchGlobal({
        type: GlobalActionEnum.SetAlertData,
        payload: {
          ...globalState.alert,
          items: [
            ...globalState.alert.items,
            {
              id: uuidv4(),
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
