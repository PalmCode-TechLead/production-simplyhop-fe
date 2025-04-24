import { User, Message } from "@/core/models/data";
import { MessageRoom } from "@/core/models/data/message_room";

import { NextApiRequest, NextApiResponse } from "next";

export interface GetMessageRoomsListRequestInterface extends NextApiRequest {
  payload?: GetMessageRoomsListPayloadRequestInterface;
}

export interface GetMessageRoomsListPayloadRequestInterface {
  params?: GetMessageRoomsListParamsPayloadRequestInterface;
}

export type GetMessageRoomsListParamsPayloadRequestInterface = {
  include?: string; //messages, messagesCount, messagesExists, passenger, passengerCount, passengerExists, driver, driverCount, driverExists, rideBooking, rideBookingCount, rideBookingExists
  "filter[driver_id]"?: number;
  "filter[passenger_id]"?: number;

  sort?: string;

  "page[number]"?: number;
  "page[size]"?: number;
};

export type GetMessageRoomsListResponseInterface = NextApiResponse<
  | GetMessageRoomsListSuccessResponseInterface
  | GetMessageRoomsListErrorResponseInterface
>;

export interface GetMessageRoomsListSuccessResponseInterface {
  response_code: number;
  response_status: string;
  message: string;
  data: MessageRoom[];

  redirect: null;
}

export interface GetMessageRoomsListErrorResponseInterface {
  status: number;
  message: string;
  name: string;
}
