"use client";
import * as React from "react";
import clsx from "clsx";
import "vanilla-cookieconsent/dist/cookieconsent.css";
import * as CookieConsent from "vanilla-cookieconsent";
import addCookieConsentListeners from "@/core/utils/cookie/cookieConsentListeners";
import getConfig from "@/core/utils/cookie/cookieConsentConfig";

export interface AppContainerProps {
  children?: React.ReactNode;
  className?: string;
}

export const AppContainer = ({ children, className }: AppContainerProps) => {
  const locale = "de";
  React.useEffect(() => {
    addCookieConsentListeners();
    CookieConsent.run(getConfig({ lang: locale }));
  }, [locale]);
  return <body className={clsx("w-full", className)}>{children}</body>;
};
