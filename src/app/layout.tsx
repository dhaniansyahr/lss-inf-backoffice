import Providers from "@/components/providers";
import { TConfig } from "@/stores/config";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import NextTopLoader from "nextjs-toploader";

const fontGeistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const fontGeistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "LSS-Informatika",
    description: "Lab Schedule System - Informatika FMIPA USK",
    openGraph: {
        title: "",
        description: "",
        url: "",
        images: [
            {
                url: "",
                alt: "",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "",
        description: "",
        images: [""],
    },
    icons: {
        icon: "",
    },
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const config = {
        title: metadata?.title,
        description: metadata?.description,
    };

    return (
        <html lang="en">
            <body
                className={`${fontGeistSans.variable} ${fontGeistMono.variable} font-geist-sans antialiased`}
            >
                <Providers config={config as TConfig}>
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
                    {children}
                </Providers>
            </body>
        </html>
    );
}
