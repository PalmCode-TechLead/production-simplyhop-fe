"use client";
import * as React from "react";
import clsx from "clsx";
import { getDictionaries } from "../i18n";
import { GeneralVehicleInformationFormVehicleCreateSupport } from "../fragments/general_vehicle_information_form";
import { PictureVehicleInformationFormVehicleCreateSupport } from "../fragments/picture_vehicle_information_form";
import { CapacityVehicleInformationFormVehicleCreateSupport } from "../fragments/capacity_vehicle_information_form";
import { TripVehicleInformationFormVehicleCreateSupport } from "../fragments/trip_vehicle_information_form";
import { CTAVehicleCreateSupport } from "../fragments/cta";
import { NotificationVehicleCreateSupport } from "../fragments/notification";

export const VehicleCreateSupportContainer = () => {
  const dictionaries = getDictionaries();

  return (
    <>
      <div
        className={clsx(
          "grid grid-cols-1 items-start content-start justify-center justify-items-center",
          "w-full",
          "lg:pt-[2rem] px-[1rem]"
        )}
      >
        <div
          className={clsx(
            "grid grid-cols-1 lg:grid-cols-[421px_1fr] place-content-start place-items-start gap-[1.5rem] lg:gap-[100px]",
            "w-full max-w-container"
          )}
        >
          <div
            className={clsx(
              "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
              "w-full",
              "pt-[2rem] lg:pt-[0rem]",
              "sticky top-[90px] lg:top-[calc(90px+2rem)] z-[30]",
              "bg-[white]",
              "pb-[1.5rem]"
            )}
          >
            <h1
              className={clsx(
                "text-[#292929] text-[1.125rem] lg:text-[1.5rem] font-bold"
              )}
            >
              {dictionaries.title}
            </h1>
          </div>

          <div
            className={clsx(
              "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
              "w-full",
              "px-[0rem] py-[0rem] lg:px-[1.5rem] lg:py-[1.5rem]"
            )}
          >
            <div
              className={clsx(
                "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
                "w-full"
              )}
            >
              <h2 className={clsx("text-[1.5rem] text-[#292929] font-bold")}>
                {dictionaries.vehicle_information.title}
              </h2>
              <GeneralVehicleInformationFormVehicleCreateSupport />
              <PictureVehicleInformationFormVehicleCreateSupport />
              <CapacityVehicleInformationFormVehicleCreateSupport />
              <TripVehicleInformationFormVehicleCreateSupport />
            </div>

            <CTAVehicleCreateSupport />
          </div>
        </div>
      </div>

      <NotificationVehicleCreateSupport />
    </>
  );
};
