import axios, { AxiosError } from "axios";
import { ENVIRONMENTS } from "@/core/environments";
import { SimplyHopAPICollectionURL } from "@/core/utils/router/constants/simplyhop_api";
import Cookies from "universal-cookie";
import { PutMessageRoomsMakeAsReadPayloadRequestInterface } from "@/core/models/rest/simplyhop/message_rooms/mark_as_read.put";

export const fetchPutMessageRoomsMakeAsRead = async (
  payload: PutMessageRoomsMakeAsReadPayloadRequestInterface
) => {
  try {
    const url = `${
      ENVIRONMENTS.SIMPLY_HOP_API_URL
    }${SimplyHopAPICollectionURL.message_rooms.putMakeAsRead(payload.path)}`;

    const cookies = new Cookies();
    const token = cookies.get("token");
    const res = await axios.put(
      url,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (err) {
    throw (err as AxiosError)?.response?.data || (err as AxiosError)?.response;
  }
};
