import React from "react";
import Providers from "./_components/providers";

type TLayoutProps = {
  children: React.ReactNode;
};

export default async function Layout({ children }: TLayoutProps) {
  return <Providers>{children}</Providers>;
}
