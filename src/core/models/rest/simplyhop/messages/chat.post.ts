import { NextApiRequest, NextApiResponse } from "next";

export interface PostMessagesChatRequestInterface extends NextApiRequest {
  payload?: PostMessagesChatPayloadRequestInterface;
}

export interface PostMessagesChatPayloadRequestInterface {
  body: PostMessagesChatBodyPayloadRequestInterface;
}

export type PostMessagesChatBodyPayloadRequestInterface = {
  message_room_id: number; //1;
  message: string; //"The passenger has booked a ride and offered a price of 60";
};

export type PostMessagesChatResponseInterface = NextApiResponse<
  | PostMessagesChatSuccessResponseInterface
  | PostMessagesChatErrorResponseInterface
>;

export interface PostMessagesChatSuccessResponseInterface {
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

export interface PostMessagesChatErrorResponseInterface {
  status: number;
  message: string;
  name: string;
}
