"use client";
import * as React from "react";
import clsx from "clsx";
import { getDictionaries } from "../../i18n";
import { getDictionaries as getGlobalDictionaries } from "@/core/modules/app/i18n";
import { ItemAccountSupport } from "../../components/item";
import Link from "next/link";
import { AppCollectionURL } from "@/core/utils/router/constants/app";
import { UserContext } from "@/core/modules/app/context";
import SVGIcon from "@/core/icons";

export const InformationAccountSupport = () => {
  const globalDictionaries = getGlobalDictionaries();
  const dictionaries = getDictionaries();

  const { state: userState } = React.useContext(UserContext);

  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
        "w-full",
        "px-[1.5rem] py-[1.5rem]",
        "relative",
        "border border-[#D3E7CE]",
        "rounded-[1.25rem]"
      )}
    >
      <div
        className={clsx(
          "grid grid-flow-col items-center content-center justify-between justify-items-start gap-[0.5rem]",
          "w-full"
        )}
      >
        <h2 className={clsx("text-[#292929] text-[1.5rem] font-bold")}>
          {dictionaries.title}
        </h2>
        <Link href={AppCollectionURL.private.support_account_edit()}>
          <SVGIcon
            name="Pencil"
            className={clsx("w-[1.5rem] h-[1.5rem]", "text-[#33CC33]")}
          />
        </Link>
      </div>

      <ItemAccountSupport
        name={dictionaries.information.email.name}
        value={!userState.profile?.email.length ? "-" : userState.profile.email}
      />
      <div
        className={clsx(
          "grid grid-cols-1 lg:grid-cols-2 place-content-start place-items-start gap-[1rem]",
          "w-full"
        )}
      >
        <ItemAccountSupport
          name={dictionaries.information.first_name.name}
          value={
            !userState.profile?.first_name.length
              ? "-"
              : userState.profile.first_name
          }
        />
        <ItemAccountSupport
          name={dictionaries.information.last_name.name}
          value={
            !userState.profile?.last_name.length
              ? "-"
              : userState.profile.last_name
          }
        />
      </div>
      <ItemAccountSupport
        name={dictionaries.information.gender.name}
        value={
          !userState.profile?.gender?.length
            ? "-"
            : globalDictionaries.personal_information.gender.options.items.find(
                (item) => item.id === userState.profile?.gender
              )?.name ?? "-"
        }
      />
      <ItemAccountSupport
        name={dictionaries.information.city.name}
        value={!userState.profile?.city.length ? "-" : userState.profile.city}
      />
      <ItemAccountSupport
        name={dictionaries.information.phonenumber.name}
        value={
          !userState.profile?.phonenumber.length
            ? "-"
            : userState.profile.phonenumber
        }
      />
      <ItemAccountSupport
        name={dictionaries.information.about_me.name}
        value={
          !userState.profile?.about_me.length ? "-" : userState.profile.about_me
        }
      />
    </div>
  );
};
