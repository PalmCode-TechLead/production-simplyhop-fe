import { Meta } from "@/core/models/data";
import { MessageRoom } from "@/core/models/data/message_room";

import { NextApiRequest, NextApiResponse } from "next";

export interface GetMessageRoomsUnreadListRequestInterface
  extends NextApiRequest {
  payload?: GetMessageRoomsUnreadListPayloadRequestInterface;
}

export interface GetMessageRoomsUnreadListPayloadRequestInterface {
  params?: GetMessageRoomsUnreadListParamsPayloadRequestInterface;
}

export type GetMessageRoomsUnreadListParamsPayloadRequestInterface = {
  include?: string; //messages, messagesCount, messagesExists, passenger, passengerCount, passengerExists, driver, driverCount, driverExists, rideBooking, rideBookingCount, rideBookingExists
  "filter[driver_id]"?: number;
  "filter[passenger_id]"?: number;
  search?: string;
  sort?: string;

  "page[number]"?: number;
  "page[size]"?: number;
};

export type GetMessageRoomsUnreadListResponseInterface = NextApiResponse<
  | GetMessageRoomsUnreadListSuccessResponseInterface
  | GetMessageRoomsUnreadListErrorResponseInterface
>;

export interface GetMessageRoomsUnreadListSuccessResponseInterface {
  response_code: number;
  response_status: string;
  message: string;
  data: MessageRoom[];

  redirect: null;
  meta: Meta;
}

export interface GetMessageRoomsUnreadListErrorResponseInterface {
  status: number;
  message: string;
  name: string;
}
