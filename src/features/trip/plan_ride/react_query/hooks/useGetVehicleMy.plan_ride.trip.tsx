import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { PlanRideTripReactQueryKey } from "../keys";

import { PlanRideTripContext, PlanRideTripActionEnum } from "../../context";

import {
  GetVehicleMyErrorResponseInterface,
  GetVehicleMyPayloadRequestInterface,
  GetVehicleMySuccessResponseInterface,
} from "@/core/models/rest/simplyhop/vehicle";
import { fetchGetVehicleMy } from "@/core/services/rest/simplyhop/vehicle";

export const useGetVehicleMy = () => {
  const { state, dispatch } = React.useContext(PlanRideTripContext);

  const payload: GetVehicleMyPayloadRequestInterface = {
    params: {
      include: "brand",
    },
  };
  const query = useQuery<
    GetVehicleMySuccessResponseInterface,
    GetVehicleMyErrorResponseInterface
  >({
    queryKey: PlanRideTripReactQueryKey.GetVehicleMy(),
    queryFn: () => {
      return fetchGetVehicleMy(payload);
    },
  });

  React.useEffect(() => {
    if (!!query.data && !query.isFetching) {
      const data = query.data;
      dispatch({
        type: PlanRideTripActionEnum.SetFiltersData,
        payload: {
          ...state.filters,
          auto:{
            ...state.filters.auto,
            items:data.data.map(((item)=>{
              return {
                id:String(item.id),
                name:`${item.brand.title} ${item.model}`,
              }
            }))
          }
        },
      });
    }
  }, [query.data, query.isFetching]);
  return query;
};
