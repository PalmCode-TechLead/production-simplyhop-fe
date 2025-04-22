"use client";
import React, { createContext, useReducer, Dispatch } from "react";
import {
  VehicleUpdateSupportActions,
  VehicleUpdateSupportInitialStateType,
} from "./VehicleUpdate.support.types";
import {
  VehicleUpdateSupportNotificationReducers,
  VehicleUpdateSupportVehicleInformationReducers,
} from "./VehicleUpdate.support.reducers";

const initialState: VehicleUpdateSupportInitialStateType = {
  vehicle_information: {
    general: {
      form: {
        car_brand: {
          selected: null,
          items: [],
          error: null,
        },
        car_category: {
          selected: null,
          items: [],
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

const VehicleUpdateSupportContext = createContext<{
  state: VehicleUpdateSupportInitialStateType;
  dispatch: Dispatch<VehicleUpdateSupportActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { vehicle_information, notification }: VehicleUpdateSupportInitialStateType,
  action: VehicleUpdateSupportActions
) => ({
  vehicle_information: VehicleUpdateSupportVehicleInformationReducers(
    vehicle_information,
    action
  ),
  notification: VehicleUpdateSupportNotificationReducers(notification, action),
});

const VehicleUpdateSupportProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <VehicleUpdateSupportContext.Provider value={{ state, dispatch }}>
      {props.children}
    </VehicleUpdateSupportContext.Provider>
  );
};

export { VehicleUpdateSupportProvider, VehicleUpdateSupportContext };
