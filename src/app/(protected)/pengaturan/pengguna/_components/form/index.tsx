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
import { service } from "@/services";
import { TUserRequest } from "@/services/pengguna/users/type";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

export default function FormSection({ isEdit = false }: { isEdit: boolean }) {
    const [isShowPassword, setIsShowPassword] = useState(false);

    const form = useFormContext<TUserRequest>();

    const { data: role, isLoading: isLoadRole } = useQuery(
        service.roles.getAll({
            page: 1,
            rows: 100,
        })
    );

    const roleOptions =
        role?.content?.entries.map((item) => ({
            label: item.name,
            value: item.id,
        })) || [];

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

            {!isEdit && (
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
            )}

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
                                isLoading={isLoadRole}
                                options={roleOptions}
                                fullWith
                                value={roleOptions?.find(
                                    (item) => item.value === field.value
                                )}
                                onChange={(value) => {
                                    field.onChange(value?.value);
                                }}
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
