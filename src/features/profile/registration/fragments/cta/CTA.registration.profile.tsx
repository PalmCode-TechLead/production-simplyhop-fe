import { Button } from "@/core/components/button";
import * as React from "react";
import clsx from "clsx";
import { getDictionaries } from "../../i18n";
import {
  RegistrationProfileActionEnum,
  RegistrationProfileContext,
} from "../../context";
import {
  usePostUserProfileCreate,
  usePostVehicleCreateMy,
} from "../../react_query/hooks";
import { MoonLoader } from "@/core/components/moon_loader";
import { UserActionEnum, UserContext } from "@/core/modules/app/context";

export const CTARegistrationProfile = () => {
  const dictionaries = getDictionaries();
  const { state, dispatch } = React.useContext(RegistrationProfileContext);
  const { state: userState, dispatch: dispatchUser } =
    React.useContext(UserContext);
  const {
    mutateAsync: postUserProfileCreate,
    isPending: isPendingPostUserProfileCreate,
  } = usePostUserProfileCreate();
  const {
    mutateAsync: postVehicleCreateMy,
    isPending: isPendingPostVehicleCreateMy,
  } = usePostVehicleCreateMy();
  const handleClickSave = async () => {
    await postUserProfileCreate();

    if (state.ride_plan.form.offer_trip.selected?.id === "yes") {
      await postVehicleCreateMy();
    }

    if (userState.profile) {
      dispatchUser({
        type: UserActionEnum.SetProfileData,
        payload: {
          ...userState.profile,
          first_name: state.personal_information.form.first_name.value,
          last_name: state.personal_information.form.last_name.value,
          city: state.personal_information.form.city.value,
          phonenumber: state.personal_information.form.phonenumber.value,
          about_me: state.personal_information.form.about_me.value,
          gender: state.personal_information.form.gender.selected?.id ?? null,
        },
      });
    }

    dispatch({
      type: RegistrationProfileActionEnum.SetNotificationData,
      payload: {
        ...state.notification,
        is_open: true,
      },
    });
  };

  const isSaveDisabled =
    isPendingPostUserProfileCreate || isPendingPostVehicleCreateMy;
  const isSaveLoading =
    isPendingPostUserProfileCreate || isPendingPostVehicleCreateMy;
  return (
    <Button
      disabled={isSaveDisabled}
      isLoading={isSaveLoading}
      className={clsx("py-[1rem]")}
      onClick={handleClickSave}
    >
      {isSaveLoading && <MoonLoader size={20} color={"white"} />}
      {dictionaries.cta.save.children}
    </Button>
  );
};
