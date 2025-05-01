import { AxiosError } from "axios";
import { ENVIRONMENTS } from "@/core/environments";
import { SimplyHopAPICollectionURL } from "@/core/utils/router/constants/simplyhop_api";
import Cookies from "universal-cookie";
import { PutMessageRoomsMarkAsReadPayloadRequestInterface } from "@/core/models/rest/simplyhop/message_rooms/mark_as_read.put";
import axios from "@/core/utils/axios/functions/base";

export const fetchPutMessageRoomsMarkAsRead = async (
  payload: PutMessageRoomsMarkAsReadPayloadRequestInterface
) => {
  try {
    const url = `${
      ENVIRONMENTS.SIMPLY_HOP_API_URL
    }${SimplyHopAPICollectionURL.message_rooms.putMarkAsRead(payload.path)}`;

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
