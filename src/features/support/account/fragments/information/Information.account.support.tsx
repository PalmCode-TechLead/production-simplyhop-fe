"use client";
import * as React from "react";
import clsx from "clsx";
import { getDictionaries } from "../../i18n";
import { ItemAccountSupport } from "../../components/item";
import { Button } from "@/core/components/button";
import Link from "next/link";
import { AppCollectionURL } from "@/core/utils/router/constants/app";
import { UserContext } from "@/core/modules/app/context";

export const InformationAccountSupport = () => {
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
        <h1 className={clsx("text-[#292929] text-[1.5rem] font-bold")}>
          {dictionaries.title}
        </h1>
        <Link href={AppCollectionURL.private.support_account_edit()}>
          <Button
            variant="secondary"
            className={clsx("!px-[2.5rem] !py-[0.5rem]")}
          >
            {dictionaries.information.cta.edit.children}
          </Button>
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
