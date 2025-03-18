import {
  FindRideActionEnum,
  FindRideActions,
  FindRideDetails,
} from "./Find.ride.types";

// Details
export const FindRideDetailsReducers = (
  state: FindRideDetails,
  action: FindRideActions
) => {
  switch (action.type) {
    case FindRideActionEnum.SetDetailsData:
      return action.payload;

    default:
      return state;
  }
};
