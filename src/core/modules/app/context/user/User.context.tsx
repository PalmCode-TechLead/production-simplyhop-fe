"use client";
import React, { createContext, useReducer, Dispatch, useEffect } from "react";
import {
  UserActionEnum,
  UserActions,
  UserInitialStateType,
  UserProfile,
} from "./User.types";
import { UserProfileReducers } from "./User.reducers";

const initialState: UserInitialStateType = {
  profile: {
    id: null,
    avatar: null,
    first_name: "",
    last_name: "",
    email: "",
    phonenumber: "",
    city: "",
    about_me: "",
    is_driver: false,
  },
};

const UserContext = createContext<{
  state: UserInitialStateType;
  dispatch: Dispatch<UserActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { profile }: UserInitialStateType,
  action: UserActions
) => ({
  profile: UserProfileReducers(profile, action),
});

const UserProvider = (props: {
  children: React.ReactNode;
  profile?: UserProfile;
}) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  useEffect(() => {
    if (!!props.profile) {
      dispatch({
        type: UserActionEnum.SetProfileData,
        payload: {
          ...state.profile,
          ...props.profile,
        },
      });
    }
  }, [props?.profile]);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {props.children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
