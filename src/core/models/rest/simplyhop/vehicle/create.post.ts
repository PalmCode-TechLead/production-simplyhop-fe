import { NextApiRequest, NextApiResponse } from "next";

export interface PostVehicleCreateRequestInterface extends NextApiRequest {
  payload?: PostVehicleCreatePayloadRequestInterface;
}

export interface PostVehicleCreatePayloadRequestInterface {
  body: PostVehicleCreateBodyRequestInterface;
}

export type PostVehicleCreateBodyRequestInterface = {
  user_id: number;
  category_id: number;
  brand_id: number;
  model: string;
  color: string;
  plate_license: string;
  total_places: string;
  numb_of_free_seats: number;
  smoke_allowed: boolean;
  pet_allowed: boolean;
  music_availability: boolean;
  childseat_availability: boolean;
  numb_of_childseat: number;
  numb_of_luggages: number;
  size_of_luggages: string;
  image: File[];
};

export type PostVehicleCreateResponseInterface = NextApiResponse<
  | PostVehicleCreateSuccessResponseInterface
  | PostVehicleCreateErrorResponseInterface
>;

export interface PostVehicleCreateSuccessResponseInterface {
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

export interface PostVehicleCreateErrorResponseInterface {
  status: number;
  message: string;
  name: string;
}
