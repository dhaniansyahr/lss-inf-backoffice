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
import { options } from "@/constants/options";
import { TMahasiswaRequest } from "@/services/master-data/mahasiswa/type";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

export default function FormSection({ isEdit = false }: { isEdit?: boolean }) {
    const form = useFormContext<TMahasiswaRequest>();

    const [isShowPassword, setIsShowPassword] = useState(false);

    return (
        <div className="space-y-4">
            <FormField
                name="nama"
                control={form.control}
                render={({ field, fieldState: { error } }) => (
                    <FormItem>
                        <FormLabel>Nama</FormLabel>
                        <FormControl>
                            <Input
                                {...field}
                                placeholder="Masukan nama mahasiswa"
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
                name="npm"
                control={form.control}
                render={({ field, fieldState: { error } }) => (
                    <FormItem>
                        <FormLabel>NPM</FormLabel>
                        <FormControl>
                            <Input
                                {...field}
                                placeholder="Masukan npm mahasiswa"
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
                name="semester"
                control={form.control}
                render={({ field, fieldState: { error } }) => (
                    <FormItem>
                        <FormLabel>Semester</FormLabel>
                        <FormControl>
                            <SelectBase
                                {...field}
                                placeholder="Pilih semester"
                                isSearchable
                                options={options.SEMESTER}
                                fullWith
                                value={options.SEMESTER.find(
                                    (item) =>
                                        item.value === field.value.toString()
                                )}
                                onChange={(value) => {
                                    field.onChange(Number(value?.value));
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
                name="tahunMasuk"
                control={form.control}
                render={({ field, fieldState: { error } }) => (
                    <FormItem>
                        <FormLabel>Tahun Masuk</FormLabel>
                        <FormControl>
                            <Input
                                {...field}
                                type="number"
                                placeholder="Masukan tahun masuk"
                                onChange={(e) => {
                                    field.onChange(Number(e.target.value));
                                }}
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
