import { User } from "@/core/models/data";
import { NextApiRequest, NextApiResponse } from "next";

export interface PostAuthRegisterRequestInterface extends NextApiRequest {
  payload?: PostAuthRegisterPayloadRequestInterface;
}

export interface PostAuthRegisterPayloadRequestInterface {
  body: PostAuthRegisterBodyRequestInterface;
}

export type PostAuthRegisterBodyRequestInterface = {
  email: string;
  password: string;
  password_confirmation: string;
};

export type PostAuthRegisterResponseInterface = NextApiResponse<
  | PostAuthRegisterSuccessResponseInterface
  | PostAuthRegisterErrorResponseInterface
>;

export interface PostAuthRegisterSuccessResponseInterface {
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

export interface PostAuthRegisterErrorResponseInterface {
  status: number;
  message: string;
  name: string;
}
