import { User } from "@/core/models/data";
import { NextApiRequest, NextApiResponse } from "next";

export interface GetUserProfileDataRequestInterface extends NextApiRequest {
  payload: GetUserProfileDataPayloadRequestInterface;
}

export interface GetUserProfileDataPayloadRequestInterface {
  headers: GetUserProfileDataHeadersPayloadRequestInterface;
}
export interface GetUserProfileDataHeadersPayloadRequestInterface {
  token: string;
}

export type GetUserProfileDataResponseInterface = NextApiResponse<
  | GetUserProfileDataSuccessResponseInterface
  | GetUserProfileDataErrorResponseInterface
>;

export interface GetUserProfileDataSuccessResponseInterface {
  response_code: number;
  response_status: string;
  message: string;
  data: User;

  redirect: null;
}

export interface GetUserProfileDataErrorResponseInterface {
  status: number;
  message: string;
  name: string;
}
