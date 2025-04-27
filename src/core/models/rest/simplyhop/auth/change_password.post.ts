import { User } from "@/core/models/data";
import { NextApiRequest, NextApiResponse } from "next";

export interface PostAuthChangePasswordRequestInterface extends NextApiRequest {
  payload?: PostAuthChangePasswordPayloadRequestInterface;
}

export interface PostAuthChangePasswordPayloadRequestInterface {
  body: PostAuthChangePasswordBodyRequestInterface;
}

export type PostAuthChangePasswordBodyRequestInterface = {
  old_password: string;
  password: string;
  password_confirmation: string;
};

export type PostAuthChangePasswordResponseInterface = NextApiResponse<
  | PostAuthChangePasswordSuccessResponseInterface
  | PostAuthChangePasswordErrorResponseInterface
>;

export interface PostAuthChangePasswordSuccessResponseInterface {
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

export interface PostAuthChangePasswordErrorResponseInterface {
  status: number;
  message: string;
  name: string;
}
