"use client";

import type { ReactNode } from "react";
import LoadingScreen from "@/components/LoadingScreen";

export function LoadingGate({ children }: { children: ReactNode }) {
  return (
    <>
      <LoadingScreen />
      {children}
    </>
  );
}
