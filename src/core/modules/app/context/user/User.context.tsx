"use client";
import React, {
  createContext,
  useReducer,
  Dispatch,
  useEffect,
  useRef,
  useCallback,
} from "react";
import {
  UserActionEnum,
  UserActions,
  UserInitialStateType,
  UserProfile,
} from "./User.types";
import { UserProfileReducers } from "./User.reducers";
import { fetchGetUserProfileData } from "@/core/services/rest/simplyhop/user_profile";
import { GetUserProfileDataSuccessResponseInterface } from "@/core/models/rest/simplyhop/user_profile";

const initialState: UserInitialStateType = {
  profile: null,
};

const UserContext = createContext<{
  state: UserInitialStateType;
  dispatch: Dispatch<UserActions>;
  refreshProfile: () => Promise<void>;
}>({
  state: initialState,
  dispatch: () => null,
  refreshProfile: async () => {},
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
      console.log(props.profile, "ini kepanggil berapa kali");
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

  const refreshProfile = useCallback(async () => {
    try {
      const res = await fetchGetUserProfileData();
      const user = res as GetUserProfileDataSuccessResponseInterface;
      dispatch({
        type: UserActionEnum.SetProfileData,
        payload: {
          id: user.data.id,
          first_name: user.data?.first_name ?? "",
          last_name: user.data?.last_name ?? "",
          avatar: user.data.avatar,
          email: user.data.email,
          phonenumber: user.data?.mobile ?? "",
          city: user.data?.city ?? "",
          about_me: user.data?.profile?.bio ?? "",
          is_driver: user.data?.is_driver === 1 ? true : false,
          gender: user.data?.gender ?? null,
          is_able_to_ride: user.data.can_share_ride,
        },
      });
    } catch (e) {
      console.error("Failed to refresh profile:", e);
    }
  }, []);

  return (
    <UserContext.Provider value={{ state, dispatch, refreshProfile }}>
      {props.children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
