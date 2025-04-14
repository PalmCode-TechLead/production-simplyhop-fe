"use client";
import React, { createContext, useReducer, Dispatch } from "react";
import {
  RegistrationProfileActions,
  RegistrationProfileInitialStateType,
} from "./Registration.profile.types";
import {
  RegistrationProfileNotificationReducers,
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
        error: null,
      },
      first_name: {
        value: "",
        error: null,
      },
      last_name: {
        value: "",
        error: null,
      },
      phonenumber: {
        value: "",
        error: null,
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
          error: null,
        },
        car_model: {
          value: "",
          error: null,
        },
        car_color: {
          value: "",
          error: null,
        },
        license_plate: {
          value: "",
          error: null,
        },
      },
    },
    pictures: {
      files: [],
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
      },
    },
  },
  notification: {
    is_open: false,
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
    notification,
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
  notification: RegistrationProfileNotificationReducers(notification, action),
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
