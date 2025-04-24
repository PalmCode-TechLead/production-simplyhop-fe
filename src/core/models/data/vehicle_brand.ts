import { VehicleBrandMedia } from "./vehicle_brand_media";

export interface VehicleBrand {
  id: number;
  title: string;
  icon: null | string;
  deleted_at: null | string;
  created_at: string;
  updated_at: string;
  image: string;
  media: VehicleBrandMedia[];
}
