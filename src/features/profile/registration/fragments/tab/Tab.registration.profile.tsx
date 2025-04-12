"use client";
import * as React from "react";
import clsx from "clsx";
import { getDictionaries } from "../../i18n";
import {
  RegistrationProfileActionEnum,
  RegistrationProfileContext,
} from "../../context";
import { useTailwindBreakpoint } from "@/core/utils/ui/hooks";
import dynamic from "next/dynamic";

const TabButton = dynamic(
  () => import("@/core/components/tab_button").then((mod) => mod.TabButton),
  {
    ssr: false,
  }
);

export const TabRegistrationProfile = () => {
  const dictionaries = getDictionaries();
  const { state, dispatch } = React.useContext(RegistrationProfileContext);
  const { isLg } = useTailwindBreakpoint();
  React.useEffect(() => {
    dispatch({
      type: RegistrationProfileActionEnum.SetTabData,
      payload: {
        ...state.tab,
        selected:
          dictionaries.tab.items.find((_, index) => index === 0) ?? null,
      },
    });
  }, [dictionaries.tab.items]);

  const handleClickTabButton = (data: { id: string; name: string }) => {
    dispatch({
      type: RegistrationProfileActionEnum.SetTabData,
      payload: {
        ...state.tab,
        selected: data,
      },
    });
  };
  const tabItems =
    state.ride_plan.form.offer_trip.selected?.id === "yes"
      ? dictionaries.tab.items
      : dictionaries.tab.items.filter(
          (item) => item.id === "personal-information"
        );
  return (
    <React.Suspense fallback={<div />}>
      <div
        className={clsx(
          "grid grid-flow-col lg:grid-flow-row lg:grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
          "w-full",
          "overflow-auto"
        )}
      >
        {tabItems.map((menu, index) => {
          return (
            <TabButton
              key={index}
              variant={isLg ? "vertical" : "horizontal"}
              selected={state.tab.selected?.id === menu.id}
              onClick={() => handleClickTabButton(menu)}
            >
              {menu.name}
            </TabButton>
          );
        })}
      </div>
    </React.Suspense>
  );
};
