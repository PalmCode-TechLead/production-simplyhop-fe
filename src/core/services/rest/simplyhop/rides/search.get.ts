import { AxiosError } from "axios";
import { ENVIRONMENTS } from "@/core/environments";
import { SimplyHopAPICollectionURL } from "@/core/utils/router/constants/simplyhop_api";
import { GetRidesSearchPayloadRequestInterface } from "@/core/models/rest/simplyhop/rides";
import axios from "@/core/utils/axios/functions/base";

export const fetchGetRidesSearch = async (
  payload?: GetRidesSearchPayloadRequestInterface
) => {
  try {
    const url = `${
      ENVIRONMENTS.SIMPLY_HOP_API_URL
    }${SimplyHopAPICollectionURL.rides.getSearch()}`;

    const res = await axios.get(url, { params: payload?.params });
    return res.data;
  } catch (err) {
    throw (err as AxiosError)?.response?.data || (err as AxiosError)?.response;
  }
};
