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
import { TJadwalRequest } from "@/services/jadwal/type";
import { SelectContent } from "@radix-ui/react-select";
import { useFormContext } from "react-hook-form";

export default function FormSection() {
    const form = useFormContext<TJadwalRequest>();

    return (
        <div className="space-y-4">
            <FormField
                name="hari"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Hari</FormLabel>
                        <FormControl>
                            <Select
                                value={field.value}
                                onValueChange={(value) =>
                                    options.HARI.find(
                                        (option) => option.value === value
                                    ) && field.onChange(value)
                                }
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Pilih bidang minat" />
                                </SelectTrigger>
                                <SelectContent className="w-full bg-white">
                                    {options.HARI.map((option) => (
                                        <SelectItem
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </FormControl>
                    </FormItem>
                )}
            />

            <FormField
                name="shiftId"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>NIP</FormLabel>
                        <FormControl>
                            <Input {...field} placeholder="Pilih Shift" />
                        </FormControl>
                    </FormItem>
                )}
            />

            <FormField
                name="ruanganId"
                control={form.control}
                render={({ field, fieldState: { error } }) => (
                    <FormItem>
                        <FormLabel>Ruangan</FormLabel>
                        <FormControl>
                            <Input {...field} placeholder="Pilih Ruangan" />
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
                name="kelas"
                control={form.control}
                render={({ field, fieldState: { error } }) => (
                    <FormItem>
                        <FormLabel>Kelas</FormLabel>
                        <FormControl>
                            <Select
                                value={field.value}
                                onValueChange={(value) =>
                                    options.KELAS.find(
                                        (option) => option.value === value
                                    ) && field.onChange(value)
                                }
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Pilih Kelas" />
                                </SelectTrigger>
                                <SelectContent className="w-full bg-white">
                                    {options.KELAS.map((option) => (
                                        <SelectItem
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
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
                name="matakuliahId"
                control={form.control}
                render={({ field, fieldState: { error } }) => (
                    <FormItem>
                        <FormLabel>Matakuliah</FormLabel>
                        <FormControl>
                            <Input {...field} placeholder="Pilih Matakuliah" />
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
