import { AxiosError } from "axios";
import { ENVIRONMENTS } from "@/core/environments";
import { RestGoogleAPICollectionURL } from "@/core/utils/router/constants/google_api";
import { RestGooglePostRouteDirectionsPayloadRequestInterface } from "@/core/models/rest/google/route";

export const fetchRestGooglePostRouteDirections = async (
  payload?: RestGooglePostRouteDirectionsPayloadRequestInterface
) => {
  try {
    const url = `${
      ENVIRONMENTS.ROUTES_GOOGLE_API_URL
    }${RestGoogleAPICollectionURL.routes.getDirections()}`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": ENVIRONMENTS.GOOGLE_MAP_API_KEY!,
        "X-Goog-FieldMask":
          "routes.duration,routes.distanceMeters,routes.polyline",
      },
      body: JSON.stringify(payload?.body ?? {}),
    });
    const data = await res.json();
    return data;
  } catch (err) {
    throw (err as AxiosError)?.response?.data || (err as AxiosError)?.response;
  }
};

export const fetchRestGoogleGetDistanceMatrix = async (
  payload?: RestGooglePostRouteDirectionsPayloadRequestInterface
) => {
  try {
    const url = `${
      ENVIRONMENTS.MAPS_GOOGLE_API_URL
    }${RestGoogleAPICollectionURL.maps.getDistanceMatrix()}`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": ENVIRONMENTS.GOOGLE_MAP_API_KEY!,
      },
      body: JSON.stringify(payload?.body ?? {}),
    });
    const data = await res.json();
    return data;
  } catch (err) {
    throw (err as AxiosError)?.response?.data || (err as AxiosError)?.response;
  }
};
