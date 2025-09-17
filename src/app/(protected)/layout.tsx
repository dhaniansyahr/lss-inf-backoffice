import { TAuthIsLogin, TAuthUser } from "@/stores/auth";
import { getSession } from "@/utils/session";
import { redirect } from "next/navigation";
import React from "react";
import Providers from "./_components/providers";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import AppSidebar from "./_components/app-sidebar";
import AppHeader from "./_components/app-header";
import { service } from "@/services";
import { routes } from "@/services/auth/api-route";

type TLayoutProps = {
    children: React.ReactNode;
};

const REDIRECT_URL = "/login";

export default async function Layout({ children }: TLayoutProps) {
    const session = await getSession();

    let isLogin: TAuthIsLogin = false;
    let user: TAuthUser | null = null;

    if (session?.accessToken) {
        await service.auth
            .verifyToken({ token: session?.accessToken })
            .then((response) => {
                const userResponse = response.content?.user ?? {};

                isLogin = true;

                const hasUser = Object.values(userResponse).some(
                    (value) => value !== undefined && value !== null
                );

                user = hasUser ? (userResponse as TAuthUser) : null;
            })
            .catch(() => {
                isLogin = false;
                user = null;
                redirect(routes.logout);
            });
    }

    if (!isLogin) {
        redirect(REDIRECT_URL);
    }

    return (
        <Providers
            auth={{
                isLogin: isLogin,
                accessToken: session?.accessToken,
                user: user,
            }}
        >
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    <AppHeader />
                    <main className="flex-1 p-6">{children}</main>
                </SidebarInset>
            </SidebarProvider>
        </Providers>
    );
}
