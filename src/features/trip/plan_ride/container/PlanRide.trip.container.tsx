import * as React from "react";
import clsx from "clsx";
import { MapPlanRideTrip } from "../fragments/map";
import { BadgePlanRideTrip } from "../fragments/badge";
import { FilterPlanRideTrip } from "../fragments/filter";
import { DetailPlanRideTrip } from "../fragments/detail";
import { NotificationPlanRideTrip } from "../fragments/notification";
import { IncompleteProfilePlaneRideTrip } from "../fragments/incomplete_profile";

export const PlanRideTripContainer = () => {
  return (
    <>
      <div className={clsx("w-full h-full", "relative")}>
        <MapPlanRideTrip />
        <div
          className={clsx(
            "grid grid-rows-1 grid-cols-1 items-stretch content-between justify-center justify-items-center",
            "absolute z-[10]",
            "w-full top-[0rem] h-[calc(100vh-90px)]",
            "pt-[1.5rem] pb-[0rem] lg:pb-[1.5rem]"
          )}
        >
          <div
            className={clsx(
              "grid grid-rows-1 items-stretch content-between justify-start justify-items-start",
              "max-w-container",
              "w-full h-full"
            )}
          >
            <div
              className={clsx(
                "flex flex-col lg:flex-row items-start justify-between",
                "w-full h-full",
                "px-[1rem] lg:px-[0rem] pb-[1rem] lg:pb-[0rem]",
                "max-w-container"
              )}
            >
              <BadgePlanRideTrip />

              <IncompleteProfilePlaneRideTrip />
            </div>

            <FilterPlanRideTrip />
          </div>
        </div>
      </div>
      <DetailPlanRideTrip />
      <NotificationPlanRideTrip />
    </>
  );
};
