"use client";

import { useAuth } from "@/stores/auth";
import { redirect } from "next/navigation";

import React, { useEffect } from "react";

type TProvidersProps = {
  children: React.ReactNode;
};

export default function Providers({ children }: TProvidersProps) {
  const { isLogin } = useAuth()();

  useEffect(() => {
    if (isLogin) {
      redirect("/dashboard");
    }
  }, [isLogin]);

  return <>{children}</>;
}
