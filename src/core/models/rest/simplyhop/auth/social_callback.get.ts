import { User } from "@/core/models/data";
import { NextApiRequest, NextApiResponse } from "next";

export interface GetAuthSocialCallbackRequestInterface extends NextApiRequest {
  payload: GetAuthSocialCallbackPayloadRequestInterface;
}

export interface GetAuthSocialCallbackPayloadRequestInterface {
  path: GetAuthSocialCallbackPathPayloadRequestInterface;
  params: GetAuthSocialCallbackParamsPayloadRequestInterface;
}
export interface GetAuthSocialCallbackPathPayloadRequestInterface {
  provider: string;
}
export interface GetAuthSocialCallbackParamsPayloadRequestInterface {
  code: string;
}

export type GetAuthSocialCallbackResponseInterface = NextApiResponse<
  | GetAuthSocialCallbackSuccessResponseInterface
  | GetAuthSocialCallbackErrorResponseInterface
>;

export interface GetAuthSocialCallbackSuccessResponseInterface {
  response_code: number;
  response_status: string;
  message: string;
  data: {
    token: string;
    token_type: string;
    user: User;
  };

  Callback: null;
}

export interface GetAuthSocialCallbackErrorResponseInterface {
  status: number;
  message: string;
  name: string;
}
