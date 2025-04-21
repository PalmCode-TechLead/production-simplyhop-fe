import { NextApiRequest, NextApiResponse } from "next";

export interface PostAuthLoginRequestInterface extends NextApiRequest {
  payload?: PostAuthLoginPayloadRequestInterface;
}

export interface PostAuthLoginPayloadRequestInterface {
  body: PostAuthLoginBodyRequestInterface;
}

export type PostAuthLoginBodyRequestInterface = {
  email: string;
  password: string;
};

export type PostAuthLoginResponseInterface = NextApiResponse<
  PostAuthLoginSuccessResponseInterface | PostAuthLoginErrorResponseInterface
>;

export interface PostAuthLoginSuccessResponseInterface {
  response_code: number;
  response_status: string;
  message: string;
  data: {
    token: string;
    token_type: string;
    user: {
      id: number;
      first_name: string;
      last_name: string;
      email: string;
      mobile: null | string;
      city: null | string;
      email_verified_at: string;
      avatar: null;
      is_driver: number;
      deleted_at: null;
      created_at: string;
      updated_at: string;
    };
  };
  redirect: null;
}

export interface PostAuthLoginErrorResponseInterface {
  status: number;
  message: string;
  name: string;
}
