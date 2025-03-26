import * as React from "react";
import clsx from "clsx";
import { getDictionaries } from "../../i18n";
import { UploadInput } from "@/core/components/upload_input";

export const PictureVehicleInformationFormRegistrationProfile = () => {
  const dictionaries = getDictionaries();
  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-[0.75rem]",
        "w-full"
      )}
    >
      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start gap-[0.25rem]",
          "w-full"
        )}
      >
        <p className={clsx("text-[0.875rem] text-[#232323CC] font-medium")}>
          {dictionaries.vehicle_information.pictures.title}
        </p>
        <p className={clsx("text-[0.75rem] text-[#606060] font-normal")}>
          {dictionaries.vehicle_information.pictures.description}
        </p>
      </div>

      {/* form */}
      <UploadInput />
    </div>
  );
};
