import { Button } from "@/core/components/button";
import * as React from "react";
import clsx from "clsx";
import { getDictionaries } from "../../i18n";
import {
  RegistrationProfileActionEnum,
  RegistrationProfileContext,
} from "../../context";

export const CTARegistrationProfile = () => {
  const dictionaries = getDictionaries();
  const { state, dispatch } = React.useContext(RegistrationProfileContext);
  const handleClickSave = () => {
    dispatch({
      type: RegistrationProfileActionEnum.SetNotificationData,
      payload: {
        ...state.notification,
        is_open: true,
      },
    });
  };
  return (
    <Button className={clsx("py-[1rem]")} onClick={handleClickSave}>
      {dictionaries.cta.save.children}
    </Button>
  );
};
