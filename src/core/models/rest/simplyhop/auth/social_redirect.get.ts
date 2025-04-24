import { NextApiRequest, NextApiResponse } from "next";

export interface GetAuthSocialRedirectRequestInterface extends NextApiRequest {
  payload: GetAuthSocialRedirectPayloadRequestInterface;
}

export interface GetAuthSocialRedirectPayloadRequestInterface {
  path: GetAuthSocialRedirectPathPayloadRequestInterface;
}
export interface GetAuthSocialRedirectPathPayloadRequestInterface {
  provider: string;
}

export type GetAuthSocialRedirectResponseInterface = NextApiResponse<
  | GetAuthSocialRedirectSuccessResponseInterface
  | GetAuthSocialRedirectErrorResponseInterface
>;

export interface GetAuthSocialRedirectSuccessResponseInterface {
  response_code: number;
  response_status: string;
  message: string;
  data: {
    url: string;
  };

  redirect: null;
}

export interface GetAuthSocialRedirectErrorResponseInterface {
  status: number;
  message: string;
  name: string;
}
