import * as React from "react";
import { useMutation } from "@tanstack/react-query";
import { FindRideReactQueryKey } from "../keys";
import { FindRideActionEnum, FindRideContext } from "../../context";

import {
  RestGooglePostRouteDirectionsPayloadRequestInterface,
  RestGooglePostRouteDirectionsSuccessResponseInterface,
} from "@/core/models/rest/google/route";
import { fetchRestGooglePostRouteDirections } from "@/core/services/rest/google/routes.post";
import { decode } from "@googlemaps/polyline-codec";

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
      // waypoints: [
      //   {
      //     location: {
      //       latLng: {
      //         latitude:
      //           ((state.filters.origin.selected.lat_lng?.lat ?? 0) +
      //             (state.filters.destination.selected.lat_lng?.lat ?? 0)) /
      //           2, // Titik tengah
      //         longitude:
      //           ((state.filters.origin.selected.lat_lng?.lng ?? 0) +
      //             (state.filters.destination.selected.lat_lng?.lng ?? 0)) /
      //           2, // Titik tengah
      //       },
      //     },
      //   },
      // ],
      travelMode: "DRIVE",
      routingPreference: "TRAFFIC_AWARE_OPTIMAL",
      computeAlternativeRoutes: false,
    },
  };
  const mutation =
    useMutation<RestGooglePostRouteDirectionsSuccessResponseInterface>({
      mutationKey: FindRideReactQueryKey.RestGooglePostRouteDirections(),
      mutationFn: () => {
        return fetchRestGooglePostRouteDirections(payload);
      },
      onSuccess(data: any) {
        const encodedPolyline = data.routes[0].polyline.encodedPolyline;
        const decodedPolyline = decode(encodedPolyline).map(([lat, lng]) => ({
          lat,
          lng,
        }));
        console.log(decodedPolyline, "ini polyline fetch");
        dispatch({
          type: FindRideActionEnum.SetMapData,
          payload: {
            ...state.map,
            polyline_path: decodedPolyline,
          },
        });
      },
    });

  return mutation;
};
