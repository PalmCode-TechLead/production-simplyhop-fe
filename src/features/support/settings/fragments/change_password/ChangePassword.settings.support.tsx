"use client";
import { Modal } from "@/core/components/modal";
import * as React from "react";
import clsx from "clsx";
import {
  SettingsSupportActionEnum,
  SettingsSupportContext,
} from "../../context";
import { getDictionaries } from "../../i18n";
import SVGIcon from "@/core/icons";
import { Button } from "@/core/components/button";
import { Passwordfield } from "@/core/components/passwordfield";
import { Checkbox } from "@/core/components/checkbox";

export const ChangePasswordSettingsSupport = () => {
  const dictionaries = getDictionaries();
  const { state, dispatch } = React.useContext(SettingsSupportContext);
  const isOpen = state.change_password.is_open;
  const handleClose = () => {
    dispatch({
      type: SettingsSupportActionEnum.SetChangePasswordData,
      payload: {
        ...state.change_password,
        is_open: false,
      },
    });
  };

  const handleChangeActualPassword = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch({
      type: SettingsSupportActionEnum.SetChangePasswordData,
      payload: {
        ...state.change_password,
        form: {
          ...state.change_password.form,
          actual_password: {
            ...state.change_password.form.actual_password,
            value: e.currentTarget.value,
          },
        },
      },
    });
  };

  const handleChangeNewPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: SettingsSupportActionEnum.SetChangePasswordData,
      payload: {
        ...state.change_password,
        form: {
          ...state.change_password.form,
          new_password: {
            ...state.change_password.form.new_password,
            value: e.currentTarget.value,
          },
        },
      },
    });
  };

  const handleChangeConfirmNewPassword = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch({
      type: SettingsSupportActionEnum.SetChangePasswordData,
      payload: {
        ...state.change_password,
        form: {
          ...state.change_password.form,
          confirm_new_password: {
            ...state.change_password.form.confirm_new_password,
            value: e.currentTarget.value,
          },
        },
      },
    });
  };

  const handleChangeTNC = () => {
    dispatch({
      type: SettingsSupportActionEnum.SetChangePasswordData,
      payload: {
        ...state.change_password,
        form: {
          ...state.change_password.form,
          tnc: {
            ...state.change_password.form.tnc,
            checked: !state.change_password.form.tnc.checked,
          },
        },
      },
    });
  };

  const handleClickChangePassword = () => {
    dispatch({
      type: SettingsSupportActionEnum.SetChangePasswordData,
      payload: {
        ...state.change_password,
        is_open: false,
      },
    });
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
        <h1
          className={clsx("text-[1.5rem] text-[black] font-bold text-center")}
        >
          {dictionaries.change_password.title}
        </h1>

        <div
          className={clsx(
            "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
            "w-full"
          )}
        >
          <Passwordfield
            labelProps={{
              ...dictionaries.change_password.form.actual_password.password
                .labelProps,
            }}
            inputProps={{
              ...dictionaries.change_password.form.actual_password.password
                .inputProps,
              value: state.change_password.form.actual_password.value,
              onChange: handleChangeActualPassword,
            }}
          />
          <Passwordfield
            labelProps={{
              ...dictionaries.change_password.form.new_password.password
                .labelProps,
            }}
            inputProps={{
              ...dictionaries.change_password.form.new_password.password
                .inputProps,
              value: state.change_password.form.new_password.value,
              onChange: handleChangeNewPassword,
            }}
          />
          <Passwordfield
            labelProps={{
              ...dictionaries.change_password.form.confirm_new_password.password
                .labelProps,
            }}
            inputProps={{
              ...dictionaries.change_password.form.confirm_new_password.password
                .inputProps,
              value: state.change_password.form.confirm_new_password.value,
              onChange: handleChangeConfirmNewPassword,
            }}
          />
          <div
            className={clsx(
              "grid grid-flow-col items-center content-center justify-start justify-items-start gap-[1rem]",
              "w-full"
            )}
          >
            <Checkbox
              checked={state.change_password.form.tnc.checked}
              onChange={handleChangeTNC}
            />
            <span
              className={clsx("text-[#232323] text-[0.75rem] font-light")}
              dangerouslySetInnerHTML={{
                __html: dictionaries.change_password.tnc.label,
              }}
            />
          </div>
        </div>

        <Button
          className={clsx("py-[1rem]")}
          onClick={handleClickChangePassword}
        >
          {dictionaries.change_password.cta.change_password.children}
        </Button>
      </div>
    </Modal>
  );
};
