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
  const { dispatch: dispatchUser } = React.useContext(UserContext);
  const {
    mutateAsync: postUserProfileCreate,
    isPending: isPendingPostUserProfileCreate,
  } = usePostUserProfileCreate();
  const {
    mutateAsync: postVehicleCreateMy,
    isPending: isPendingPostVehicleCreateMy,
  } = usePostVehicleCreateMy();
  const handleClickSave = async () => {
    const user = await postUserProfileCreate();
    if (!user) return;

    if (state.ride_plan.form.offer_trip.selected?.id === "yes") {
      await postVehicleCreateMy();
    }

    dispatchUser({
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
