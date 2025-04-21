"use client";
import { Modal } from "@/core/components/modal";
import * as React from "react";
import clsx from "clsx";
import { RideDetailCardPlanRideTrip } from "../../components/ride_detail_card";
import { getDictionaries } from "../../i18n";
import { getDictionaries as getGlobalDictionaries } from "@/core/modules/app/i18n";
import { TextareafieldNotes } from "@/core/components/textareafield_notes";
import { Card } from "@/core/components/card";
import { PriceInputPlanRideTrip } from "../../components/price_input";
import { Button } from "@/core/components/button";
import { PlanRideTripActionEnum, PlanRideTripContext } from "../../context";
import { Textfield } from "@/core/components/textfield";
import { DatePicker } from "@/core/components/datepicker";
import { Checkbox } from "@/core/components/checkbox";
import { InputContainer } from "@/core/components/input_container";
import {
  usePostRidesFirst,
  usePutRidesSecond,
  usePutRidesThird,
} from "../../react_query/hooks";
import { MoonLoader } from "@/core/components/moon_loader";
import SVGIcon from "@/core/icons";

import { setArrivalTime, setDurationTime } from "@/core/utils/time/functions";
import { Dropdownfield } from "@/core/components/dropdownfield";

export const DetailPlanRideTrip = () => {
  const dictionaries = getDictionaries();
  const globalDictionaries = getGlobalDictionaries();
  const { state, dispatch } = React.useContext(PlanRideTripContext);
  const isOpen = state.detail.is_open;

  const { mutateAsync: postRidesFirst, isPending: isPendingRidesFirst } =
    usePostRidesFirst();
  const { mutateAsync: postRidesSecond, isPending: isPendingRidesSecond } =
    usePutRidesSecond();
  const { mutateAsync: postRidesThird, isPending: isPendingRidesThird } =
    usePutRidesThird();

  const filteredCar = state.filters.auto.data.find(
    (item) => item?.id === state.filters.auto.selected?.id
  );
  if (!filteredCar) {
    return null;
  }

  const handleClose = () => {
    dispatch({
      type: PlanRideTripActionEnum.SetDetailData,
      payload: {
        ...state.detail,
        is_open: false,
      },
    });
  };

  const handleSelectDate = (date: Date) => {
    dispatch({
      type: PlanRideTripActionEnum.SetDetailData,
      payload: {
        ...state.detail,
        form: {
          ...state.detail.form,
          plan: {
            ...state.detail.form.plan,
            date: {
              ...state.detail.form.plan.date,
              selected: date,
            },
          },
        },
      },
    });
  };

  const handleChangeTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: PlanRideTripActionEnum.SetFiltersData,
      payload: {
        ...state.filters,
        time: {
          ...state.filters.time,
          value: e.currentTarget.value,
        },
      },
    });
    dispatch({
      type: PlanRideTripActionEnum.SetDetailData,
      payload: {
        ...state.detail,
        form: {
          ...state.detail.form,
          plan: {
            ...state.detail.form.plan,
            time: {
              ...state.detail.form.plan.time,
              value: e.currentTarget.value,
            },
          },
        },
      },
    });
  };

  const handleSelectRecurring = (data: { id: string; name: string }) => {
    dispatch({
      type: PlanRideTripActionEnum.SetDetailData,
      payload: {
        ...state.detail,
        form: {
          ...state.detail.form,
          plan: {
            ...state.detail.form.plan,
            recurring: {
              ...state.detail.form.plan.recurring,
              selected: data,
            },
          },
        },
      },
    });
  };

  const handleChangeUmweg = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: PlanRideTripActionEnum.SetDetailData,
      payload: {
        ...state.detail,
        form: {
          ...state.detail.form,
          plan: {
            ...state.detail.form.plan,
            umweg: {
              ...state.detail.form.plan.umweg,
              value: e.currentTarget.value,
            },
          },
        },
      },
    });
  };

  const handleChangeSeat = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: PlanRideTripActionEnum.SetDetailData,
      payload: {
        ...state.detail,
        form: {
          ...state.detail.form,
          plan: {
            ...state.detail.form.plan,
            seat: {
              ...state.detail.form.plan.seat,
              value: e.currentTarget.value,
            },
          },
        },
      },
    });
  };

  const handleCheckBackSeat = () => {
    dispatch({
      type: PlanRideTripActionEnum.SetDetailData,
      payload: {
        ...state.detail,
        form: {
          ...state.detail.form,
          plan: {
            ...state.detail.form.plan,
            back_seat: {
              ...state.detail.form.plan.back_seat,
              checked: !state.detail.form.plan.back_seat.checked,
            },
          },
        },
      },
    });
  };

  const handleChangePriceOffer = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: PlanRideTripActionEnum.SetDetailData,
      payload: {
        ...state.detail,
        form: {
          ...state.detail.form,
          other: {
            ...state.detail.form.other,
            price: {
              ...state.detail.form.other.price,
              value: !e.currentTarget.value.length
                ? 0
                : Number(e.currentTarget.value),
            },
          },
        },
      },
    });
  };

  const handleChangeNotes = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({
      type: PlanRideTripActionEnum.SetDetailData,
      payload: {
        ...state.detail,
        form: {
          ...state.detail.form,
          other: {
            ...state.detail.form.other,
            notes: {
              ...state.detail.form.other.notes,
              value: e.currentTarget.value,
            },
          },
        },
      },
    });
  };

  const handleCheckTNC = () => {
    dispatch({
      type: PlanRideTripActionEnum.SetDetailData,
      payload: {
        ...state.detail,
        form: {
          ...state.detail.form,
          tnc: {
            ...state.detail.form.tnc,
            checked: !state.detail.form.tnc.checked,
          },
        },
      },
    });
  };

  const handleClickSend = async () => {
    const ridesFirst = await postRidesFirst();
    if (!ridesFirst) return;
    const ridesSecond = await postRidesSecond({ id: ridesFirst.data.ride.id });
    if (!ridesSecond) return;
    const ridesThird = await postRidesThird({ id: ridesFirst.data.ride.id });
    if (!ridesThird) return;

    dispatch({
      type: PlanRideTripActionEnum.SetDetailData,
      payload: {
        ...state.detail,
        is_open: false,
      },
    });
    dispatch({
      type: PlanRideTripActionEnum.SetNotificationData,
      payload: {
        ...state.notification,
        is_open: true,
      },
    });
  };

  const isSubmitDisabled =
    isPendingRidesFirst || isPendingRidesSecond || isPendingRidesThird;
  const isSubmitLoading =
    isPendingRidesFirst || isPendingRidesSecond || isPendingRidesThird;

  return (
    <Modal
      className={clsx(
        "!max-w-[calc(100vw)] md:!max-w-[872px]",
        "h-[100vh] lg:!h-fit",
        "!rounded-[0px] lg:!rounded-[0.625rem]",
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
            "grid grid-flow-col items-center content-center justify-start justify-items-start gap-[0.5rem]",
            "w-full"
          )}
        >
          <button className={clsx("block lg:hidden")} onClick={handleClose}>
            <SVGIcon
              name="X"
              className={clsx("w-[1.5rem] h-[1.5rem]", "text-[#767676]")}
            />
          </button>
          <h1 className={clsx("text-[1.5rem] text-[black] font-bold")}>
            {dictionaries.detail.title}
          </h1>
        </div>
        <div
          className={clsx(
            "grid grid-cols-1 place-content-start place-items-start gap-[1rem]",
            "w-full",
            "lg:max-h-[400px]",
            "overflow-auto"
          )}
        >
          <RideDetailCardPlanRideTrip
            driver={{
              profile: {
                avatar: {
                  image: undefined,
                },
                name: "Kelly",
              },
            }}
            car={{ ...filteredCar }}
            routes={{
              departure: {
                place: state.filters.origin.selected.item?.name ?? "",
                time: `${state.filters.time.value.replace(":", ".")} Uhr`,
              },
              travelTime: {
                time: setDurationTime(
                  state.detail.distance_matrix?.duration.value ?? 0
                ),
              },
              arrival: {
                place: state.filters.destination.selected.item?.name ?? "",
                time: setArrivalTime(
                  state.filters.time.value,
                  state.detail.distance_matrix?.duration.value ?? 0
                ),
              },
            }}
          />

          <Card
            className={clsx(
              "!px-[0rem] !py-[0rem] lg:!pl-[1.5rem] lg:!py-[1.5rem]",
              "overflow-hidden",
              "!border-[0px]"
            )}
            style={{
              boxShadow: undefined,
              filter: undefined,
            }}
          >
            <p className={clsx("text-[1.5rem] text-[black] font-bold")}>
              {dictionaries.detail.plan.form.title}
            </p>
            <div
              className={clsx(
                "grid grid-cols-1 lg:grid-cols-2 place-content-start place-items-start gap-[1rem]",
                "w-full"
              )}
            >
              <DatePicker
                inputContainerProps={{
                  className: "!border !border-[#F8F8F8]",
                }}
                labelProps={{
                  ...dictionaries.detail.plan.form.input.date.labelProps,
                }}
                value={state.detail.form.plan.date.selected}
                onSelect={handleSelectDate}
              />
              <Textfield
                inputContainerProps={{
                  className: "!border !border-[#F8F8F8]",
                }}
                labelProps={{
                  ...dictionaries.detail.plan.form.input.time.labelProps,
                }}
                inputProps={{
                  ...dictionaries.detail.plan.form.input.time.inputProps,
                  type: "time",
                  value: state.detail.form.plan.time.value,
                  onChange: handleChangeTime,
                }}
              />
            </div>
            <div
              className={clsx(
                "grid grid-cols-1 lg:grid-cols-2 place-content-start place-items-start gap-[1rem]",
                "w-full"
              )}
            >
              <Dropdownfield
                labelProps={{
                  ...dictionaries.detail.plan.form.input.recurring.labelProps,
                }}
                inputProps={{
                  ...dictionaries.detail.plan.form.input.recurring.inputProps,
                  className: "!border !border-[#F8F8F8]",
                }}
                selected={state.detail.form.plan.recurring.selected}
                items={globalDictionaries.trip.recurring.items}
                onSelect={handleSelectRecurring}
              />
              <Textfield
                inputContainerProps={{
                  className: "!border !border-[#F8F8F8]",
                }}
                labelProps={{
                  ...dictionaries.detail.plan.form.input.umweg.labelProps,
                }}
                inputProps={{
                  ...dictionaries.detail.plan.form.input.umweg.inputProps,
                  value: state.detail.form.plan.umweg.value,
                  onChange: handleChangeUmweg,
                }}
              />
            </div>
            <div
              className={clsx(
                "grid grid-cols-1 lg:grid-cols-2 place-content-start place-items-start gap-[1rem]",
                "w-full"
              )}
            >
              <Textfield
                inputContainerProps={{
                  className: "!border !border-[#F8F8F8]",
                }}
                labelProps={{
                  ...dictionaries.detail.plan.form.input.seat.labelProps,
                }}
                inputProps={{
                  ...dictionaries.detail.plan.form.input.seat.inputProps,
                  value: state.detail.form.plan.seat.value,
                  onChange: handleChangeSeat,
                }}
              />
              <InputContainer
                className={clsx(
                  "!border !border-[#F8F8F8]",
                  "!grid !grid-flow-col !items-center !content-center !gap-[0.5rem]"
                )}
              >
                <Checkbox
                  label={dictionaries.detail.plan.form.input.back_seat.label}
                  checked={state.detail.form.plan.back_seat.checked}
                  onChange={handleCheckBackSeat}
                />
              </InputContainer>
            </div>

            <p className={clsx("text-[1.5rem] text-[black] font-bold")}>
              {dictionaries.detail.notes.form.title}
            </p>
            <TextareafieldNotes
              inputContainerProps={{
                className: "!border !border-[#F8F8F8]",
              }}
              inputProps={{
                ...dictionaries.detail.notes.form.input.notes.inputProps,
                value: state.detail.form.other.notes.value,
                onChange: handleChangeNotes,
              }}
              labelProps={{
                ...dictionaries.detail.notes.form.input.notes.labelProps,
              }}
            />

            <PriceInputPlanRideTrip
              inputProps={{
                type: "number",
                value:
                  state.detail.form.other.price.value === 0
                    ? ""
                    : state.detail.form.other.price.value,
                onChange: handleChangePriceOffer,
              }}
            />

            <div
              className={clsx(
                "grid grid-flow-col items-start content-start justify-start justify-items-start gap-[1rem]",
                "w-full"
              )}
            >
              <Checkbox
                checked={state.detail.form.tnc.checked}
                onChange={handleCheckTNC}
              />
              <span
                className={clsx("text-[#232323] text-[0.875rem] font-normal")}
                dangerouslySetInnerHTML={{
                  __html: dictionaries.detail.tnc.label,
                }}
              />
            </div>
          </Card>
        </div>

        <Button
          disabled={isSubmitDisabled}
          isLoading={isSubmitLoading}
          onClick={handleClickSend}
        >
          {isSubmitLoading && <MoonLoader size={20} color={"white"} />}
          {dictionaries.detail.cta.send.children}
        </Button>
      </div>
    </Modal>
  );
};
