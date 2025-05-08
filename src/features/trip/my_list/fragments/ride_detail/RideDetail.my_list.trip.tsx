"use client";
import * as React from "react";
import clsx from "clsx";
import { useTailwindBreakpoint } from "@/core/utils/ui/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import { AppCollectionURL } from "@/core/utils/router/constants";
import { AdaptiveModal } from "@/core/components/adaptive_modal";
import SVGIcon from "@/core/icons";
import { getDictionaries } from "../../i18n";
import { CarPriceItem } from "@/core/components/car_price_item";
import { RideBookingListItem } from "@/core/components/ride_booking_list_item";
import { MyListTripActionEnum, MyListTripContext } from "../../context";
import { useGetRidesId } from "../../react_query/hooks";
import { RideDetailCardMyListTrip } from "../../components/ride_detail_card";
import { AdaptiveModalContent } from "@/core/components/adaptive_modal_content";
import { AdaptiveModalHeader } from "@/core/components/adaptive_modal_header";

export const RideDetailMyListTrip = () => {
  const dictionaries = getDictionaries();
  const searchParams = useSearchParams();
  const rideId = searchParams.get("ride_id");
  const { isLg } = useTailwindBreakpoint();
  const router = useRouter();
  const { state, dispatch } = React.useContext(MyListTripContext);
  useGetRidesId();

  const filteredData = state.ride.detail;

  if (!filteredData) {
    return null;
  }

  const isOpen = !!rideId;

  const handleClose = () => {
    const params = new URLSearchParams(searchParams.toString()); // Ambil semua params
    params.delete("ride_id");
    router.push(AppCollectionURL.private.myList(params.toString()), {
      scroll: false,
    });
  };

  const handleClickDeleteRide = () => {
    dispatch({
      type: MyListTripActionEnum.SetDeleteRideNotificationData,
      payload: {
        ...state.delete_ride_notification,
        is_open: true,
      },
    });
  };

  return (
    <AdaptiveModal
      variant={isLg ? "modal" : "page_sheet"}
      className={clsx(
        "!max-w-[100vw] lg:!max-w-[584px]",
        "h-[100vh] lg:!h-full !max-h-[100vh] lg:!max-h-[60vh]",
        "!rounded-[0px] lg:!rounded-[0.625rem]",
        "overflow-hidden"
      )}
      open={isOpen}
      onClose={handleClose}
    >
      <div
        className={clsx(
          "grid grid-cols-1 items-start content-start justify-center justify-items-center",
          "w-full h-full"
        )}
      >
        {/* header */}
        <AdaptiveModalHeader>
          <div
            className={clsx(
              "grid grid-flow-col items-center content-center justify-start justify-items-start gap-[1rem]",
              "w-full"
            )}
          >
            <button
              className={clsx("cursor-pointer", "block lg:hidden")}
              onClick={handleClose}
            >
              <SVGIcon
                name="ArrowLeft"
                className={clsx("w-[1.5rem] h-[1.5rem]", "text-[#5B5B5B]")}
              />
            </button>
            <h2
              className={clsx(
                "text-[#292929] text-[1.125rem] lg:text-[1.5rem] font-bold"
              )}
            >
              {dictionaries.book_detail.title}
            </h2>
          </div>
        </AdaptiveModalHeader>

        {/* body */}
        <AdaptiveModalContent
          className={clsx("!bg-[#FAFDF9]", "!px-[0rem] !py-[1rem]")}
        >
          <div
            className={clsx(
              "grid grid-cols-1 place-content-start place-items-start gap-[1rem]",
              "w-full",
              "bg-[#FAFDF9]",
              "px-[1rem]"
            )}
          >
            <RideDetailCardMyListTrip {...filteredData} />
          </div>
          {/* Booking */}
          <div
            className={clsx(
              "grid grid-cols-1 place-content-start place-items-start",
              "w-full",
              "px-[1rem] py-[1rem]",
              "bg-[white]"
            )}
          >
            <p className={clsx("text-[1.125rem] text-[black] font-bold")}>
              {dictionaries.ride_detail.title}
            </p>
            {filteredData.booking.map((item, index) => (
              <RideBookingListItem key={index} {...item} />
            ))}
          </div>

          {/* Price */}
          <div
            className={clsx(
              "grid grid-cols-1 place-content-start place-items-start",
              "w-full",
              "px-[1rem] py-[1.5rem]",
              "bg-[white]"
            )}
          >
            <CarPriceItem {...filteredData.price?.initial} />
          </div>

          <button
            className={clsx(
              "grid grid-cols-1 place-content-center place-items-center",
              "w-full",
              "px-[1rem] py-[1.5rem]",
              "bg-[white]",
              "text-[#C50707] text-[0.75rem] font-medium",
              'cursor-pointer'
            )}
            onClick={handleClickDeleteRide}
          >
            {"Fahrt löschen"}
          </button>
        </AdaptiveModalContent>
      </div>
    </AdaptiveModal>
  );
};
