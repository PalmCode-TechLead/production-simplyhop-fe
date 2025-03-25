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

export enum RegistrationProfileActionEnum {
  // Tab
  SetTabData = "SetTabData",
  // PersonalInformation
  SetPersonalInformationData = "SetPersonalInformationData",
}

// Action Collection Types
export type RegistrationProfileActions =
  | RegistrationProfileTabActions
  | RegistrationProfilePersonalInformationActions;

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
