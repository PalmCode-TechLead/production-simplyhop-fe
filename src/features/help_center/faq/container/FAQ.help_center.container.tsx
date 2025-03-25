"use client";
import * as React from "react";
import clsx from "clsx";
import { getDictionaries } from "../i18n";
import { HeaderHelpCenter } from "@/core/components/header_help_center";
import { AccordionFAQHelpCenter } from "../components/accordion";

export const FAQHelpCenterContainer = () => {
  const dictionaries = getDictionaries();
  return (
    <div
      className={clsx(
        "grid grid-cols-1 items-center content-center justify-start justify-items-start gap-[1.5rem]",
        "w-full"
      )}
    >
      <HeaderHelpCenter title={dictionaries.title} />
      <div
        className={clsx(
          "grid grid-cols-1 items-center content-center justify-start justify-items-start gap-[1rem]",
          "w-full"
        )}
      >
        {dictionaries.items.map((item, itemIndex) => (
          <AccordionFAQHelpCenter
            key={itemIndex}
            question={item.question}
            answer={item.answer}
          />
        ))}
      </div>
    </div>
  );
};
