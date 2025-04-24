import { User } from "@/core/models/data";
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
    user: User;
  };
  redirect: null;
}

export interface PostAuthLoginErrorResponseInterface {
  status: number;
  message: string;
  name: string;
}
