import { NextApiRequest, NextApiResponse } from "next";

export type PostAuthLogoutRequestInterface = NextApiRequest;

export type PostAuthLogoutResponseInterface = NextApiResponse<
  PostAuthLogoutSuccessResponseInterface | PostAuthLogoutErrorResponseInterface
>;

export interface PostAuthLogoutSuccessResponseInterface {
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

export interface PostAuthLogoutErrorResponseInterface {
  status: number;
  message: string;
  name: string;
}
