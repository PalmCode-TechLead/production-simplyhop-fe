import { NextApiRequest, NextApiResponse } from "next";

export interface RestGooglePostRouteDirectionsRequestInterface
  extends NextApiRequest {
  payload?: RestGooglePostRouteDirectionsPayloadRequestInterface;
}

export interface RestGooglePostRouteDirectionsPayloadRequestInterface {
  body: RestGooglePostRouteDirectionsBodyRequestInterface;
}

export type RestGooglePostRouteDirectionsBodyRequestInterface = {
  origin: {
    location: {
      latLng: { latitude: number; longitude: number };
    };
  };
  destination: {
    location: {
      latLng: { latitude: number; longitude: number };
    };
  };
  travelMode: string;
  routingPreference: string;
  computeAlternativeRoutes: boolean;
};

export type RestGooglePostRouteDirectionsResponseInterface = NextApiResponse<
  | RestGooglePostRouteDirectionsSuccessResponseInterface
  | RestGooglePostRouteDirectionsErrorResponseInterface
>;

export interface RestGooglePostRouteDirectionsSuccessResponseInterface {
  routes: {
    polyline: {
      encodedPolyline: string;
    };
  }[];
}

export interface RestGooglePostRouteDirectionsErrorResponseInterface {
  response_code: number;
  response_status: string;
  message: string;
  errors: {
    [key: string]: string[];
  };
}
