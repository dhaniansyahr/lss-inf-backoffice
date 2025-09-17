import { TAuthIsLogin, TAuthUser } from "@/stores/auth";
import { getSession } from "@/utils/session";
import { redirect } from "next/navigation";
import React from "react";
import Providers from "./_components/providers";
import { service } from "@/services";
import { routes } from "@/services/auth/api-route";

type TLayoutProps = {
    children: React.ReactNode;
};

const REDIRECT_URL = "/dashboard";

export default async function Layout({ children }: TLayoutProps) {
    const session = await getSession();

    let isLogin: TAuthIsLogin = false;
    let user: TAuthUser | null = null;

    if (session?.accessToken) {
        await service.auth
            .verifyToken({ token: session?.accessToken })
            .then((response) => {
                const userResponse = response.content?.user ?? {};

                const hasUser = Object.values(userResponse).some(
                    (value) => value !== undefined && value !== null
                );

                isLogin = true;
                user = hasUser ? (userResponse as TAuthUser) : null;
            })
            .catch(async () => {
                isLogin = false;
                user = null;

                redirect(routes.logout);
            });
    }

    if (isLogin) {
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
            {children}
        </Providers>
    );
}
