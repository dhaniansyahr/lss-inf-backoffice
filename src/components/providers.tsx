"use client";

import React, { useState } from "react";

import { ConfigProvider, TConfig } from "@/stores/config";
import { QueryClientProvider } from "@tanstack/react-query";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "sonner";
import { queryClientInstance } from "@/lib/query-client";

type TProvidersProps = {
    children: React.ReactNode;
    config: TConfig;
};

export default function Providers({ children, config }: TProvidersProps) {
    const [queryClient] = useState(queryClientInstance);

    return (
        <QueryClientProvider client={queryClient}>
            <ConfigProvider config={config}>
                {/* <AppProgressBar
                    height="4px"
                    color={"#000000"}
                    options={{ showSpinner: false }}
                    shallowRouting
                /> */}
                <NextTopLoader
                    color="#050c43"
                    initialPosition={0.08}
                    crawlSpeed={200}
                    height={3}
                    crawl={true}
                    showSpinner={false}
                    easing="ease"
                    speed={200}
                    shadow="0 0 10px #050c43,0 0 5px #050c43"
                />
                <Toaster position="top-center" richColors />
                {children}
            </ConfigProvider>
        </QueryClientProvider>
    );
}
