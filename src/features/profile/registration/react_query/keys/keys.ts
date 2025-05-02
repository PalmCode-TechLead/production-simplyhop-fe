import { GetVehicleBrandListPayloadRequestInterface } from "@/core/models/rest/simplyhop/vehicle_brand";
import { GetVehicleCategoryListPayloadRequestInterface } from "@/core/models/rest/simplyhop/vehicle_category";

export const RegistrationProfileReactQueryKey = {
  GetVehicleBrandList: (
    payload?: GetVehicleBrandListPayloadRequestInterface
  ) => {
    return [
      "RegistrationProfileReactQueryKey.GetVehicleBrandList",
      [payload] as const,
    ];
  },
  GetVehicleCategoryList: (
    payload?: GetVehicleCategoryListPayloadRequestInterface
  ) => {
    return [
      "RegistrationProfileReactQueryKey.GetVehicleCategoryList",
      [payload] as const,
    ];
  },
  PostUserProfileCreate: () => {
    return ["RegistrationProfileReactQueryKey.PostUserProfileCreate"];
  },
  PostVehicleCreateMy: () => {
    return ["RegistrationProfileReactQueryKey.PostVehicleCreateMy"];
  },
  PostVehicleBrandCreate: () => {
    return ["RegistrationProfileReactQueryKey.PostVehicleBrandCreate"];
  },
  PostVehicleCategoryCreate: () => {
    return ["RegistrationProfileReactQueryKey.PostVehicleCategoryCreate"];
  },
};
