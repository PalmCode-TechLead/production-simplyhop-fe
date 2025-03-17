import * as React from "react";
import clsx from "clsx";
import { TopNavigation } from "../fragments/top_navigation";

export interface AppContainerProps {
  children?: React.ReactNode;
}

export const AppContainer = ({ children }: AppContainerProps) => {
  return (
    <main className={clsx("w-full min-h-screen")}>
      <TopNavigation />
      <div className={clsx("pt-[90px]", "w-full min-h-screen")}>{children}</div>
    </main>
  );
};
