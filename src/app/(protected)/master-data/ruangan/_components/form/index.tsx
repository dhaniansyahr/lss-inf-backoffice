import {
    FormControl,
    FormItem,
    FormField,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { TRuanganRequest } from "@/services/master-data/ruangan/type";
import { useFormContext } from "react-hook-form";

export default function FormShift() {
    const form = useFormContext<TRuanganRequest>();

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
                                placeholder="Masukan nama ruangan"
                            />
                        </FormControl>
                    </FormItem>
                )}
            />

            <FormField
                name="lokasi"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Lokasi</FormLabel>
                        <FormControl>
                            <Input
                                {...field}
                                placeholder="Masukan lokasi ruangan"
                            />
                        </FormControl>
                    </FormItem>
                )}
            />

            <FormField
                name="kapasitas"
                control={form.control}
                render={({ field, fieldState: { error } }) => (
                    <FormItem>
                        <FormLabel>Kapasitas</FormLabel>
                        <FormControl>
                            <Input
                                type="number"
                                {...field}
                                placeholder="Masukan kapasitas ruangan"
                                onChange={(e) => {
                                    const value = e.target.value;
                                    const floatValue = parseFloat(value);

                                    field.onChange(floatValue);
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

            <FormField
                name="isLab"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <div className="flex items-center gap-2">
                            <FormControl>
                                <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <FormLabel className="text-sm">
                                {field.value ? "Lab" : "Bukan Lab"}
                            </FormLabel>
                        </div>
                    </FormItem>
                )}
            />
        </div>
    );
}
