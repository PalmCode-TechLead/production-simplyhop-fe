import { Booking } from "@/core/models/data";
import { NextApiRequest, NextApiResponse } from "next";

export interface GetBookingIdRequestInterface extends NextApiRequest {
  payload?: GetBookingIdPayloadRequestInterface;
}

export interface GetBookingIdPayloadRequestInterface {
  params?: GetBookingIdParamsPayloadRequestInterface;
  path: GetBookingIdPathPayloadRequestInterface;
}

export type GetBookingIdParamsPayloadRequestInterface = {
  include?: string;
};

export type GetBookingIdPathPayloadRequestInterface = {
  id: string;
};

export type GetBookingIdResponseInterface = NextApiResponse<
  GetBookingIdSuccessResponseInterface | GetBookingIdErrorResponseInterface
>;

export interface GetBookingIdSuccessResponseInterface {
  response_code: number;
  response_status: string;
  message: string;
  data: Booking;

  redirect: null;
}

export interface GetBookingIdErrorResponseInterface {
  status: number;
  message: string;
  name: string;
}
