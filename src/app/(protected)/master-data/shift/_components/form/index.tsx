import {
    FormControl,
    FormItem,
    FormField,
    FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { TShiftRequest } from "@/services/master-data/shift/type";
import { useFormContext } from "react-hook-form";

export default function FormShift() {
    const form = useFormContext<TShiftRequest>();

    return (
        <div className="space-y-4">
            <FormField
                name="startTime"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Waktu Mulai</FormLabel>
                        <FormControl>
                            <Input {...field} type="time" />
                        </FormControl>
                    </FormItem>
                )}
            />

            <FormField
                name="endTime"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Waktu Selesai</FormLabel>
                        <FormControl>
                            <Input {...field} type="time" />
                        </FormControl>
                    </FormItem>
                )}
            />

            <FormField
                name="isActive"
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
                                {field.value ? "Aktif" : "Tidak Aktif"}
                            </FormLabel>
                        </div>
                    </FormItem>
                )}
            />
        </div>
    );
}
