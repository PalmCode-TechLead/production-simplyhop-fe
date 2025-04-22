import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { VehicleUpdateSupportReactQueryKey } from "../keys";

import {
  VehicleUpdateSupportActionEnum,
  VehicleUpdateSupportContext,
} from "../../context";
import { fetchGetVehicleBrandList } from "@/core/services/rest/simplyhop/vehicle_brand";
import {
  GetVehicleBrandListErrorResponseInterface,
  GetVehicleBrandListSuccessResponseInterface,
} from "@/core/models/rest/simplyhop/vehicle_brand";

export const useGetVehicleBrandList = () => {
  const { state, dispatch } = React.useContext(VehicleUpdateSupportContext);

  const query = useQuery<
    GetVehicleBrandListSuccessResponseInterface,
    GetVehicleBrandListErrorResponseInterface
  >({
    queryKey: VehicleUpdateSupportReactQueryKey.GetVehicleBrandList(),
    queryFn: () => {
      return fetchGetVehicleBrandList();
    },
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
              car_brand: {
                ...state.vehicle_information.general.form.car_brand,
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
