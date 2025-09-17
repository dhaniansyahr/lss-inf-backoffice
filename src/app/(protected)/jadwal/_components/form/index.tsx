import SelectBase from "@/components/shared/select-base";
import {
    FormControl,
    FormItem,
    FormField,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { options } from "@/constants/options";
import { service } from "@/services";
import { TJadwalRequest } from "@/services/jadwal/type";
import { useQuery } from "@tanstack/react-query";
import { useFormContext } from "react-hook-form";

export default function FormSection() {
    const form = useFormContext<TJadwalRequest>();

    const { data: shift } = useQuery(
        service.shift.getAll({ page: 1, rows: 1000 })
    );
    const { data: ruangan } = useQuery(
        service.ruangan.getAll({ page: 1, rows: 1000 })
    );
    const { data: matakuliah } = useQuery(
        service.matakuliah.getAll({
            page: 1,
            rows: 1000,
            filters: {
                isTeori: false,
            },
        })
    );

    const shiftOptions =
        shift?.content?.entries.map((item) => ({
            label: item.startTime + " - " + item.endTime,
            value: item.id,
        })) ?? [];

    const ruanganOptions =
        ruangan?.content?.entries.map((item) => ({
            label: item.nama,
            value: item.id,
        })) ?? [];

    const matakuliahOptions =
        matakuliah?.content?.entries.map((item) => ({
            label: item.kode + " - " + item.nama,
            value: item.id,
        })) ?? [];

    return (
        <div className="space-y-4">
            <FormField
                name="hari"
                control={form.control}
                render={({ field, fieldState: { error } }) => (
                    <FormItem>
                        <FormLabel>Hari</FormLabel>
                        <FormControl>
                            <SelectBase
                                {...field}
                                placeholder="Pilih Hari"
                                isSearchable
                                options={options.HARI}
                                fullWith
                                value={options.HARI.find(
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
                name="shiftId"
                control={form.control}
                render={({ field, fieldState: { error } }) => (
                    <FormItem>
                        <FormLabel>Shift</FormLabel>
                        <FormControl>
                            <SelectBase
                                {...field}
                                placeholder="Pilih Shift"
                                isSearchable
                                options={shiftOptions}
                                fullWith
                                value={shiftOptions.find(
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
                name="ruanganId"
                control={form.control}
                render={({ field, fieldState: { error } }) => (
                    <FormItem>
                        <FormLabel>Ruangan</FormLabel>
                        <FormControl>
                            <SelectBase
                                {...field}
                                placeholder="Pilih Ruangan"
                                isSearchable
                                options={ruanganOptions}
                                fullWith
                                value={ruanganOptions.find(
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
                name="kelas"
                control={form.control}
                render={({ field, fieldState: { error } }) => (
                    <FormItem>
                        <FormLabel>Kelas</FormLabel>
                        <FormControl>
                            <SelectBase
                                {...field}
                                placeholder="Pilih Kelas"
                                isSearchable
                                options={options.KELAS}
                                fullWith
                                value={options.KELAS.find(
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
                name="matakuliahId"
                control={form.control}
                render={({ field, fieldState: { error } }) => (
                    <FormItem>
                        <FormLabel>Matakuliah</FormLabel>
                        <FormControl>
                            <SelectBase
                                {...field}
                                placeholder="Pilih Matakuliah"
                                isSearchable
                                options={matakuliahOptions}
                                fullWith
                                value={matakuliahOptions.find(
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

            {/* <FormField
                name="dosenIds"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Dosen</FormLabel>
                        <FormControl>
                            <SelectBase
                                {...field}
                                placeholder="Pilih Dosen"
                                isSearchable
                                options={dosenOptions}
                                fullWith
                                value={dosenOptions.find((item) =>
                                    field.value?.includes(item.value)
                                )}
                                onChange={(value) => {
                                    field.onChange([value?.value]);
                                }}
                                isClearable
                            />
                        </FormControl>
                    </FormItem>
                )}
            /> */}
        </div>
    );
}
