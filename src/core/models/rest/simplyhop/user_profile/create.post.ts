import { User } from "@/core/models/data";
import { NextApiRequest, NextApiResponse } from "next";

export interface PostUserProfileCreateRequestInterface extends NextApiRequest {
  payload?: PostUserProfileCreatePayloadRequestInterface;
}

export interface PostUserProfileCreatePayloadRequestInterface {
  body: FormData;
}

export type PostUserProfileCreateBodyPayloadRequestInterface = {
  first_name?: string;
  last_name?: string;
  city?: string;
  mobile?: string;
  ride_offer?: boolean;
  mobile_is_show?: boolean;
  bio?: string;
  information?: string;
  is_driver?: boolean;
  gender?: string;
  profile_picture?: File;
};

export type PostUserProfileCreateResponseInterface = NextApiResponse<
  | PostUserProfileCreateSuccessResponseInterface
  | PostUserProfileCreateErrorResponseInterface
>;

export interface PostUserProfileCreateSuccessResponseInterface {
  response_code: number;
  response_status: string;
  message: string;
  data: User;
  redirect: null;
}

export interface PostUserProfileCreateErrorResponseInterface {
  status: number;
  message: string;
  name: string;
}
