import { NextApiRequest, NextApiResponse } from "next";

export interface PostUserProfileCreateRequestInterface extends NextApiRequest {
  payload?: PostUserProfileCreatePayloadRequestInterface;
}

export interface PostUserProfileCreatePayloadRequestInterface {
  body: PostUserProfileCreateBodyPayloadRequestInterface;
}

export type PostUserProfileCreateBodyPayloadRequestInterface = {
  first_name: string;
  last_name: string;
  city: string;
  mobile: string;
  ride_offer: boolean;
  mobile_is_show: boolean;
  bio: string;
  information: string;
};

export type PostUserProfileCreateResponseInterface = NextApiResponse<
  | PostUserProfileCreateSuccessResponseInterface
  | PostUserProfileCreateErrorResponseInterface
>;

export interface PostUserProfileCreateSuccessResponseInterface {
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

export interface PostUserProfileCreateErrorResponseInterface {
  status: number;
  message: string;
  name: string;
}
