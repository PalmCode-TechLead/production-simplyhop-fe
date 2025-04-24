import * as React from "react";
import clsx from "clsx";
import { getDictionaries } from "../../i18n";
import { UploadInput } from "@/core/components/upload_input";
import {
  AccountUpdateSupportActionEnum,
  AccountUpdateSupportContext,
} from "../../context";
import { UploadImagePreview } from "@/core/components/upload_image_preview/UploadImagePreview";
import { SquareUploadInput } from "@/core/components/square_upload_input";

export const PictureFormAccountUpdateSupport = () => {
  const dictionaries = getDictionaries();
  const { state, dispatch } = React.useContext(AccountUpdateSupportContext);
  const handleChangeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: AccountUpdateSupportActionEnum.SetFormData,
      payload: {
        ...state.form,
        pictures: {
          ...state.form.pictures,
          files: !e.currentTarget.files
            ? []
            : !e.currentTarget.files.length
            ? []
            : Array.from(e.currentTarget.files).map((item) => item),
        },
      },
    });
  };

  const handleDropUpload = (e: React.DragEvent<HTMLDivElement>) => {
    dispatch({
      type: AccountUpdateSupportActionEnum.SetFormData,
      payload: {
        ...state.form,
        pictures: {
          ...state.form.pictures,
          files: !e.dataTransfer.files
            ? []
            : !e.dataTransfer.files.length
            ? []
            : Array.from(e.dataTransfer.files).map((item) => item),
        },
      },
    });
  };

  const handleChangeAddUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = !e.currentTarget.files
      ? []
      : !e.currentTarget.files.length
      ? []
      : Array.from(e.currentTarget.files).map((item) => item);
    dispatch({
      type: AccountUpdateSupportActionEnum.SetFormData,
      payload: {
        ...state.form,
        pictures: {
          ...state.form.pictures,
          files: [...state.form.pictures.files, ...newFiles],
        },
      },
    });
  };

  const handleDeletePicture = (dataIndex: number) => {
    dispatch({
      type: AccountUpdateSupportActionEnum.SetFormData,
      payload: {
        ...state.form,
        pictures: {
          ...state.form.pictures,
          files: state.form.pictures.files.filter(
            (_, index) => index !== dataIndex
          ),
        },
      },
    });
  };
  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-[0.75rem]",
        "w-full"
      )}
    >
      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start gap-[0.25rem]",
          "w-full"
        )}
      >
        <p className={clsx("text-[0.875rem] text-[#232323CC] font-medium")}>
          {dictionaries.form.input.pictures.title}
        </p>
        <p className={clsx("text-[0.75rem] text-[#606060] font-normal")}>
          {dictionaries.form.input.pictures.description}
        </p>
      </div>

      {/* form */}
      {!state.form.pictures.files.length ? (
        <UploadInput
          message={dictionaries.form.input.pictures.form.message}
          description={dictionaries.form.input.pictures.form.description}
          onChange={handleChangeUpload}
          onDrop={handleDropUpload}
        />
      ) : (
        <div
          className={clsx(
            "flex items-start justify-start gap-[0.75rem] flex-wrap",
            "w-full"
          )}
        >
          {state.form.pictures.files.map((item, itemIndex) => (
            <UploadImagePreview
              key={itemIndex}
              id={String(itemIndex)}
              blob={item}
              onDelete={() => handleDeletePicture(itemIndex)}
            />
          ))}
          <SquareUploadInput
            label={dictionaries.form.input.pictures.square_input.form.label}
            onChange={handleChangeAddUpload}
          />
        </div>
      )}
    </div>
  );
};
