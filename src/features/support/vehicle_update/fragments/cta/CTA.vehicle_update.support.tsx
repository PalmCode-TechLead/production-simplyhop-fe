import { Button } from "@/core/components/button";
import * as React from "react";
import clsx from "clsx";
import { getDictionaries } from "../../i18n";
import {
  VehicleUpdateSupportActionEnum,
  VehicleUpdateSupportContext,
} from "../../context";
import { usePostVehicleUpdate } from "../../react_query/hooks";
import { MoonLoader } from "@/core/components/moon_loader";

export const CTAVehicleUpdateSupport = () => {
  const dictionaries = getDictionaries();
  const { state, dispatch } = React.useContext(VehicleUpdateSupportContext);

  const {
    mutateAsync: postVehicleUpdate,
    isPending: isPendingPostVehicleUpdate,
  } = usePostVehicleUpdate();
  const handleClickSave = async () => {
    await postVehicleUpdate();
    dispatch({
      type: VehicleUpdateSupportActionEnum.SetNotificationData,
      payload: {
        ...state.notification,
        is_open: true,
      },
    });
  };

  const isSaveDisabled = isPendingPostVehicleUpdate;
  const isSaveLoading = isPendingPostVehicleUpdate;
  return (
    <div
      className={clsx(
        "grid grid-flow-col items-center content-center justify-end justify-items-end gap-[0.5rem]",
        "w-full"
      )}
    >
      <Button
        disabled={isSaveDisabled}
        isLoading={isSaveLoading}
        className={clsx("py-[1rem]")}
        onClick={handleClickSave}
      >
        {isSaveLoading && <MoonLoader size={20} color={"white"} />}
        {dictionaries.cta.save.children}
      </Button>
    </div>
  );
};
