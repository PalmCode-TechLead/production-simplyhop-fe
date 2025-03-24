"use client";
import { Modal } from "@/core/components/modal";
import * as React from "react";
import clsx from "clsx";
import { ResultTripActionEnum, ResultTripContext } from "../../context";
import { getDictionaries } from "../../i18n";
import { useSearchParams, useRouter } from "next/navigation";
import { AppCollectionURL } from "@/core/utils/router/constants/app";
import SVGIcon, { SVGIconProps } from "@/core/icons";
import { Button } from "@/core/components/button";
import Link from "next/link";
import { CopyLinkItem } from "@/core/components/copy_link_item";

export const NotificationResultTrip = () => {
  const dictionaries = getDictionaries();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { state, dispatch } = React.useContext(ResultTripContext);
  const isOpen = state.notification.is_open;
  const handleClose = () => {
    dispatch({
      type: ResultTripActionEnum.SetNotificationData,
      payload: {
        ...state.notification,
        is_open: false,
      },
    });
    const params = new URLSearchParams(searchParams.toString()); // Ambil semua params
    params.delete("ride_id");
    router.push(
      `${AppCollectionURL.public.tripResult()}?${params.toString()}`,
      { scroll: false }
    );
  };
  return (
    <Modal
      className={clsx(
        "!max-w-[calc(100vw-3rem)] sm:!max-w-[524px]",
        "h-fit",
        "!rounded-[0.625rem]",
        "overflow-auto",
        "!px-[2rem] !py-[2rem]"
      )}
      open={isOpen}
      onClose={handleClose}
    >
      <div
        className={clsx(
          "grid grid-cols-1 items-start content-start justify-center justify-items-center gap-[2rem]",
          "w-full"
        )}
      >
        <div
          className={clsx(
            "grid grid-cols-1 items-start content-start justify-center justify-items-center",
            "w-full"
          )}
        >
          <div
            className={clsx(
              "flex items-center justify-center",
              "w-[120px] h-[120px]",
              "rounded-[50%]",
              "bg-[#EFF9EC]"
            )}
          >
            <SVGIcon
              name="Check"
              className={clsx("w-[5rem] h-[5rem]", "text-[#5AC53D]")}
            />
          </div>
        </div>

        <h1
          className={clsx("text-[1.5rem] text-[black] font-bold text-center")}
        >
          {dictionaries.notification.title}
        </h1>

        <Link
          className={clsx("w-full")}
          href={dictionaries.notification.cta.back.href}
        >
          <Button>{dictionaries.notification.cta.back.children}</Button>
        </Link>

        <div
          className={clsx(
            "grid grid-flow-col items-center content-center justify-center justify-items-center gap-[1rem]"
          )}
        >
          <span className={clsx("text-[#98989E] text-[0.875rem] font-normal")}>
            {dictionaries.notification.share.label}
          </span>
          <div
            className={clsx(
              "grid grid-flow-col items-center content-center justify-start justify-items-start gap-[1rem]"
            )}
          >
            {dictionaries.notification.share.items.map((item, itemIndex) => (
              <div
                key={itemIndex}
                className={clsx(
                  "flex items-center justify-center",
                  "w-[2rem] h-[2rem]",
                  "rounded-[50%]",
                  "bg-[white]"
                )}
              >
                <SVGIcon name={item.icon.name as SVGIconProps["name"]} />
              </div>
            ))}
          </div>
        </div>

        <CopyLinkItem
          link={dictionaries.notification.share.example_link}
          cta={{ ...dictionaries.notification.share.cta }}
        />
      </div>
    </Modal>
  );
};
