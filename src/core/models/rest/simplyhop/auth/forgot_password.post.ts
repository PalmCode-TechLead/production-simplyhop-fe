import { User } from "@/core/models/data";
import { NextApiRequest, NextApiResponse } from "next";

export interface PostAuthForgotPasswordRequestInterface extends NextApiRequest {
  payload?: PostAuthForgotPasswordPayloadRequestInterface;
}

export interface PostAuthForgotPasswordPayloadRequestInterface {
  body: PostAuthForgotPasswordBodyRequestInterface;
}

export type PostAuthForgotPasswordBodyRequestInterface = {
  email: string;
};

export type PostAuthForgotPasswordResponseInterface = NextApiResponse<
  | PostAuthForgotPasswordSuccessResponseInterface
  | PostAuthForgotPasswordErrorResponseInterface
>;

export interface PostAuthForgotPasswordSuccessResponseInterface {
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

export interface PostAuthForgotPasswordErrorResponseInterface {
  status: number;
  message: string;
  name: string;
}
