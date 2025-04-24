import { VehicleCategoryMedia } from "./vehicle_category_media";

export interface VehicleCategory {
  id: number;
  title: string;
  image: string;
  created_at: string;
  updated_at: string;
  deleted_at: null | string;
  media: VehicleCategoryMedia[];
}
