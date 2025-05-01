import { AxiosError } from "axios";
import { ENVIRONMENTS } from "@/core/environments";
import { SimplyHopAPICollectionURL } from "@/core/utils/router/constants/simplyhop_api";
import Cookies from "universal-cookie";
import { DeleteMessagesChatPayloadRequestInterface } from "@/core/models/rest/simplyhop/messages";
import axios from "@/core/utils/axios/functions/base";

export const fetchDeleteMessagesChat = async (
  payload: DeleteMessagesChatPayloadRequestInterface
) => {
  try {
    const url = `${
      ENVIRONMENTS.SIMPLY_HOP_API_URL
    }${SimplyHopAPICollectionURL.messages.deleteChat(payload.path)}`;

    const cookies = new Cookies();
    const token = cookies.get("token");
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    throw (err as AxiosError)?.response?.data || (err as AxiosError)?.response;
  }
};
