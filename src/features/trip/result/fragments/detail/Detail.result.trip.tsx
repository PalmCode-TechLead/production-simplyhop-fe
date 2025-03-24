"use client";
import { Modal } from "@/core/components/modal";
import * as React from "react";
import clsx from "clsx";
import { useRouter, useSearchParams } from "next/navigation";
import { RideDetailCardResultTrip } from "../../components/ride_detail_card";
import { getDictionaries } from "../../i18n";
import { PriceCardResultTrip } from "../../components/price_card";
import { TextareafieldNotes } from "@/core/components/textareafield_notes";
import { Card } from "@/core/components/card";
import { PriceInputResultTrip } from "../../components/price_input";
import { Button } from "@/core/components/button";
import { AppCollectionURL } from "@/core/utils/router/constants/app";
import { ResultTripActionEnum, ResultTripContext } from "../../context";

export const DetailResultTrip = () => {
  const dictionaries = getDictionaries();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { state, dispatch } = React.useContext(ResultTripContext);
  const rideId = searchParams.get("ride_id");
  const isOpen = state.detail.is_open;

  React.useEffect(() => {
    if (rideId) {
      dispatch({
        type: ResultTripActionEnum.SetDetailData,
        payload: {
          ...state.detail,
          is_open: true,
        },
      });
    }
  }, [rideId]);

  const handleClose = () => {
    dispatch({
      type: ResultTripActionEnum.SetDetailData,
      payload: {
        ...state.detail,
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

  const handleClickSend = () => {
    dispatch({
      type: ResultTripActionEnum.SetDetailData,
      payload: {
        ...state.detail,
        is_open: false,
      },
    });
    dispatch({
      type: ResultTripActionEnum.SetNotificationData,
      payload: {
        ...state.notification,
        is_open: true,
      },
    });
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

        <PriceCardResultTrip
          label={dictionaries.detail.price.form.title}
          price={"€125.00"}
        />

        <PriceInputResultTrip />

        <Card className={clsx("!px-[0rem] !py-[0rem]", "overflow-hidden")}>
          <TextareafieldNotes
            inputContainerProps={{
              className: clsx("!border-[0px]", "!rounded-[0px]"),
            }}
            inputProps={{
              ...dictionaries.detail.notes.form.input.notes.inputProps,
            }}
            labelProps={{
              ...dictionaries.detail.notes.form.input.notes.labelProps,
            }}
          />
        </Card>

        <Button onClick={handleClickSend}>
          {dictionaries.detail.cta.send.children}
        </Button>
      </div>
    </Modal>
  );
};
