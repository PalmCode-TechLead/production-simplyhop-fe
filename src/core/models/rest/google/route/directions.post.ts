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
  response_code: number;
  response_status: string;
  message: string;
  data: {
    authorization: {
      type: string;
      expires_in: number;
      token: string;
    };
    user: {
      id: number;
      email: string;
      email_verified_at: null | string;
      created_at: string;
      updated_at: string;
      role: string;
    };
  };
  redirect: null;
}

export interface RestGooglePostRouteDirectionsErrorResponseInterface {
  response_code: number;
  response_status: string;
  message: string;
  errors: {
    [key: string]: string[];
  };
}
