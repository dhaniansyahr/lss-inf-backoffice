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
import {
    Select,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { options } from "@/constants/options";
import { TDosenRequest } from "@/services/master-data/dosen/type";
import { Option } from "@/types/common";
import { Icon } from "@iconify/react/dist/iconify.js";
import { SelectContent } from "@radix-ui/react-select";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

export const BIDANG_MINAT_OPTIONS = [
    { label: "Rekayasa Perangkat Lunak", value: "RPL" },
    { label: "Data Mining", value: "DATA_MINING" },
    { label: "Jaringan Komputer", value: "JARINGAN" },
    { label: "GIS", value: "GIS" },
];

export default function FormSection({ isEdit = false }: { isEdit?: boolean }) {
    const form = useFormContext<TDosenRequest>();

    const [isShowPassword, setIsShowPassword] = useState(false);

    return (
        <div className="space-y-4">
            <FormField
                name="nama"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Nama</FormLabel>
                        <FormControl>
                            <Input
                                {...field}
                                placeholder="Masukan nama dosen"
                            />
                        </FormControl>
                    </FormItem>
                )}
            />

            <FormField
                name="nip"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>NIP</FormLabel>
                        <FormControl>
                            <Input {...field} placeholder="Masukan nip dosen" />
                        </FormControl>
                    </FormItem>
                )}
            />

            <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input {...field} placeholder="Masukan email" />
                        </FormControl>
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
                name="bidangMinat"
                control={form.control}
                render={({ field, fieldState: { error } }) => (
                    <FormItem>
                        <FormLabel>Bidang Minat</FormLabel>
                        <FormControl>
                            <SelectBase
                                {...field}
                                placeholder="Pilih Bidang Minat"
                                isSearchable
                                options={options.BIDANG_MINAT}
                                fullWith
                                value={options.BIDANG_MINAT.find(
                                    (item) => item.value === field.value
                                )}
                                onChange={(value) => {
                                    field.onChange((value as Option)?.value);
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
