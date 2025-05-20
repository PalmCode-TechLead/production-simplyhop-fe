import { User } from "@/core/models/data";
import { NextApiRequest, NextApiResponse } from "next";

export interface PostAuthResetPasswordRequestInterface extends NextApiRequest {
  payload?: PostAuthResetPasswordPayloadRequestInterface;
}

export interface PostAuthResetPasswordPayloadRequestInterface {
  body: PostAuthResetPasswordBodyRequestInterface;
}

export type PostAuthResetPasswordBodyRequestInterface = {
  token: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export type PostAuthResetPasswordResponseInterface = NextApiResponse<
  | PostAuthResetPasswordSuccessResponseInterface
  | PostAuthResetPasswordErrorResponseInterface
>;

export interface PostAuthResetPasswordSuccessResponseInterface {
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

export interface PostAuthResetPasswordErrorResponseInterface {
  status: number;
  message: string;
  name: string;
}
