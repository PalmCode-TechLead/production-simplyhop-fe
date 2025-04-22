import { FormError } from "@/core/utils/form";

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
  notification: RegistrationProfileNotification;
}

// State Collection Types consist of:
export interface RegistrationProfileTab {
  selected: null | { id: string; name: string };
}

export interface RegistrationProfilePersonalInformation {
  form: {
    email: {
      value: string;
      error: FormError;
    };
    first_name: {
      value: string;
      error: FormError;
    };
    last_name: {
      value: string;
      error: FormError;
    };
    city: {
      value: string;
      error: FormError;
    };
    phonenumber: {
      value: string;
      error: FormError;
    };
    about_me: {
      value: string;
      error: FormError;
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
        error: FormError;
      };
      car_category: {
        selected: null | { id: string; name: string };
        items: { id: string; name: string }[];
        error: FormError;
      };
      car_model: {
        value: string;
        error: FormError;
      };
      car_color: {
        value: string;
        error: FormError;
      };
      license_plate: {
        value: string;
        error: FormError;
      };
    };
  };
  pictures: {
    files: File[];
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
  trip: {
    form: {
      smoking: {
        selected: null | { id: string; name: string };
        items: { id: string; name: string }[];
      };
      music: {
        selected: null | { id: string; name: string };
        items: { id: string; name: string }[];
      };
      pet: {
        selected: null | { id: string; name: string };
        items: { id: string; name: string }[];
      };
    };
  };
}

export interface RegistrationProfileNotification {
  is_open: boolean;
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
  // Notification
  SetNotificationData = "SetNotificationData",
}

// Action Collection Types
export type RegistrationProfileActions =
  | RegistrationProfileTabActions
  | RegistrationProfilePersonalInformationActions
  | RegistrationProfileRidePlanActions
  | RegistrationProfileVehicleInformationActions
  | RegistrationProfileNotificationActions;

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

// Notification
type RegistrationProfileNotificationPayload = {
  [RegistrationProfileActionEnum.SetNotificationData]: RegistrationProfileNotification;
};

export type RegistrationProfileNotificationActions =
  ActionMap<RegistrationProfileNotificationPayload>[keyof ActionMap<RegistrationProfileNotificationPayload>];
