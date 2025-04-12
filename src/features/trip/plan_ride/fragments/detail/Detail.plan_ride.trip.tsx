"use client";
import { Modal } from "@/core/components/modal";
import * as React from "react";
import clsx from "clsx";
import { RideDetailCardPlanRideTrip } from "../../components/ride_detail_card";
import { getDictionaries } from "../../i18n";
import { TextareafieldNotes } from "@/core/components/textareafield_notes";
import { Card } from "@/core/components/card";
import { PriceInputPlanRideTrip } from "../../components/price_input";
import { Button } from "@/core/components/button";
import { PlanRideTripActionEnum, PlanRideTripContext } from "../../context";
import { Textfield } from "@/core/components/textfield";
import { DatePicker } from "@/core/components/datepicker";
import { Checkbox } from "@/core/components/checkbox";
import { InputContainer } from "@/core/components/input_container";

export const DetailPlanRideTrip = () => {
  const dictionaries = getDictionaries();
  const { state, dispatch } = React.useContext(PlanRideTripContext);
  const isOpen = state.detail.is_open;

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
              selected: date,
            },
          },
        },
      },
    });
  };

  const handleChangeTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: PlanRideTripActionEnum.SetDetailData,
      payload: {
        ...state.detail,
        form: {
          ...state.detail.form,
          plan: {
            ...state.detail.form.plan,
            time: {
              value: e.currentTarget.value,
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
              checked: !state.detail.form.plan.back_seat.checked,
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

  const handleClickSend = () => {
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
  return (
    <Modal
      className={clsx(
        "!max-w-[calc(100vw-3rem)] md:!max-w-[872px]",
        // "!h-fit",
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
        <h1 className={clsx("text-[1.5rem] text-[black] font-bold")}>
          {dictionaries.detail.title}
        </h1>
        <div
          className={clsx(
            "grid grid-cols-1 place-content-start place-items-start gap-[1rem]",
            "w-full",
            "max-h-[400px]",
            "overflow-auto"
          )}
        >
          <RideDetailCardPlanRideTrip />

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
              }}
              labelProps={{
                ...dictionaries.detail.notes.form.input.notes.labelProps,
              }}
            />

            <PriceInputPlanRideTrip />

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

        <Button onClick={handleClickSend}>
          {dictionaries.detail.cta.send.children}
        </Button>
      </div>
    </Modal>
  );
};
