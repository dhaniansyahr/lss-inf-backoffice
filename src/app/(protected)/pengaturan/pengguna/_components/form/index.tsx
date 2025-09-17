import SelectBase from "@/components/shared/select-base";
import { Button } from "@/components/ui/button";
import {
    FormControl,
    FormItem,
    FormField,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TUserRequest } from "@/services/pengguna/users/type";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

export default function FormSection() {
    const [isShowPassword, setIsShowPassword] = useState(false);

    const form = useFormContext<TUserRequest>();

    return (
        <div className="space-y-4">
            <FormField
                name="fullName"
                control={form.control}
                render={({ field, fieldState: { error } }) => (
                    <FormItem>
                        <FormLabel>Nama Lengkap</FormLabel>
                        <FormControl>
                            <Input
                                {...field}
                                placeholder="Masukan nama lengkap"
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
                name="email"
                control={form.control}
                render={({ field, fieldState: { error } }) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input {...field} placeholder="Masukan email" />
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
                render={({ field, fieldState: { error } }) => (
                    <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                            <Input
                                className="h-12"
                                type={isShowPassword ? "text" : "password"}
                                {...field}
                                endIcon={
                                    isShowPassword ? (
                                        <Button
                                            className="rounded-full"
                                            type="button"
                                            variant={"ghost"}
                                            onClick={() =>
                                                setIsShowPassword(false)
                                            }
                                        >
                                            <Icon icon="mdi:eye-off" />
                                        </Button>
                                    ) : (
                                        <Button
                                            className="rounded-full"
                                            type="button"
                                            variant={"ghost"}
                                            onClick={() =>
                                                setIsShowPassword(true)
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

            <FormField
                name="userLevelId"
                control={form.control}
                render={({ field, fieldState: { error } }) => (
                    <FormItem>
                        <FormLabel>Role</FormLabel>
                        <FormControl>
                            <SelectBase
                                {...field}
                                placeholder="Pilih Role"
                                isSearchable
                                options={[]}
                                fullWith
                                isClearable
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
        </div>
    );
}
