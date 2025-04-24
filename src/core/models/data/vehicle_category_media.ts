export interface VehicleCategoryMedia {
  id: number;
  model_type: string;
  model_id: string;
  uuid: string;
  collection_name: string;
  name: string;
  file_name: string;
  mime_type: string;
  disk: string;
  conversions_disk: string;
  size: number;
  manipulations: string[];
  custom_properties: string[];
  generated_conversions: string[];
  responsive_images: string[];
  order_column: number;
  created_at: string;
  updated_at: string;
  original_url: string;
  preview_url: string;
}
