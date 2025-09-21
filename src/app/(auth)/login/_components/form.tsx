"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TLoginRequest, TLoginResponse } from "@/services/auth/types";
import { setSession } from "@/utils/session";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { service } from "@/services";

const REDIRECT_URL = "/dashboard";

export default function LoginForm() {
    const form = useForm<TLoginRequest>();

    const [isShowPassword, setIsShowPassword] = useState(false);

    const authFn = useMutation(service.auth.login());

    const onSubmit = form.handleSubmit((value: TLoginRequest) => {
        authFn.mutate(value, {
            onSuccess: (data) => {
                console.log("Data After Login : ", data);

                setSession(data.content as TLoginResponse);

                setTimeout(() => {
                    window.location.href = REDIRECT_URL;
                }, 1000);
            },
        });
    });

    return (
        <section className="flex h-[calc(100vh-2rem)] items-center justify-center flex-col gap-4 p-6">
            <div className="space-y-2 text-center">
                <h1 className="text-2xl font-bold"></h1>
                <p className="text-sm text-gray-500"></p>
            </div>

            <Card className="w-full border-none shadow-none">
                <CardHeader>
                    <CardTitle className="font-bold text-2xl text-center">
                        LSS - LOGIN
                    </CardTitle>
                    <CardDescription className="text-sm text-gray-500 text-center">
                        Please enter your email and password to login.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={onSubmit} className="space-y-8">
                            <div className="flex flex-col gap-4">
                                <FormField
                                    name="identity"
                                    control={form.control}
                                    render={({
                                        field,
                                        fieldState: { error },
                                    }) => (
                                        <FormItem>
                                            <FormLabel>NPM/NIP/Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="h-12"
                                                    type="email"
                                                    {...field}
                                                />
                                            </FormControl>
                                            {error && (
                                                <FormMessage className="text-red-500">
                                                    {error.message}
                                                </FormMessage>
                                            )}
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    name="password"
                                    control={form.control}
                                    render={({
                                        field,
                                        fieldState: { error },
                                    }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="h-12"
                                                    type={
                                                        isShowPassword
                                                            ? "text"
                                                            : "password"
                                                    }
                                                    {...field}
                                                    endIcon={
                                                        isShowPassword ? (
                                                            <Button
                                                                className="rounded-full"
                                                                type="button"
                                                                variant={
                                                                    "ghost"
                                                                }
                                                                onClick={() =>
                                                                    setIsShowPassword(
                                                                        false
                                                                    )
                                                                }
                                                            >
                                                                <Icon icon="mdi:eye-off" />
                                                            </Button>
                                                        ) : (
                                                            <Button
                                                                className="rounded-full"
                                                                type="button"
                                                                variant={
                                                                    "ghost"
                                                                }
                                                                onClick={() =>
                                                                    setIsShowPassword(
                                                                        true
                                                                    )
                                                                }
                                                            >
                                                                <Icon icon="mdi:eye" />
                                                            </Button>
                                                        )
                                                    }
                                                />
                                            </FormControl>
                                            {error && (
                                                <FormMessage className="text-red-500">
                                                    {error.message}
                                                </FormMessage>
                                            )}
                                        </FormItem>
                                    )}
                                />

                                <Button
                                    size={"lg"}
                                    className="rounded-full"
                                    type="submit"
                                    disabled={authFn.isPending}
                                    loading={authFn.isPending}
                                >
                                    Login
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </section>
    );
}
