import * as React from "react";
import clsx from "clsx";
import { ListVehiclesSupport } from "../fragments/list";
import { Button } from "@/core/components/button";
import { getDictionaries } from "../i18n";
import Link from "next/link";
import { AppCollectionURL } from "@/core/utils/router/constants";

export const VehiclesSupportContainer = () => {
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
          <div className={clsx("flex items-center justify-end", "w-full")}>
            <Link href={AppCollectionURL.private.support_vehicle_create()}>
              <Button className={clsx("px-[1rem] py-[0.25rem]")}>
                {dictionaries.cta.create.children}
              </Button>
            </Link>
          </div>
          <ListVehiclesSupport />
        </div>
      </div>
    </div>
  );
};
