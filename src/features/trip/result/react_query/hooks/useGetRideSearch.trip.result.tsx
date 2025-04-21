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
      include: "rideTimes,vehicle,user,vehicle.brand,vehicle.category",
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
      dispatch({
        type: ResultTripActionEnum.SetRidesData,
        payload: {
          ...state.rides,
          data: data.data.map((item) => {
            return {
              driver: {
                profile: {
                  avatar: {
                    image: !item.user.avatar
                      ? undefined
                      : {
                          src: item.user.avatar,
                          alt: "photo_profile",
                        },
                  },
                  name: `${item.user.first_name} ${item.user.last_name}`,
                },
              },
              car: {
                image: {
                  src: !item.vehicle.image.length
                    ? "/images/general/car.png"
                    : item.vehicle.image[0] ?? "",
                  alt: "car",
                  width: 145,
                  height: 46,
                },
                identity: {
                  name: `${item.vehicle.brand.title} ${item.vehicle.model}`,
                  number: item.vehicle.plate_license,
                },
                facility: {
                  top: [
                    {
                      id: "seat",
                      icon: {
                        name: "User",
                        color: "#D41010",
                      },
                      name: {
                        label: "Letzter Platz für deine Buchung",
                        color: "#D41010",
                      },
                    },
                    {
                      id: "luggage",
                      icon: {
                        name: "Briefcase",
                        color: "#D41010",
                      },
                      name: {
                        label: "Kein Gepäck erlaubt",
                        color: "#D41010",
                      },
                    },
                  ],
                  bottom: [
                    {
                      id: "cigarette-off",
                      icon: {
                        name: "CigaretteOff",
                        color: "#727272",
                      },
                      name: {
                        label: "Nichtraucher",
                        color: "#727272",
                      },
                    },
                    {
                      id: "music",
                      icon: {
                        name: "Music",
                        color: "#727272",
                      },
                      name: {
                        label: "Musik erlaubt",
                        color: "#727272",
                      },
                    },
                    {
                      id: "dog",
                      icon: {
                        name: "Dog",
                        color: "#727272",
                      },
                      name: {
                        label: "Haustiere erlaubt",
                        color: "#727272",
                      },
                    },
                  ],
                },
              },

              routes: {
                departure: {
                  place: "Munich",
                  time: "17.30 Uhr",
                },
                travelTime: {
                  time: "1h 15m",
                },
                arrival: {
                  place: "Berlin",
                  time: "18.30 Uhr",
                },
              },

              price: {
                initial: {
                  label: "Angebotspreis",
                  price: "€25.00",
                },
              },
              ride: {
                badge: [
                  {
                    id: "bester_preis",
                    label: "Bester Preis",
                    variant: "success",
                  },
                  {
                    id: "fahrerin",
                    label: "Fahrerin (W)",
                    variant: "danger",
                  },
                ],
              },
              cta: {
                ride: {
                  href: "/mitfahrt-suchen/result?city_id=ChIJ2V-Mo_l1nkcRfZixfUq4DAE&origin_id=ChIJuWG8S2DfnUcRbT-8T9g5EVY&destination_id=ChIJs4qDdmLfnUcRBbJZt1DoAfs&date=2025-03-22&adult=1&children=0&ride_id=1",
                  children: "Mitfahren",
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
