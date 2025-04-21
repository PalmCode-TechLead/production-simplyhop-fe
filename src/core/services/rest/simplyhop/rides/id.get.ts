import axios, { AxiosError } from "axios";
import { ENVIRONMENTS } from "@/core/environments";
import { SimplyHopAPICollectionURL } from "@/core/utils/router/constants/simplyhop_api";
import { GetRidesIdPayloadRequestInterface } from "@/core/models/rest/simplyhop/rides";

export const fetchGetRidesId = async (
  payload: GetRidesIdPayloadRequestInterface
) => {
  try {
    const url = `${
      ENVIRONMENTS.SIMPLY_HOP_API_URL
    }${SimplyHopAPICollectionURL.rides.getId(payload.path)}`;

    const res = await axios.get(url);
    return res.data;
  } catch (err) {
    throw (err as AxiosError)?.response?.data || (err as AxiosError)?.response;
  }
};
