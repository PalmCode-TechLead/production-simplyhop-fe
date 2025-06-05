"use client";
import * as React from "react";
import clsx from "clsx";
import { MoonLoader } from "@/core/components/moon_loader";
import { useGetSocialCallback } from "../react_query/hooks";

export const CallbackAuthContainer = () => {
  useGetSocialCallback();
  return (
    <div className={clsx("w-full h-full min-h-[100vh]")}>
      <MoonLoader size={24} color={"#33CC33"} />
    </div>
  );
};
