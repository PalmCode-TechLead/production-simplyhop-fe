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
export interface FindRideInitialStateType {
  details: FindRideDetails;
}

// State Collection Types consist of:
export interface FindRideDetails {
  form: {
    username: {
      value: string;
    };
    location: {
      value: string;
    };
    profile_picture: {
      value: FileList | null;
      link: string;
    };
  };
}

export enum FindRideActionEnum {
  // Details
  SetDetailsData = "SetDetailsData",
}

// Action Collection Types
export type FindRideActions = FindRideDetailsActions;

// Action Collection Types consist of:
// Details
type FindRideDetailsPayload = {
  [FindRideActionEnum.SetDetailsData]: FindRideDetails;
};

export type FindRideDetailsActions =
  ActionMap<FindRideDetailsPayload>[keyof ActionMap<FindRideDetailsPayload>];
