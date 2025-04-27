"use client";
import * as React from "react";
import clsx from "clsx";
import { useRouter, useSearchParams } from "next/navigation";
import { RideDetailCardChatTrip } from "../../components/ride_detail_card";
import { getDictionaries } from "../../i18n";
import { PriceCardChatTrip } from "../../components/price_card";
import { TextareafieldNotes } from "@/core/components/textareafield_notes";
import { Card } from "@/core/components/card";
import { PriceInputChatTrip } from "../../components/price_input";
import { Button } from "@/core/components/button";
import { AppCollectionURL } from "@/core/utils/router/constants/app";
import { ChatTripActionEnum, ChatTripContext } from "../../context";
import { MoonLoader } from "@/core/components/moon_loader";
import SVGIcon from "@/core/icons";
import { PassengerCardChatTrip } from "../../components/passenger_card";
import { RIDE_FILTER } from "@/core/enums";
import { UserContext } from "@/core/modules/app/context";
import { AdaptiveModal } from "@/core/components/adaptive_modal";
import { useTailwindBreakpoint } from "@/core/utils/ui/hooks";
import { usePostBookingOffer } from "../../react_query/hooks";
import { GetMessageRoomsIdPayloadRequestInterface } from "@/core/models/rest/simplyhop/message_rooms";
import { queryClient } from "@/core/utils/react_query";
import { ChatTripReactQueryKey } from "../../react_query/keys";

export const OfferChatTrip = () => {
  const { state: userState } = React.useContext(UserContext);
  const dictionaries = getDictionaries();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { state, dispatch } = React.useContext(ChatTripContext);
  const id = searchParams.get("id");
  const messageRoomId = !id ? "0" : String(id);

  const { isLg } = useTailwindBreakpoint();

  const isOpen = state.offer.is_open;

  const {
    mutateAsync: postBookingOffer,
    isPending: isPendingPostBookingOffer,
  } = usePostBookingOffer();

  const detailData = state.offer.ride;
  const priceData = state.offer.price;
  const passengerData = state.offer.passenger;

  const messageRoomByIdPayload: GetMessageRoomsIdPayloadRequestInterface = {
    path: {
      id: messageRoomId,
    },
    params: {
      include:
        "messages,passenger,driver,driverExists,passengerExists,messagesExists,booking",
    },
  };

  if (!detailData || !priceData || !passengerData) {
    return null;
  }

  const handleClose = () => {
    dispatch({
      type: ChatTripActionEnum.SetOfferData,
      payload: {
        ...state.offer,
        is_open: false,
      },
    });
  };

  const handleChangePriceOffer = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: ChatTripActionEnum.SetOfferData,
      payload: {
        ...state.offer,
        form: {
          ...state.offer.form,
          price_offer: {
            ...state.offer.form.price_offer,
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
      type: ChatTripActionEnum.SetOfferData,
      payload: {
        ...state.offer,
        form: {
          ...state.offer.form,
          notes: {
            ...state.offer.form.notes,
            value: e.currentTarget.value,
          },
        },
      },
    });
  };

  const handleClickSend = async () => {
    await postBookingOffer();

    queryClient.invalidateQueries({
      queryKey: ChatTripReactQueryKey.GetMessageRoomsId(messageRoomByIdPayload),
      type: "all",
      refetchType: "all",
    });
    dispatch({
      type: ChatTripActionEnum.SetOfferData,
      payload: {
        ...state.offer,
        is_open: false,
      },
    });
    // dispatch({
    //   type: ChatTripActionEnum.SetNotificationData,
    //   payload: {
    //     ...state.notification,
    //     is_open: true,
    //   },
    // });
  };

  const isSubmitDisabled = isPendingPostBookingOffer;

  const isRideByDriver =
    String(userState.profile.id) === detailData.driver?.profile.id;

  return (
    <AdaptiveModal
      className={clsx(
        "!max-w-[calc(100vw)] md:!max-w-[872px]",
        "h-fit max-h-[calc(100vh)]",
        "!rounded-[0px] lg:!rounded-[0.625rem]",
        "overflow-auto",
        "!px-[0rem] !py-[0rem]"
      )}
      variant={isLg ? "modal" : "page_sheet"}
      open={isOpen}
      onClose={handleClose}
    >
      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start gap-[1rem]",
          "w-full",
          "!px-[1rem] !py-[1rem] lg:!px-[2rem] lg:!py-[2rem]"
        )}
      >
        <div
          className={clsx(
            "grid grid-flow-col items-center content-center justify-start justify-items-start gap-[0.5rem]",
            "w-full"
          )}
        >
          <button
            className={clsx("block lg:hidden", "cursor-pointer")}
            onClick={handleClose}
          >
            <SVGIcon
              name="X"
              className={clsx("w-[1.5rem] h-[1.5rem]", "text-[#767676]")}
            />
          </button>

          <h1 className={clsx("text-[1.5rem] text-[black] font-bold")}>
            {dictionaries.offer.title}
          </h1>
        </div>

        <RideDetailCardChatTrip {...detailData} />

        <PassengerCardChatTrip
          label={dictionaries.offer.passenger.label}
          passenger={dictionaries.offer.passenger.maskedValue
            .replaceAll("{{adult}}", String(passengerData.adult ?? "0"))
            .replaceAll("{{children}}", String(passengerData.children ?? "0"))}
        />

        <PriceCardChatTrip
          label={dictionaries.offer.price.form.title}
          // price={detailData.price?.initial?.price}
          price={priceData.price}
        />

        {!isRideByDriver && (
          <PriceInputChatTrip
            inputProps={{
              type: "number",
              value:
                state.offer.form.price_offer.value === 0
                  ? ""
                  : state.offer.form.price_offer.value,
              onChange: handleChangePriceOffer,
            }}
          />
        )}

        {!isRideByDriver && (
          <Card className={clsx("!px-[0rem] !py-[0rem]", "overflow-hidden")}>
            <TextareafieldNotes
              inputContainerProps={{
                className: clsx("!border-[0px]", "!rounded-[0px]"),
              }}
              inputProps={{
                ...dictionaries.offer.notes.form.input.notes.inputProps,
                value: state.offer.form.notes.value,
                onChange: handleChangeNotes,
              }}
              labelProps={{
                ...dictionaries.offer.notes.form.input.notes.labelProps,
              }}
            />
          </Card>
        )}

        {!isRideByDriver && (
          <Button
            disabled={isSubmitDisabled}
            isLoading={isPendingPostBookingOffer}
            onClick={handleClickSend}
          >
            {isPendingPostBookingOffer && (
              <MoonLoader size={20} color={"white"} />
            )}

            {dictionaries.offer.cta.send.children}
          </Button>
        )}
      </div>
    </AdaptiveModal>
  );
};
