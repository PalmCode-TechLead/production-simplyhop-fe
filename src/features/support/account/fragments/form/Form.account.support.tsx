import * as React from "react";
import clsx from "clsx";
import { Textfield } from "@/core/components/textfield";
import { getDictionaries } from "../../i18n";
import { Textareafield } from "@/core/components/textareafield";

export const FormAccountSupport = () => {
  const dictionaries = getDictionaries();
  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
        "w-full",
        "px-[1.5rem] py-[1.5rem]",
        "relative",
        "border border-[#D3E7CE]",
        "rounded-[1.25rem]"
      )}
    >
      <h1 className={clsx("text-[#292929] text-[1.5rem] font-bold")}>
        {dictionaries.title}
      </h1>
      <Textfield
        labelProps={{ ...dictionaries.form.input.email.labelProps }}
        inputProps={{ ...dictionaries.form.input.email.inputProps }}
      />
      <div
        className={clsx(
          "grid grid-cols-2 place-content-start place-items-start gap-[1rem]",
          "w-full"
        )}
      >
        <Textfield
          labelProps={{ ...dictionaries.form.input.first_name.labelProps }}
          inputProps={{ ...dictionaries.form.input.first_name.inputProps }}
        />
        <Textfield
          labelProps={{ ...dictionaries.form.input.last_name.labelProps }}
          inputProps={{ ...dictionaries.form.input.last_name.inputProps }}
        />
      </div>
      <Textfield
        labelProps={{ ...dictionaries.form.input.city.labelProps }}
        inputProps={{ ...dictionaries.form.input.city.inputProps }}
      />
      <Textfield
        labelProps={{ ...dictionaries.form.input.phonenumber.labelProps }}
        inputProps={{ ...dictionaries.form.input.phonenumber.inputProps }}
      />
      <Textareafield
        labelProps={{ ...dictionaries.form.input.about_me.labelProps }}
        inputProps={{ ...dictionaries.form.input.about_me.inputProps }}
      />
    </div>
  );
};
