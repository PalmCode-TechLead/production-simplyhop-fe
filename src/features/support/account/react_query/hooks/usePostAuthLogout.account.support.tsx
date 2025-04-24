import * as React from "react";
import { useMutation } from "@tanstack/react-query";
import { AccountSupportReactQueryKey } from "../keys";
import {
  PostAuthLogoutErrorResponseInterface,
  PostAuthLogoutSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/auth";
import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";
import { AppCollectionURL } from "@/core/utils/router/constants/app";
import { fetchPostAuthLogout } from "@/core/services/rest/simplyhop/auth";
import { GlobalActionEnum, GlobalContext } from "@/core/modules/app/context";

export const usePostAuthLogout = () => {
  const router = useRouter();

  const { state: globalState, dispatch: dispatchGlobal } =
    React.useContext(GlobalContext);
  const mutation = useMutation<
    PostAuthLogoutSuccessResponseInterface,
    PostAuthLogoutErrorResponseInterface
  >({
    mutationKey: AccountSupportReactQueryKey.PostLogout(),
    mutationFn: () => {
      return fetchPostAuthLogout();
    },
    onSuccess() {
      const cookies = new Cookies();
      cookies.remove("token", { path: "/" });
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
              id: "ERROR_LOGOUT",
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
