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
import { MyListTripContext } from "../../context";
import { useGetRidesId } from "../../react_query/hooks";
import { RideDetailCardMyListTrip } from "../../components/ride_detail_card";

export const RideDetailMyListTrip = () => {
  const dictionaries = getDictionaries();
  const searchParams = useSearchParams();
  const rideId = searchParams.get("ride_id");
  const { isLg } = useTailwindBreakpoint();
  const router = useRouter();
  const { state } = React.useContext(MyListTripContext);
  useGetRidesId();

  const filteredData = state.ride.data.find((item) => item.id === rideId);

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

  return (
    <AdaptiveModal
      variant={isLg ? "modal" : "page_sheet"}
      className={clsx(
        "!max-w-[524px]",
        "h-fit",
        "!rounded-[0.625rem]",
        "overflow-auto",
        "!px-[0rem] !py-[0rem]"
      )}
      open={isOpen}
      onClose={handleClose}
    >
      <div
        className={clsx(
          "grid grid-cols-1 items-start content-start justify-center justify-items-center gap-[2rem]",
          "w-full h-[100vh]",
          "overflow-auto",
          "px-[0rem] py-[0rem] lg:px-[2rem] lg:py-[2rem]"
        )}
      >
        {/* header */}
        <div
          className={clsx(
            "grid grid-flow-col items-center content-center justify-between justify-items-start",
            "w-full",
            "bg-[white]",
            "px-[1rem] py-[1rem] lg:px-[0rem] lg:py-[0rem]"
          )}
        >
          <div
            className={clsx(
              "grid grid-flow-col items-center content-center justify-start justify-items-start gap-[1rem]",
              "w-full"
            )}
          >
            <button className={clsx("cursor-pointer")} onClick={handleClose}>
              <SVGIcon
                name="ArrowLeft"
                className={clsx("w-[1.5rem] h-[1.5rem]", "text-[#767676]")}
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
        </div>

        {/* body */}
        <div
          className={clsx(
            "grid grid-cols-1 place-content-start place-items-start gap-[1rem]",
            "w-full",
            "bg-[#FAFDF9]",
            "py-[1rem]"
          )}
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
            {/* {filteredData.detail.booking.map((item, index) => (
              <RideBookingListItem key={index} {...item} />
            ))} */}
          </div>

          {/* Price */}
          {/* <div
            className={clsx(
              "grid grid-cols-1 place-content-start place-items-start",
              "w-full",
              "px-[1rem] py-[1.5rem]",
              "bg-[white]"
            )}
          >
            <CarPriceItem {...filteredData.detail.price} />
          </div> */}
        </div>
      </div>
    </AdaptiveModal>
  );
};
