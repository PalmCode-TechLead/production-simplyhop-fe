import { NextApiRequest, NextApiResponse } from "next";

export interface PutMessageRoomsMakeAsReadRequestInterface
  extends NextApiRequest {
  payload?: PutMessageRoomsMakeAsReadPayloadRequestInterface;
}

export interface PutMessageRoomsMakeAsReadPayloadRequestInterface {
  path: PutMessageRoomsMakeAsReadPathPayloadRequestInterface;
}

export type PutMessageRoomsMakeAsReadPathPayloadRequestInterface = {
  roomId: number;
};

export type PutMessageRoomsMakeAsReadResponseInterface = NextApiResponse<
  | PutMessageRoomsMakeAsReadSuccessResponseInterface
  | PutMessageRoomsMakeAsReadErrorResponseInterface
>;

export interface PutMessageRoomsMakeAsReadSuccessResponseInterface {
  response_code: number;
  response_status: string;
  message: string;
  data: {
    token: string;
    token_type: string;
    user: {
      id: number;
      name: string;
      email: string;
      avatar: string;
      email_verified_at: string;
      created_at: string;
      updated_at: string;
    };
  };
  redirect: null;
}

export interface PutMessageRoomsMakeAsReadErrorResponseInterface {
  status: number;
  message: string;
  name: string;
}
