import * as React from "react";
import { useMutation } from "@tanstack/react-query";
import { FindRideReactQueryKey } from "../keys";
import { FindRideContext } from "../../context";

import {
  RestGooglePostRouteDirectionsPayloadRequestInterface,
  RestGooglePostRouteDirectionsSuccessResponseInterface,
} from "@/core/models/rest/google/route";
import { fetchRestGooglePostRouteDirections } from "@/core/services/rest/google/routes.post";

export const useRestGooglePostRouteDirections = () => {
  const { state, dispatch } = React.useContext(FindRideContext);

  const payload: RestGooglePostRouteDirectionsPayloadRequestInterface = {
    body: {
      origin: {
        location: {
          latLng: {
            latitude: state.filters.origin.selected.lat_lng?.lat ?? 0,
            longitude: state.filters.origin.selected.lat_lng?.lng ?? 0,
          },
        },
      },
      destination: {
        location: {
          latLng: {
            latitude: state.filters.destination.selected.lat_lng?.lat ?? 0,
            longitude: state.filters.destination.selected.lat_lng?.lng ?? 0,
          },
        },
      },
      travelMode: "DRIVE",
      routingPreference: "TRAFFIC_AWARE",
      computeAlternativeRoutes: false,
    },
  };
  const mutation =
    useMutation<RestGooglePostRouteDirectionsSuccessResponseInterface>({
      mutationKey: FindRideReactQueryKey.RestGooglePostRouteDirections(),
      mutationFn: () => {
        return fetchRestGooglePostRouteDirections(payload);
      },
      onSuccess() {},
    });

  return mutation;
};
