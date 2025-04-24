import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { VehiclesSupportReactQueryKey } from "../keys";

import {
  VehiclesSupportContext,
  VehiclesSupportActionEnum,
} from "../../context";

import {
  GetVehicleMyErrorResponseInterface,
  GetVehicleMyPayloadRequestInterface,
  GetVehicleMySuccessResponseInterface,
} from "@/core/models/rest/simplyhop/vehicle";
import { fetchGetVehicleMy } from "@/core/services/rest/simplyhop/vehicle";
import { getDictionaries as getGlobalDictionaries } from "@/core/modules/app/i18n";
import { SVGIconProps } from "@/core/icons";
import { AppCollectionURL } from "@/core/utils/router/constants";

export const useGetVehicleMy = () => {
  const globalDictionaries = getGlobalDictionaries();
  const { state, dispatch } = React.useContext(VehiclesSupportContext);

  const payload: GetVehicleMyPayloadRequestInterface = {
    params: {
      include: "brand",
    },
  };
  const query = useQuery<
    GetVehicleMySuccessResponseInterface,
    GetVehicleMyErrorResponseInterface
  >({
    queryKey: VehiclesSupportReactQueryKey.GetVehicleMy(),
    queryFn: () => {
      return fetchGetVehicleMy(payload);
    },
  });

  React.useEffect(() => {
    if (!!query.data && !query.isFetching) {
      const data = query.data;
      dispatch({
        type: VehiclesSupportActionEnum.SetListData,
        payload: {
          ...state.list,
          data: data.data.map((item) => {
            return {
              id: String(item.id),
              car: {
                image: {
                  src: !item.image.length
                    ? "/images/general/car.png"
                    : item.image[0] ?? "/images/general/car.png",
                  alt: "car",
                  width: 145,
                  height: 46,
                },
                identity: {
                  name: `${item.brand?.title} ${item.model}`,
                  number: item.plate_license,
                },
                facility: {
                  top: [
                    ...(!!item.numb_free_seats
                      ? [
                          {
                            ...globalDictionaries.car.facility.seat.available,
                            icon: {
                              ...globalDictionaries.car.facility.seat.available
                                .icon,
                              name: globalDictionaries.car.facility.seat
                                .available.icon.name as SVGIconProps["name"],
                            },
                            name: {
                              ...globalDictionaries.car.facility.seat.available
                                .name,
                              label:
                                globalDictionaries.car.facility.seat.available.name.label.replaceAll(
                                  "{{number}}",
                                  item.numb_free_seats.toLocaleString("de-DE")
                                ),
                            },
                          },
                        ]
                      : [
                          {
                            ...globalDictionaries.car.facility.seat.empty,
                            icon: {
                              ...globalDictionaries.car.facility.seat.empty
                                .icon,
                              name: globalDictionaries.car.facility.seat.empty
                                .icon.name as SVGIconProps["name"],
                            },
                          },
                        ]),
                    ...(!!item.numb_of_luggages
                      ? [
                          {
                            ...globalDictionaries.car.facility.seat.luggage
                              .available,
                            icon: {
                              ...globalDictionaries.car.facility.seat.luggage
                                .available.icon,
                              name: globalDictionaries.car.facility.seat.luggage
                                .available.icon.name as SVGIconProps["name"],
                            },
                            name: {
                              ...globalDictionaries.car.facility.seat.luggage
                                .available.name,
                              label:
                                globalDictionaries.car.facility.seat.luggage.available.name.label.replaceAll(
                                  "{{number}}",
                                  item.numb_free_seats.toLocaleString("de-DE")
                                ),
                            },
                          },
                        ]
                      : [
                          {
                            ...globalDictionaries.car.facility.seat.luggage
                              .empty,
                            icon: {
                              ...globalDictionaries.car.facility.seat.luggage
                                .empty.icon,
                              name: globalDictionaries.car.facility.seat.luggage
                                .empty.icon.name as SVGIconProps["name"],
                            },
                          },
                        ]),
                  ],
                  bottom: [
                    // Smoking
                    ...(!!item.smoke_allowed
                      ? [
                          {
                            ...globalDictionaries.car.facility.seat.smoking
                              .allowed,
                            icon: {
                              ...globalDictionaries.car.facility.seat.smoking
                                .allowed.icon,
                              name: globalDictionaries.car.facility.seat.smoking
                                .allowed.icon.name as SVGIconProps["name"],
                            },
                          },
                        ]
                      : [
                          {
                            ...globalDictionaries.car.facility.seat.smoking
                              .prohibited,
                            icon: {
                              ...globalDictionaries.car.facility.seat.smoking
                                .prohibited.icon,
                              name: globalDictionaries.car.facility.seat.smoking
                                .prohibited.icon.name as SVGIconProps["name"],
                            },
                          },
                        ]),

                    // Music
                    ...(!!item.music_availability
                      ? [
                          {
                            ...globalDictionaries.car.facility.seat.music
                              .allowed,
                            icon: {
                              ...globalDictionaries.car.facility.seat.music
                                .allowed.icon,
                              name: globalDictionaries.car.facility.seat.music
                                .allowed.icon.name as SVGIconProps["name"],
                            },
                          },
                        ]
                      : [
                          {
                            ...globalDictionaries.car.facility.seat.music
                              .prohibited,
                            icon: {
                              ...globalDictionaries.car.facility.seat.music
                                .prohibited.icon,
                              name: globalDictionaries.car.facility.seat.music
                                .prohibited.icon.name as SVGIconProps["name"],
                            },
                          },
                        ]),

                    // Pet
                    ...(!!item.pet_allowed
                      ? [
                          {
                            ...globalDictionaries.car.facility.seat.pets
                              .allowed,
                            icon: {
                              ...globalDictionaries.car.facility.seat.pets
                                .allowed.icon,
                              name: globalDictionaries.car.facility.seat.pets
                                .allowed.icon.name as SVGIconProps["name"],
                            },
                          },
                        ]
                      : [
                          {
                            ...globalDictionaries.car.facility.seat.pets
                              .prohibited,
                            icon: {
                              ...globalDictionaries.car.facility.seat.pets
                                .prohibited.icon,
                              name: globalDictionaries.car.facility.seat.pets
                                .prohibited.icon.name as SVGIconProps["name"],
                            },
                          },
                        ]),
                  ],
                },
              },

              cta: {
                ride: {
                  href: AppCollectionURL.private.support_vehicle_detail(
                    item.id.toString()
                  ),
                  children: "Siehe Details",
                },
              },
            };
          }),
        },
      });
    }
  }, [query.data, query.isFetching]);
  return query;
};
