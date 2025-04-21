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
import { useGetRideId, usePostBookingBook } from "../../react_query/hooks";
import { MoonLoader } from "@/core/components/moon_loader";
import SVGIcon from "@/core/icons";
import { PassengerCardResultTrip } from "../../components/passenger_card";
import { RIDE_FILTER } from "@/core/enums";

export const DetailResultTrip = () => {
  const dictionaries = getDictionaries();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { state, dispatch } = React.useContext(ResultTripContext);
  const rideId = searchParams.get("ride_id");
  const adult = searchParams.get(RIDE_FILTER.ADULT_PASSENGER);
  const children = searchParams.get(RIDE_FILTER.CHILDREN_PASSENGER);

  const isOpen = state.detail.is_open;

  const { mutateAsync: postBookingBook, isPending: isPendingPostBookingBook } =
    usePostBookingBook();

  useGetRideId();

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

  if (!rideId) {
    return null;
  }

  const detailData = state.rides.data.find((item) => item.id === rideId);
  if (!detailData) {
    return null;
  }

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

  const handleChangePriceOffer = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: ResultTripActionEnum.SetDetailData,
      payload: {
        ...state.detail,
        form: {
          ...state.detail.form,
          price_offer: {
            ...state.detail.form.price_offer,
            value: !e.currentTarget.value.length
              ? 0
              : Number(e.currentTarget.value),
          },
        },
      },
    });
  };

  const handleChangeNotes = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({
      type: ResultTripActionEnum.SetDetailData,
      payload: {
        ...state.detail,
        form: {
          ...state.detail.form,
          notes: {
            ...state.detail.form.notes,
            value: e.currentTarget.value,
          },
        },
      },
    });
  };

  const handleClickSend = async () => {
    await postBookingBook();
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

  const isSubmitDisabled = isPendingPostBookingBook;

  return (
    <Modal
      className={clsx(
        "!max-w-[calc(100vw)] md:!max-w-[872px]",
        "h-fit max-h-[calc(100vh)]",
        "!rounded-[0.625rem]",
        "overflow-auto",
        "!px-[1rem] !py-[1rem] lg:!px-[2rem] lg:!py-[2rem]"
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
        <div
          className={clsx(
            "grid grid-flow-col items-center content-center justify-between justify-items-start gap-[1.5rem]",
            "w-full"
          )}
        >
          <h1 className={clsx("text-[1.5rem] text-[black] font-bold")}>
            {dictionaries.detail.title}
          </h1>

          <button className={clsx("block lg:hidden")} onClick={handleClose}>
            <SVGIcon
              name="X"
              className={clsx("w-[1.5rem] h-[1.5rem]", "text-[#767676]")}
            />
          </button>
        </div>

        <RideDetailCardResultTrip {...detailData} />

        <PassengerCardResultTrip
          label={dictionaries.detail.passenger.label}
          passenger={dictionaries.detail.passenger.maskedValue
            .replaceAll("{{adult}}", String(adult ?? "0"))
            .replaceAll("{{children}}", String(children ?? "0"))}
        />

        <PriceCardResultTrip
          label={dictionaries.detail.price.form.title}
          price={detailData.price?.initial?.price}
        />

        <PriceInputResultTrip
          inputProps={{
            type: "number",
            value:
              state.detail.form.price_offer.value === 0
                ? ""
                : state.detail.form.price_offer.value,
            onChange: handleChangePriceOffer,
          }}
        />

        <Card className={clsx("!px-[0rem] !py-[0rem]", "overflow-hidden")}>
          <TextareafieldNotes
            inputContainerProps={{
              className: clsx("!border-[0px]", "!rounded-[0px]"),
            }}
            inputProps={{
              ...dictionaries.detail.notes.form.input.notes.inputProps,
              onChange: handleChangeNotes,
            }}
            labelProps={{
              ...dictionaries.detail.notes.form.input.notes.labelProps,
            }}
          />
        </Card>

        <Button
          disabled={isSubmitDisabled}
          isLoading={isPendingPostBookingBook}
          onClick={handleClickSend}
        >
          {isPendingPostBookingBook && <MoonLoader size={20} color={"white"} />}

          {dictionaries.detail.cta.send.children}
        </Button>
      </div>
    </Modal>
  );
};
