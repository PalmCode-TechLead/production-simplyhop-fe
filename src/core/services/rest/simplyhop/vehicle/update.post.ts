import axios, { AxiosError } from "axios";
import { ENVIRONMENTS } from "@/core/environments";
import { SimplyHopAPICollectionURL } from "@/core/utils/router/constants/simplyhop_api";
import { PostVehicleUpdatePayloadRequestInterface } from "@/core/models/rest/simplyhop/vehicle";
import Cookies from "universal-cookie";

export const fetchPostVehicleUpdate = async (
  payload: PostVehicleUpdatePayloadRequestInterface
) => {
  try {
    const url = `${
      ENVIRONMENTS.SIMPLY_HOP_API_URL
    }${SimplyHopAPICollectionURL.vehicle.postUpdate(payload.path)}`;

    const cookies = new Cookies();
    const token = cookies.get("token");
    const res = await axios.post(url, payload.body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    throw (err as AxiosError)?.response?.data || (err as AxiosError)?.response;
  }
};
