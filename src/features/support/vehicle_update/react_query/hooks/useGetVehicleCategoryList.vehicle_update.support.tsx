import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { VehicleUpdateSupportReactQueryKey } from "../keys";

import {
  VehicleUpdateSupportActionEnum,
  VehicleUpdateSupportContext,
} from "../../context";
import {
  GetVehicleCategoryListErrorResponseInterface,
  GetVehicleCategoryListPayloadRequestInterface,
  GetVehicleCategoryListSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/vehicle_category";
import { fetchGetVehicleCategoryList } from "@/core/services/rest/simplyhop/vehicle_category";

export const useGetVehicleCategoryList = () => {
  const { state, dispatch } = React.useContext(VehicleUpdateSupportContext);

  const payload: GetVehicleCategoryListPayloadRequestInterface = {
    params: {
      search: !state.vehicle_information.general.form.car_brand.query
        ? undefined
        : state.vehicle_information.general.form.car_brand.query,
      "page[number]": 1,
      "page[size]": 30,
    },
  };

  const query = useQuery<
    GetVehicleCategoryListSuccessResponseInterface,
    GetVehicleCategoryListErrorResponseInterface
  >({
    queryKey: VehicleUpdateSupportReactQueryKey.GetVehicleCategoryList(payload),
    queryFn: () => {
      return fetchGetVehicleCategoryList(payload);
    },
    enabled: !!state.vehicle_information.general.form.car_brand.items.length,
  });

  React.useEffect(() => {
    if (!!query.data && !query.isFetching) {
      const data = query.data;
      dispatch({
        type: VehicleUpdateSupportActionEnum.SetVehicleInformationData,
        payload: {
          ...state.vehicle_information,
          general: {
            ...state.vehicle_information.general,
            form: {
              ...state.vehicle_information.general.form,
              car_category: {
                ...state.vehicle_information.general.form.car_category,
                items: data.data.map((item) => {
                  return {
                    id: String(item.id),
                    name: item.title,
                  };
                }),
              },
            },
          },
        },
      });
    }
  }, [query.data, query.isFetching]);
  return query;
};
