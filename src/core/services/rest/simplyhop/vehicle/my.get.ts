import axios, { AxiosError } from "axios";
import { ENVIRONMENTS } from "@/core/environments";
import { SimplyHopAPICollectionURL } from "@/core/utils/router/constants/simplyhop_api";
import { GetVehicleMyPayloadRequestInterface } from "@/core/models/rest/simplyhop/vehicle";
import Cookies from "universal-cookie";

export const fetchGetVehicleMy = async (
  payload?: GetVehicleMyPayloadRequestInterface
) => {
  try {
    const url = `${
      ENVIRONMENTS.SIMPLY_HOP_API_URL
    }${SimplyHopAPICollectionURL.vehicle.getMy()}`;

    const cookies = new Cookies();
    const token = cookies.get("token");
    const res = await axios.get(url, {
      headers: {
        Authorization: token,
      },
      params: payload?.params,
    });
    return res.data;
  } catch (err) {
    throw (err as AxiosError)?.response?.data || (err as AxiosError)?.response;
  }
};
