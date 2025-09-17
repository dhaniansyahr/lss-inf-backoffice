import SelectBase from "@/components/shared/select-base";
import {
    FormControl,
    FormItem,
    FormField,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { options } from "@/constants/options";
import { TRequestAssistenLab } from "@/services/asisten-lab/type";
import { useFormContext } from "react-hook-form";

export default function FormSection() {
    const form = useFormContext<TRequestAssistenLab>();

    return (
        <div className="space-y-4">
            <FormField
                name="nilaiTeori"
                control={form.control}
                render={({ field, fieldState: { error } }) => (
                    <FormItem>
                        <FormLabel>Nilai Teori</FormLabel>
                        <FormControl>
                            <SelectBase
                                {...field}
                                placeholder="Pilih Nilai Teori"
                                isSearchable
                                options={options.NILAI}
                                fullWith
                                value={options.NILAI.find(
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

            <FormField
                name="nilaiPraktikum"
                control={form.control}
                render={({ field, fieldState: { error } }) => (
                    <FormItem>
                        <FormLabel>Nilai Praktikum</FormLabel>
                        <FormControl>
                            <SelectBase
                                {...field}
                                placeholder="Pilih Nilai Praktikum"
                                isSearchable
                                options={options.NILAI}
                                fullWith
                                value={options.NILAI.find(
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

            <FormField
                name="nilaiAkhir"
                control={form.control}
                render={({ field, fieldState: { error } }) => (
                    <FormItem>
                        <FormLabel>Nilai Akhir</FormLabel>
                        <FormControl>
                            <SelectBase
                                {...field}
                                placeholder="Pilih Nilai Akhir"
                                isSearchable
                                options={options.NILAI}
                                fullWith
                                value={options.NILAI.find(
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
