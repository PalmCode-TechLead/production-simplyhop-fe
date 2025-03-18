import React, { createContext, useReducer, Dispatch } from "react";
import { FindRideActions, FindRideInitialStateType } from "./Find.ride.types";
import { FindRideDetailsReducers } from "./Find.ride.reducers";

const initialState: FindRideInitialStateType = {
  details: {
    form: {
      username: {
        value: "",
      },
      location: {
        value: "",
      },
      profile_picture: {
        value: null,
        link: "",
      },
    },
  },
};

const FindRideContext = createContext<{
  state: FindRideInitialStateType;
  dispatch: Dispatch<FindRideActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { details }: FindRideInitialStateType,
  action: FindRideActions
) => ({
  details: FindRideDetailsReducers(details, action),
});

const FindRideProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <FindRideContext.Provider value={{ state, dispatch }}>
      {props.children}
    </FindRideContext.Provider>
  );
};

export { FindRideProvider, FindRideContext };
