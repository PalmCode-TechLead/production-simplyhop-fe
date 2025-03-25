import * as React from "react";
import clsx from "clsx";
import { getDictionaries } from "../i18n";
import { TabRegistrationProfile } from "../fragments/tab";
import { PersonalInformationFormRegistrationProfile } from "../fragments/personal_information_form";

export const RegistrationProfileContainer = () => {
  const dictionaries = getDictionaries();
  return (
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
            "w-full"
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
        </div>
      </div>
    </div>
  );
};
