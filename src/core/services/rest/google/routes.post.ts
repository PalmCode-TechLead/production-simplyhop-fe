import axios, { AxiosError } from "axios";
import { ENVIRONMENTS } from "@/core/environments";
import { GoogleAPICollectionURL } from "@/core/utils/router/constants/google_api";
import { RestGooglePostRouteDirectionsPayloadRequestInterface } from "@/core/models/rest/google/route";

export const fetchRestGoogleGetRoutes = async (
  payload?: RestGooglePostRouteDirectionsPayloadRequestInterface
) => {
  try {
    const url = `${
      ENVIRONMENTS.ROUTES_GOOGLE_API_URL
    }${GoogleAPICollectionURL.routes.getRoutes()}`;

    const res = await axios.post(url, payload?.body, {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": ENVIRONMENTS.GOOGLE_MAP_API_KEY,
      "X-Goog-FieldMask":
        "routes.duration,routes.distanceMeters,routes.polyline",
    } as any);
    return res.data;
  } catch (err) {
    throw (err as AxiosError)?.response?.data || (err as AxiosError)?.response;
  }
};
