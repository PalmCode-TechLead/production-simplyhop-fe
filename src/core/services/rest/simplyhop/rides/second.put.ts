import { AxiosError } from "axios";
import { ENVIRONMENTS } from "@/core/environments";
import { SimplyHopAPICollectionURL } from "@/core/utils/router/constants/simplyhop_api";
import Cookies from "universal-cookie";
import { PutRidesSecondPayloadRequestInterface } from "@/core/models/rest/simplyhop/rides";
import axios from "@/core/utils/axios/functions/base";

export const fetchPutRidesSecond = async (
  payload: PutRidesSecondPayloadRequestInterface
) => {
  try {
    const url = `${
      ENVIRONMENTS.SIMPLY_HOP_API_URL
    }${SimplyHopAPICollectionURL.rides.putSecond(payload.path)}`;

    const cookies = new Cookies();
    const token = cookies.get("token");
    const res = await axios.put(url, payload.body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    throw (err as AxiosError)?.response?.data || (err as AxiosError)?.response;
  }
};
