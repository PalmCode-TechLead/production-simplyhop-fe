"use client";

import { Suspense } from "react";
import { CallbackAuthContainer } from "@/features/auth/callback/container";

export default function Page() {
  return (
    <Suspense fallback={<div />}>
      <CallbackAuthContainer />
    </Suspense>
  );
}
