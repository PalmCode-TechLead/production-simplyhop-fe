import { NextApiRequest, NextApiResponse } from "next";

export interface PutMessageRoomsMarkAsReadRequestInterface
  extends NextApiRequest {
  payload?: PutMessageRoomsMarkAsReadPayloadRequestInterface;
}

export interface PutMessageRoomsMarkAsReadPayloadRequestInterface {
  path: PutMessageRoomsMarkAsReadPathPayloadRequestInterface;
}

export type PutMessageRoomsMarkAsReadPathPayloadRequestInterface = {
  roomId: string;
};

export type PutMessageRoomsMarkAsReadResponseInterface = NextApiResponse<
  | PutMessageRoomsMarkAsReadSuccessResponseInterface
  | PutMessageRoomsMarkAsReadErrorResponseInterface
>;

export interface PutMessageRoomsMarkAsReadSuccessResponseInterface {
  response_code: number;
  response_status: string;
  message: string;
  data: {
    token: string;
    token_type: string;
  };
  redirect: null;
}

export interface PutMessageRoomsMarkAsReadErrorResponseInterface {
  status: number;
  message: string;
  name: string;
}
