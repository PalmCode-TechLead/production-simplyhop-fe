"use client";
import React, {
  createContext,
  useReducer,
  Dispatch,
  useEffect,
  // useRef,
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
  profile?: UserProfile | null;
}) => {
  // ✅ Simpan initialProfile hanya sekali
  // const didInitialize = useRef(false);
  const [state, dispatch] = useReducer(mainReducer, initialState);

  // useEffect(() => {
  //   if (!didInitialize.current) {
  //     dispatch({
  //       type: UserActionEnum.SetProfileData,
  //       payload: props.profile ?? null,
  //     });
  //     didInitialize.current = true;
  //   }
  // }, []);
  useEffect(() => {
    dispatch({
      type: UserActionEnum.SetProfileData,
      payload: props.profile ?? null,
    });
  }, [props.profile]);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {props.children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
