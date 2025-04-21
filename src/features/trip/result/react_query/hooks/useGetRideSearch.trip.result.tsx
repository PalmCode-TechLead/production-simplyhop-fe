import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { ResultTripReactQueryKey } from "../keys";

import { ResultTripActionEnum, ResultTripContext } from "../../context";

import { fetchGetRidesSearch } from "@/core/services/rest/simplyhop/ride/search.get";
import {
  GetRidesSearchErrorResponseInterface,
  GetRidesSearchSuccessResponseInterface,
  GetRidesSearchPayloadRequestInterface,
} from "@/core/models/rest/simplyhop/rides";

export const useGetRideSearch = () => {
  const { state, dispatch } = React.useContext(ResultTripContext);

  const payload: GetRidesSearchPayloadRequestInterface = {
    params: {
      start_lat: 52.5200066,
      start_long: 13.414954,
      destination_lat: 48.1351253,
      destination_long: 11.5819804,
      include: "rideTimes,vehicle",
      // sort:'-base_price'
    },
  };
  const query = useQuery<
    GetRidesSearchSuccessResponseInterface,
    GetRidesSearchErrorResponseInterface
  >({
    queryKey: ResultTripReactQueryKey.RestSimplyHopGetRideSearch(),
    queryFn: () => {
      return fetchGetRidesSearch(payload);
    },
  });

  React.useEffect(() => {
    if (!!query.data && !query.isFetching) {
      const data = query.data;
      // dispatch({
      //   type: ResultTripActionEnum.SetVehicleInformationData,
      //   payload: {
      //     ...state.vehicle_information,
      //     general: {
      //       ...state.vehicle_information.general,
      //       form: {
      //         ...state.vehicle_information.general.form,
      //         car_brand: {
      //           ...state.vehicle_information.general.form.car_brand,
      //           items: data.data.map((item) => {
      //             return {
      //               id: String(item.id),
      //               name: item.title,
      //             };
      //           }),
      //         },
      //       },
      //     },
      //   },
      // });
    }
  }, [query.data, query.isFetching]);
  return query;
};
