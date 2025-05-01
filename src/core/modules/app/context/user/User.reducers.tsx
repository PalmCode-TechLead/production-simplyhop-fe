import { UserActionEnum, UserActions, UserProfile } from "./User.types";

// Profile
export const UserProfileReducers = (
  state: UserProfile | null,
  action: UserActions
) => {
  switch (action.type) {
    case UserActionEnum.SetProfileData: {
      console.log(action.payload, "ini payload");
      return action.payload;
    }

    default:
      return state;
  }
};
