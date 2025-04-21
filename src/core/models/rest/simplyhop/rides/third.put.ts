import { NextApiRequest, NextApiResponse } from "next";

export interface PutRidesThirdRequestInterface extends NextApiRequest {
  payload?: PutRidesThirdPayloadRequestInterface;
}

export interface PutRidesThirdPayloadRequestInterface {
  body: PutRidesThirdBodyPayloadRequestInterface;
  path: PutRidesThirdPathPayloadRequestInterface;
}

export type PutRidesThirdPathPayloadRequestInterface = {
  id: number;
};

export type PutRidesThirdBodyPayloadRequestInterface = {
  maxtwo_backseat: boolean; //false;
  base_price: number; //120;
};

export type PutRidesThirdResponseInterface = NextApiResponse<
  PutRidesThirdSuccessResponseInterface | PutRidesThirdErrorResponseInterface
>;

export interface PutRidesThirdSuccessResponseInterface {
  response_code: number;
  response_status: string;
  message: string;
  data: {
    token: string;
    token_type: string;
    user: {
      id: number;
      name: string;
      email: string;
      avatar: string;
      email_verified_at: string;
      created_at: string;
      updated_at: string;
    };
  };
  redirect: null;
}

export interface PutRidesThirdErrorResponseInterface {
  status: number;
  message: string;
  name: string;
}
