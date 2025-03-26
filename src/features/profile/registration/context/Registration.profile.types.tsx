type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

// State Collection Types
export interface RegistrationProfileInitialStateType {
  tab: RegistrationProfileTab;
  personal_information: RegistrationProfilePersonalInformation;
  ride_plan: RegistrationProfileRidePlan;
  vehicle_information: RegistrationProfileVehicleInformation;
}

// State Collection Types consist of:
export interface RegistrationProfileTab {
  selected: null | { id: string; name: string };
}

export interface RegistrationProfilePersonalInformation {
  form: {
    email: {
      value: string;
    };
    first_name: {
      value: string;
    };
    last_name: {
      value: string;
    };
    phonenumber: {
      value: string;
    };
  };
}

export interface RegistrationProfileRidePlan {
  form: {
    offer_trip: {
      selected: null | { id: string; name: string };
    };
  };
}

export interface RegistrationProfileVehicleInformation {
  general: {
    form: {
      car_brand: {
        selected: null | { id: string; name: string };
        items: { id: string; name: string }[];
      };
      car_model: {
        value: string;
      };
      car_color: {
        value: string;
      };
      license_plate: {
        value: string;
      };
    };
  };
  pictures: {
    files: null;
  };
  capacity: {
    passenger_seats: {
      form: {
        available_seat: {
          selected: null | { id: string; name: string };
          items: { id: string; name: string }[];
        };
        available_child_seat: {
          selected: null | { id: string; name: string };
          items: { id: string; name: string }[];
        };
        available_car_seat: {
          selected: null | { id: string; name: string };
          items: { id: string; name: string }[];
        };
      };
    };
    luggage: {
      form: {
        luggage: {
          selected: null | { id: string; name: string };
          items: { id: string; name: string }[];
        };
        luggage_size: {
          selected: null | { id: string; name: string };
          items: { id: string; name: string }[];
        };
      };
    };
  };
}

export enum RegistrationProfileActionEnum {
  // Tab
  SetTabData = "SetTabData",
  // PersonalInformation
  SetPersonalInformationData = "SetPersonalInformationData",
  // RidePlan
  SetRidePlanData = "SetRidePlanData",
  // VehicleInformation
  SetVehicleInformationData = "SetVehicleInformationData",
}

// Action Collection Types
export type RegistrationProfileActions =
  | RegistrationProfileTabActions
  | RegistrationProfilePersonalInformationActions
  | RegistrationProfileRidePlanActions
  | RegistrationProfileVehicleInformationActions;

// Action Collection Types consist of:
// Tab
type RegistrationProfileTabPayload = {
  [RegistrationProfileActionEnum.SetTabData]: RegistrationProfileTab;
};

export type RegistrationProfileTabActions =
  ActionMap<RegistrationProfileTabPayload>[keyof ActionMap<RegistrationProfileTabPayload>];

// PersonalInformation
type RegistrationProfilePersonalInformationPayload = {
  [RegistrationProfileActionEnum.SetPersonalInformationData]: RegistrationProfilePersonalInformation;
};

export type RegistrationProfilePersonalInformationActions =
  ActionMap<RegistrationProfilePersonalInformationPayload>[keyof ActionMap<RegistrationProfilePersonalInformationPayload>];

// RidePlan
type RegistrationProfileRidePlanPayload = {
  [RegistrationProfileActionEnum.SetRidePlanData]: RegistrationProfileRidePlan;
};

export type RegistrationProfileRidePlanActions =
  ActionMap<RegistrationProfileRidePlanPayload>[keyof ActionMap<RegistrationProfileRidePlanPayload>];

// VehicleInformation
type RegistrationProfileVehicleInformationPayload = {
  [RegistrationProfileActionEnum.SetVehicleInformationData]: RegistrationProfileVehicleInformation;
};

export type RegistrationProfileVehicleInformationActions =
  ActionMap<RegistrationProfileVehicleInformationPayload>[keyof ActionMap<RegistrationProfileVehicleInformationPayload>];
