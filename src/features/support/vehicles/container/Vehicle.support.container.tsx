"use client";
import * as React from "react";
import clsx from "clsx";
import { ListVehiclesSupport } from "../fragments/list";
import { Button } from "@/core/components/button";
import { getDictionaries } from "../i18n";
import Link from "next/link";
import { AppCollectionURL } from "@/core/utils/router/constants";
import { RidePlanFormVehiclesSupport } from "../fragments/ride_plan_form";
import { UserContext } from "@/core/modules/app/context";

export const VehiclesSupportContainer = () => {
  const { state: userState } = React.useContext(UserContext);
  const dictionaries = getDictionaries();

  return (
    <div className={clsx("w-full h-full", "pb-[3rem]", "relative")}>
      <div
        className={clsx(
          "grid grid-rows-1 grid-cols-1 items-start content-start justify-center justify-items-center",
          "w-full h-full",
          "px-[1rem]"
        )}
      >
        <div
          className={clsx(
            "grid grid-rows-1 grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
            "max-w-container w-full h-full"
          )}
        >
          <div
            className={clsx(
              "grid grid-rows-1 grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
              "w-full h-full",
              "border border-[#D3E7CE]",
              "px-[1.5rem] py-[1.5rem]",
              "rounded-[1.25rem]"
            )}
          >
            <h1 className={clsx("text-[#292929] text-[1.5rem] font-bold")}>
              {dictionaries.title}
            </h1>
            <RidePlanFormVehiclesSupport />
            <div
              className={clsx(
                "flex items-center justify-between",
                "w-full",
                userState.profile.is_driver ? "opacity-100" : "opacity-50"
              )}
            >
              <div
                className={clsx(
                  "grid grid-cols-1 items-start content-start justify-start justify-items-start gap-[0.5rem]"
                )}
              >
                <h1
                  className={clsx("text-[#292929] text-[1.125rem] font-bold")}
                >
                  {dictionaries.list.title}
                </h1>
                {!userState.profile.is_driver && (
                  <p
                    className={clsx(
                      "text-[#606060] text-[0.875rem] font-normal"
                    )}
                  >
                    {dictionaries.list.is_not_driver_label}
                  </p>
                )}
              </div>

              {userState.profile.is_driver ? (
                <Link href={AppCollectionURL.private.support_vehicle_create()}>
                  <Button
                    disabled={!userState.profile.is_driver}
                    className={clsx("!px-[1rem] !py-[0.5rem]")}
                  >
                    {dictionaries.cta.create.children}
                  </Button>
                </Link>
              ) : (
                <Button
                  disabled={!userState.profile.is_driver}
                  className={clsx("!px-[1rem] !py-[0.5rem]", "!w-fit")}
                >
                  {dictionaries.cta.create.children}
                </Button>
              )}
            </div>
            {userState.profile.is_driver && <ListVehiclesSupport />}
          </div>
        </div>
      </div>
    </div>
  );
};
