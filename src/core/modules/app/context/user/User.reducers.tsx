import { UserActionEnum, UserActions, UserProfile } from "./User.types";

// Profile
export const UserProfileReducers = (
  state: UserProfile,
  action: UserActions
) => {
  switch (action.type) {
    case UserActionEnum.SetProfileData:
      return action.payload;

    default:
      return state;
  }
};
