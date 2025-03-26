"use client";
import * as React from "react";
import clsx from "clsx";
import { getDictionaries } from "../i18n";
import { TabRegistrationProfile } from "../fragments/tab";
import { PersonalInformationFormRegistrationProfile } from "../fragments/personal_information_form";
import { Divider } from "@/core/components/divider";
import { RidePlanFormRegistrationProfile } from "../fragments/ride_plan_form";
import { GeneralVehicleInformationFormRegistrationProfile } from "../fragments/general_vehicle_information_form";
import { RegistrationProfileContext } from "../context";
import { PictureVehicleInformationFormRegistrationProfile } from "../fragments/picture_vehicle_information_form";
import { CapacityVehicleInformationFormRegistrationProfile } from "../fragments/capacity_vehicle_information_form";
import { TripVehicleInformationFormRegistrationProfile } from "../fragments/trip_vehicle_information_form";
import { CTARegistrationProfile } from "../fragments/cta";
import { NotificationRegistrationProfile } from "../fragments/notification";

export const RegistrationProfileContainer = () => {
  const dictionaries = getDictionaries();
  const { state } = React.useContext(RegistrationProfileContext);
  return (
    <>
      <div
        className={clsx(
          "grid grid-cols-1 items-start content-start justify-center justify-items-center",
          "w-full",
          "pt-[2rem]"
        )}
      >
        <div
          className={clsx(
            "grid grid-cols-[421px_1fr] place-content-start place-items-start gap-[100px]",
            "w-full max-w-container"
          )}
        >
          <div
            className={clsx(
              "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
              "w-full",
              "sticky top-[100px]"
            )}
          >
            <h1 className={clsx("text-[#292929] text-[1.5rem] font-bold")}>
              {dictionaries.title}
            </h1>
            <TabRegistrationProfile />
          </div>

          <div
            className={clsx(
              "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
              "w-full",
              "px-[1.5rem] py-[1.5rem]"
            )}
          >
            <PersonalInformationFormRegistrationProfile />
            <Divider />
            <RidePlanFormRegistrationProfile />
            {state.ride_plan.form.offer_trip.selected?.id === "yes" && (
              <div
                className={clsx(
                  "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
                  "w-full"
                )}
              >
                <h2 className={clsx("text-[1.5rem] text-[#292929] font-bold")}>
                  {dictionaries.vehicle_information.title}
                </h2>
                <GeneralVehicleInformationFormRegistrationProfile />
                <PictureVehicleInformationFormRegistrationProfile />
                <CapacityVehicleInformationFormRegistrationProfile />
                <TripVehicleInformationFormRegistrationProfile />
              </div>
            )}
            <CTARegistrationProfile />
          </div>
        </div>
      </div>
      
      <NotificationRegistrationProfile />
    </>
  );
};
