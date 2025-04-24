import { MessageRoom } from "@/core/models/data/message_room";

import { NextApiRequest, NextApiResponse } from "next";

export interface GetMessageRoomsIdRequestInterface extends NextApiRequest {
  payload?: GetMessageRoomsIdPayloadRequestInterface;
}

export interface GetMessageRoomsIdPayloadRequestInterface {
  params?: GetMessageRoomsIdParamsPayloadRequestInterface;
  path: GetMessageRoomsIdPathPayloadRequestInterface;
}

export type GetMessageRoomsIdParamsPayloadRequestInterface = {
  include?: string; //messages, messagesCount, messagesExists, passenger, passengerCount, passengerExists, driver, driverCount, driverExists, rideBooking, rideBookingCount, rideBookingExists
};

export interface GetMessageRoomsIdPathPayloadRequestInterface {
  id: string;
}

export type GetMessageRoomsIdResponseInterface = NextApiResponse<
  | GetMessageRoomsIdSuccessResponseInterface
  | GetMessageRoomsIdErrorResponseInterface
>;

export interface GetMessageRoomsIdSuccessResponseInterface {
  response_code: number;
  response_status: string;
  message: string;
  data: MessageRoom;

  redirect: null;
}

export interface GetMessageRoomsIdErrorResponseInterface {
  status: number;
  message: string;
  name: string;
}
