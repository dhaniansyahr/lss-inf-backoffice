"use client";

import React, { useState } from "react";

import { AuthProvider, TAuthIsLogin, TAuthUser } from "@/stores/auth";
import { ConfigProvider, TConfig } from "@/stores/config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppProgressBar } from "next-nprogress-bar";
import { Toaster } from "sonner";

type TProvidersProps = {
  children: React.ReactNode;
  config: TConfig;
  auth: {
    isLogin: TAuthIsLogin;
    user: TAuthUser;
  };
};

export default function Providers({ children, config, auth }: TProvidersProps) {
  const [queryClient] = useState(() => {
    return new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 60 * 1000,
          refetchOnWindowFocus: false,
        },
      },
    });
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider config={config}>
        <AuthProvider isLogin={auth.isLogin} user={auth.user}>
          <AppProgressBar
            height="4px"
            color={"#000000"}
            options={{ showSpinner: false }}
            shallowRouting
          />
          <Toaster position="top-center" richColors />
          {children}
        </AuthProvider>
      </ConfigProvider>
    </QueryClientProvider>
  );
}
