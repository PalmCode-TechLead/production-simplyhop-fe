"use client";
import { Modal } from "@/core/components/modal";
import * as React from "react";
import clsx from "clsx";
import { useSearchParams } from "next/navigation";
import { RideDetailCardResultTrip } from "../../components/ride_detail_card";
import { getDictionaries } from "../../i18n";

export const DetailResultTrip = () => {
  const dictionaries = getDictionaries();
  const searchParams = useSearchParams();
  const rideId = searchParams.get("ride_id");
  const isOpen = !!rideId;
  const handleClose = () => {
    //
  };
  return (
    <Modal
      className={clsx(
        "!max-w-[calc(100vw-3rem)] md:!max-w-[872px]",
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
          "grid grid-cols-1 place-content-start place-items-start gap-[1rem]",
          "w-full"
        )}
      >
        <h1 className={clsx("text-[1.5rem] text-[black] font-bold")}>
          {dictionaries.detail.title}
        </h1>
        <RideDetailCardResultTrip />
      </div>
    </Modal>
  );
};
