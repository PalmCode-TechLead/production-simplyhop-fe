import { AxiosError } from "axios";
import { ENVIRONMENTS } from "@/core/environments";
import { SimplyHopAPICollectionURL } from "@/core/utils/router/constants/simplyhop_api";
import { GetAuthSocialCallbackPayloadRequestInterface } from "@/core/models/rest/simplyhop/auth";
import axios from "@/core/utils/axios/functions/base";

export const fetchGetAuthSocialCallback = async (
  payload: GetAuthSocialCallbackPayloadRequestInterface
) => {
  try {
    const url = `${
      ENVIRONMENTS.SIMPLY_HOP_API_URL
    }${SimplyHopAPICollectionURL.auth.getSocialCallback(payload.path)}`;

    const res = await axios.get(url, {
      params: payload.params,
    });
    return res.data;
  } catch (err) {
    console.error("Error fetchGetAuthSocialCallback", err);
    console.error(
      "Error fetchGetAuthSocialCallback",
      String(JSON.stringify(err))
    );
    throw (err as AxiosError)?.response?.data || (err as AxiosError)?.response;
  }
};
