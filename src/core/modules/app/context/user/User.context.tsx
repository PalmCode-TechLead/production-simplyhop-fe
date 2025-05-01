"use client";
import React, {
  createContext,
  useReducer,
  Dispatch,
  useEffect,
  useRef,
} from "react";
import {
  UserActionEnum,
  UserActions,
  UserInitialStateType,
  UserProfile,
} from "./User.types";
import { UserProfileReducers } from "./User.reducers";

const initialState: UserInitialStateType = {
  profile: null,
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
  // ✅ Simpan initialProfile hanya sekali
  const didInitialize = useRef(false);
  const [state, dispatch] = useReducer(mainReducer, initialState);

  useEffect(() => {
    if (!didInitialize.current && !!props.profile) {
      dispatch({
        type: UserActionEnum.SetProfileData,
        payload: {
          ...state.profile,
          ...props.profile,
        },
      });
      didInitialize.current = true;
    }
  }, []);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {props.children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
