import { NextApiRequest, NextApiResponse } from "next";

export interface RestGoogleGetDistanceMatrixRequestInterface
  extends NextApiRequest {
  payload?: RestGoogleGetDistanceMatrixPayloadRequestInterface;
}

export interface RestGoogleGetDistanceMatrixPayloadRequestInterface {
  params: RestGoogleGetDistanceMatrixParamsPayloadRequestInterface;
}

export type RestGoogleGetDistanceMatrixParamsPayloadRequestInterface = {
  originLat: number;
  originLng: number;
  destLat: number;
  destLng: number;
  // departure_time: string;
  // key: string;
};

export type RestGoogleGetDistanceMatrixResponseInterface = NextApiResponse<
  | RestGoogleGetDistanceMatrixSuccessResponseInterface
  | RestGoogleGetDistanceMatrixErrorResponseInterface
>;

export interface RestGoogleGetDistanceMatrixSuccessResponseInterface {
  distance: {
    text: string; //"575 km";
    value: number; // 575448;
  };
  duration: {
    text: string; //"6 hours 3 mins";
    value: number; //21789;
  };
  duration_in_traffic: {
    text: string; //"5 hours 38 mins";
    value: number; //20304;
  };
}

export interface RestGoogleGetDistanceMatrixErrorResponseInterface {
  response_code: number;
  response_status: string;
  message: string;
  errors: {
    [key: string]: string[];
  };
}
