import {
  RegistrationProfileActionEnum,
  RegistrationProfileActions,
  RegistrationProfilePersonalInformation,
  RegistrationProfileTab,
} from "./Registration.profile.types";

// Tab
export const RegistrationProfileTabReducers = (
  state: RegistrationProfileTab,
  action: RegistrationProfileActions
) => {
  switch (action.type) {
    case RegistrationProfileActionEnum.SetTabData:
      return action.payload;

    default:
      return state;
  }
};

// PersonalInformation
export const RegistrationProfilePersonalInformationReducers = (
  state: RegistrationProfilePersonalInformation,
  action: RegistrationProfileActions
) => {
  switch (action.type) {
    case RegistrationProfileActionEnum.SetPersonalInformationData:
      return action.payload;

    default:
      return state;
  }
};
