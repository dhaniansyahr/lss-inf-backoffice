import {
    FormControl,
    FormItem,
    FormField,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { TMatakuliahRequest } from "@/services/master-data/matakuliah/type";
import { useFormContext } from "react-hook-form";
import SelectBase from "@/components/shared/select-base";
import { Option } from "@/types/common";
import { options } from "@/constants/options";

export default function FormSection() {
    const form = useFormContext<TMatakuliahRequest>();

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
                                placeholder="Masukan nama matakuliah"
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
                name="kode"
                control={form.control}
                render={({ field, fieldState: { error } }) => (
                    <FormItem>
                        <FormLabel>Kode</FormLabel>
                        <FormControl>
                            <Input
                                {...field}
                                placeholder="Masukan kode matakuliah"
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
                name="type"
                control={form.control}
                render={({ field, fieldState: { error } }) => (
                    <FormItem>
                        <FormLabel>Tipe</FormLabel>
                        <FormControl>
                            <SelectBase
                                {...field}
                                placeholder="Pilih Tipe Matakuliah"
                                isSearchable
                                options={options.TIPE_MATKUL}
                                fullWith
                                value={options.TIPE_MATKUL.find(
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

            <FormField
                name="sks"
                control={form.control}
                render={({ field, fieldState: { error } }) => (
                    <FormItem>
                        <FormLabel>SKS</FormLabel>
                        <FormControl>
                            <Input
                                {...field}
                                placeholder="Masukan beban sks matakuliah"
                                type="number"
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

            <FormField
                name="isTeori"
                control={form.control}
                render={({ field, fieldState: { error } }) => (
                    <FormItem>
                        <div className="flex items-center gap-2">
                            <FormControl>
                                <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <FormLabel className="text-sm">
                                {field.value ? "Teori" : "Praktikum"}
                            </FormLabel>
                        </div>
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
                                placeholder="Pilih Semester"
                                isSearchable
                                options={options.SEMESTER}
                                fullWith
                                value={options.SEMESTER.find(
                                    (item) =>
                                        item.value === field.value.toString()
                                )}
                                onChange={(value) => {
                                    field.onChange(
                                        Number((value as Option)?.value)
                                    );
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
