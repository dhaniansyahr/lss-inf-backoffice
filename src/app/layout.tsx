import Providers from "@/components/providers";
import { authVerifyToken } from "@/services/auth";
import { TAuthIsLogin, TAuthUser } from "@/stores/auth";
import { TConfig } from "@/stores/config";
import "@/styles/globals.css";
import { getSession } from "@/utils/session";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nodewave",
  description: "Node Solusi Indonesia",
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
  const session = await getSession();

  let isLogin: TAuthIsLogin = false;

  if (session?.token) {
    const response = await authVerifyToken(session?.token);

    if (response) {
      isLogin = true;
    }
  }

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers
          config={config as TConfig}
          auth={{
            isLogin: isLogin,
            user: session?.user as TAuthUser,
          }}
        >
          {children}
        </Providers>
      </body>
    </html>
  );
}
