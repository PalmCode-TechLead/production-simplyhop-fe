import { AxiosError } from "axios";
import { ENVIRONMENTS } from "@/core/environments";
import { SimplyHopAPICollectionURL } from "@/core/utils/router/constants/simplyhop_api";
import { DeleteVehicleIdPayloadRequestInterface } from "@/core/models/rest/simplyhop/vehicle";
import Cookies from "universal-cookie";
import axios from "@/core/utils/axios/functions/base";

export const fetchDeleteVehicleId = async (
  payload: DeleteVehicleIdPayloadRequestInterface
) => {
  try {
    const url = `${
      ENVIRONMENTS.SIMPLY_HOP_API_URL
    }${SimplyHopAPICollectionURL.vehicle.deleteId(payload.path)}`;

    const cookies = new Cookies();
    const token = cookies.get("token");
    const res = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    throw (err as AxiosError)?.response?.data || (err as AxiosError)?.response;
  }
};
