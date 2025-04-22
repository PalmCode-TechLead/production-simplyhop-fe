import { Button } from "@/core/components/button";
import * as React from "react";
import clsx from "clsx";
import { getDictionaries } from "../../i18n";
import {
  VehicleUpdateSupportActionEnum,
  VehicleUpdateSupportContext,
} from "../../context";
import { usePostVehicleCreateMy } from "../../react_query/hooks";
import { MoonLoader } from "@/core/components/moon_loader";

export const CTAVehicleUpdateSupport = () => {
  const dictionaries = getDictionaries();
  const { state, dispatch } = React.useContext(VehicleUpdateSupportContext);

  const {
    mutateAsync: postVehicleCreateMy,
    isPending: isPendingPostVehicleCreateMy,
  } = usePostVehicleCreateMy();
  const handleClickSave = async () => {
    await postVehicleCreateMy();
    dispatch({
      type: VehicleUpdateSupportActionEnum.SetNotificationData,
      payload: {
        ...state.notification,
        is_open: true,
      },
    });
  };

  const isSaveDisabled = isPendingPostVehicleCreateMy;
  const isSaveLoading = isPendingPostVehicleCreateMy;
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
