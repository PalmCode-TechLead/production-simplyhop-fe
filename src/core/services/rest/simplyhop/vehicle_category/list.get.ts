import axios, { AxiosError } from "axios";
import { ENVIRONMENTS } from "@/core/environments";
import { SimplyHopAPICollectionURL } from "@/core/utils/router/constants/simplyhop_api";
import { GetVehicleCategoryListPayloadRequestInterface } from "@/core/models/rest/simplyhop/vehicle_category";

export const fetchGetVehicleCategoryList = async (
  payload?: GetVehicleCategoryListPayloadRequestInterface
) => {
  try {
    const url = `${
      ENVIRONMENTS.SIMPLY_HOP_API_URL
    }${SimplyHopAPICollectionURL.vehicle_category.getList()}`;

    const res = await axios.get(url, { params: payload?.params });
    return res.data;
  } catch (err) {
    throw (err as AxiosError)?.response?.data || (err as AxiosError)?.response;
  }
};
