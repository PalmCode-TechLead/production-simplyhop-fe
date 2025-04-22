import axios, { AxiosError } from "axios";
import { ENVIRONMENTS } from "@/core/environments";
import { SimplyHopAPICollectionURL } from "@/core/utils/router/constants/simplyhop_api";
import { GetMessagesListPayloadRequestInterface } from "@/core/models/rest/simplyhop/messages";
import Cookies from "universal-cookie";

export const fetchGetMessagesList = async (
  payload?: GetMessagesListPayloadRequestInterface
) => {
  try {
    const url = `${
      ENVIRONMENTS.SIMPLY_HOP_API_URL
    }${SimplyHopAPICollectionURL.messages.getList()}`;

    const cookies = new Cookies();
    const token = cookies.get("token");
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: payload?.params,
    });
    return res.data;
  } catch (err) {
    throw (err as AxiosError)?.response?.data || (err as AxiosError)?.response;
  }
};
