"use client";
import React, { createContext, useReducer, Dispatch } from "react";
import {
  RegistrationProfileActions,
  RegistrationProfileInitialStateType,
} from "./Registration.profile.types";
import {
  RegistrationProfilePersonalInformationReducers,
  RegistrationProfileRidePlanReducers,
  RegistrationProfileTabReducers,
  RegistrationProfileVehicleInformationReducers,
} from "./Registration.profile.reducers";

const initialState: RegistrationProfileInitialStateType = {
  tab: {
    selected: null,
  },
  personal_information: {
    form: {
      email: {
        value: "",
      },
      first_name: {
        value: "",
      },
      last_name: {
        value: "",
      },
      phonenumber: {
        value: "",
      },
    },
  },
  ride_plan: {
    form: {
      offer_trip: {
        selected: null,
      },
    },
  },
  vehicle_information: {
    general: {
      form: {
        car_brand: {
          selected: null,
          items: [
            {
              id: "mercedes-benz",
              name: "Mercedes Benz",
            },
            {
              id: "bmw",
              name: "BMW",
            },
            {
              id: "toyota",
              name: "Toyota",
            },
            {
              id: "hyundai",
              name: "Hyundai",
            },
          ],
        },
        car_model: {
          value: "",
        },
        car_color: {
          value: "",
        },
        license_plate: {
          value: "",
        },
      },
    },
    pictures: {
      files: null,
    },
    capacity: {
      passenger_seats: {
        form: {
          available_seat: {
            selected: null,
            items: [],
          },
          available_child_seat: {
            selected: null,
            items: [],
          },
          available_car_seat: {
            selected: null,
            items: [],
          },
        },
      },
      luggage: {
        form: {
          luggage: {
            selected: null,
            items: [],
          },
          luggage_size: {
            selected: null,
            items: [],
          },
        },
      },
    },
    trip: {
      form: {
        smoking: {
          selected: null,
          items: [],
        },
        music: {
          selected: null,
          items: [],
        },
        pet: {
          selected: null,
          items: [],
        },
        child_seat_number: {
          selected: null,
          items: [],
        },
        free_seat_number: {
          selected: null,
          items: [],
        },
      },
    },
  },
};

const RegistrationProfileContext = createContext<{
  state: RegistrationProfileInitialStateType;
  dispatch: Dispatch<RegistrationProfileActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  {
    tab,
    personal_information,
    ride_plan,
    vehicle_information,
  }: RegistrationProfileInitialStateType,
  action: RegistrationProfileActions
) => ({
  tab: RegistrationProfileTabReducers(tab, action),
  personal_information: RegistrationProfilePersonalInformationReducers(
    personal_information,
    action
  ),
  ride_plan: RegistrationProfileRidePlanReducers(ride_plan, action),
  vehicle_information: RegistrationProfileVehicleInformationReducers(
    vehicle_information,
    action
  ),
});

const RegistrationProfileProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <RegistrationProfileContext.Provider value={{ state, dispatch }}>
      {props.children}
    </RegistrationProfileContext.Provider>
  );
};

export { RegistrationProfileProvider, RegistrationProfileContext };
