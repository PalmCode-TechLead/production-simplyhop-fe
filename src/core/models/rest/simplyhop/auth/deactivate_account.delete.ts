import { NextApiRequest, NextApiResponse } from "next";

export interface DeleteAuthDeactivateAccountRequestInterface
  extends NextApiRequest {
  payload: DeleteAuthDeactivateAccountPayloadRequestInterface;
}

export interface DeleteAuthDeactivateAccountPayloadRequestInterface {
  body: DeleteAuthDeactivateAccountBodyPayloadRequestInterface;
}
export interface DeleteAuthDeactivateAccountBodyPayloadRequestInterface {
  password: string;
}

export type DeleteAuthDeactivateAccountResponseInterface = NextApiResponse<
  | DeleteAuthDeactivateAccountSuccessResponseInterface
  | DeleteAuthDeactivateAccountErrorResponseInterface
>;

export interface DeleteAuthDeactivateAccountSuccessResponseInterface {
  response_code: number;
  response_status: string;
  message: string;
  data: {
    id: number; //1;
    first_name: string; //"Gracie";
    last_name: string; //"Effertz";
    email: string; //"user@example.com";
    mobile: string | null;
    city: string | null;
    email_verified_at: string; //"2025-04-22 10:44:18";
    avatar: string | null;
    is_driver: number; //1;
    can_share_ride: number; //0;
    deleted_at: string | null;
    created_at: string; //"2025-04-22 03:44:21";
    updated_at: string; //"2025-04-22 03:46:39";
    profile: {
      id: number; //1;
      mobile_is_show: boolean; //false;
      bio: string; //"Neque rerum itaque eius saepe.";
      information: string; //"Aut eum asperiores fuga qui. Laudantium magni animi magni assumenda consectetur omnis voluptatem. Veniam voluptas esse quibusdam et eius.";
      deleted_at: string | null;
      created_at: string; //"2025-04-22T03:44:27.000000Z";
      updated_at: string; //"2025-04-22T03:44:27.000000Z";
    };
  };

  Callback: null;
}

export interface DeleteAuthDeactivateAccountErrorResponseInterface {
  status: number;
  message: string;
  name: string;
}
