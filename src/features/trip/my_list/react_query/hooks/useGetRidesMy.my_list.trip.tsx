import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { MyListTripReactQueryKey } from "../keys";

import { MyListTripActionEnum, MyListTripContext } from "../../context";

import { getDictionaries as getGlobalDictionaries } from "@/core/modules/app/i18n";
import { SVGIconProps } from "@/core/icons";
import { fetchGetRidesMy } from "@/core/services/rest/simplyhop/rides";
import {
  GetRidesMyErrorResponseInterface,
  GetRidesMyPayloadRequestInterface,
  GetRidesMySuccessResponseInterface,
} from "@/core/models/rest/simplyhop/rides";

export const useGetRidesMy = () => {
  const globalDictionaries = getGlobalDictionaries();
  const { state, dispatch } = React.useContext(MyListTripContext);

  const payload: GetRidesMyPayloadRequestInterface = {
    params: {
      include: "vehicle.brand",
    },
  };
  const query = useQuery<
    GetRidesMySuccessResponseInterface,
    GetRidesMyErrorResponseInterface
  >({
    queryKey: MyListTripReactQueryKey.GetRidesMy(),
    queryFn: () => {
      return fetchGetRidesMy(payload);
    },
  });

  React.useEffect(() => {
    if (!!query.data && !query.isFetching) {
      const data = query.data;
    }
  }, [query.data, query.isFetching]);
  return query;
};
