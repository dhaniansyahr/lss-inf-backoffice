import Modal, { IModalRef } from "@/components/shared/modal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { service } from "@/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TMeetingRequest, schema } from "@/services/jadwal/type";
import { useQueryBuilder } from "@/hooks/use-query-builder";
import SingleDatePicker from "@/components/shared/date-picker/single";
import SelectBase from "@/components/shared/select-base";
import { options } from "@/constants/options";

interface IDialogEditPertemuanProps {
    dialogRef: React.RefObject<IModalRef | null>;
    id: string;
}

export default function DialogEditPertemuan(props: IDialogEditPertemuanProps) {
    const { params } = useQueryBuilder();
    const queryClient = useQueryClient();

    const onClose = () => {
        props.dialogRef.current?.close();
        form.reset();
    };

    const updateFn = useMutation(service.jadwal.updateMeeting(props.id));

    const form = useForm<TMeetingRequest>({
        resolver: zodResolver(schema.meeting),
        defaultValues: {
            tanggal: "",
            meetingId: "",
        },
        resetOptions: {
            keepDirty: true,
        },
    });

    const onSubmit = form.handleSubmit((data) => {
        updateFn.mutate(data, {
            onSuccess: () => {
                onClose();
                queryClient.invalidateQueries({
                    queryKey: ["jadwal", props.id, params],
                });
            },
        });
    });

    // const { data: meeting } = useQuery()

    return (
        <Modal ref={props.dialogRef} title="Edit Pertemuan">
            <Form {...form}>
                <form className="space-y-4" onSubmit={onSubmit}>
                    <div className="space-y-2">
                        <FormField
                            name="tanggal"
                            control={form.control}
                            render={({ field, fieldState: { error } }) => (
                                <FormItem>
                                    <FormLabel>Tanggal</FormLabel>
                                    <FormControl>
                                        <SingleDatePicker
                                            selected={
                                                field.value
                                                    ? new Date(field.value)
                                                    : undefined
                                            }
                                            mode="single"
                                            placeholder="Pilih Tanggal"
                                            onSelect={(date) => {
                                                field.onChange(date);
                                            }}
                                            buttonClassName="h-10 rounded-md"
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
                            name="meetingId"
                            control={form.control}
                            render={({ field, fieldState: { error } }) => (
                                <FormItem>
                                    <FormLabel>Pertemuan</FormLabel>
                                    <FormControl>
                                        <SelectBase
                                            {...field}
                                            placeholder="Pilih Pertemuan"
                                            isSearchable
                                            options={options.HARI}
                                            fullWith
                                            value={options.HARI.find(
                                                (item) =>
                                                    item.value === field.value
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

                    <div className="flex items-center gap-2 justify-end">
                        <Button
                            variant={"outline"}
                            type="button"
                            onClick={onClose}
                            disabled={updateFn.isPending}
                        >
                            Batal
                        </Button>
                        <Button
                            type="submit"
                            disabled={updateFn.isPending}
                            loading={updateFn.isPending}
                        >
                            Simpan
                        </Button>
                    </div>
                </form>
            </Form>
        </Modal>
    );
}
