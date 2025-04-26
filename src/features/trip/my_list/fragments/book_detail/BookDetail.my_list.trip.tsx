"use client";
import * as React from "react";
import clsx from "clsx";
import { useTailwindBreakpoint } from "@/core/utils/ui/hooks";
import { AdaptiveModal } from "@/core/components/adaptive_modal";
import { useRouter, useSearchParams } from "next/navigation";
import { AppCollectionURL } from "@/core/utils/router/constants";
import { getDictionaries } from "../../i18n";
import SVGIcon from "@/core/icons";
import { BookDetailCardMyListTrip } from "../../components/book_detail_card";
import { CarPriceItem } from "@/core/components/car_price_item";
import { MyListTripContext } from "../../context";

export const BookDetailMyListTrip = () => {
  const dictionaries = getDictionaries();
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("booking_id");
  const { isLg } = useTailwindBreakpoint();
  const router = useRouter();
  const { state } = React.useContext(MyListTripContext);

  const filteredData = state.book.data.find((item) => item.id === bookingId);

  if (!filteredData) {
    return null;
  }

  const isOpen = !!bookingId;

  const handleClose = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("booking_id");
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
          "w-full",
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
            <BookDetailCardMyListTrip {...filteredData} />
          </div>

          <div
            className={clsx(
              "grid grid-cols-1 place-content-start place-items-start",
              "w-full",
              "px-[1rem] py-[1.5rem]",
              "bg-[white]"
            )}
          >
            <CarPriceItem {...filteredData.detail.price} />
          </div>
        </div>
      </div>
    </AdaptiveModal>
  );
};
