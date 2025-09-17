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
import { useMutation, useQuery } from "@tanstack/react-query";
import { service } from "@/services";
import { useQueryBuilder } from "@/hooks/use-query-builder";
import {
    TAssignRequest,
    assignSchema,
} from "@/services/master-data/ruangan/type";
import SelectBase from "@/components/shared/select-base";
import { Option } from "@/types/common";

interface IDialogAssignProps {
    dialogRef: React.RefObject<IModalRef | null>;
    id: string;
}

export default function DialogAssign(props: IDialogAssignProps) {
    const { params } = useQueryBuilder();

    const { data } = useQuery({
        ...service.ruangan.getOne(props.id),
        enabled: !!props.id,
    });

    const { data: dosen } = useQuery(
        service.dosen.getAll({
            page: 1,
            rows: 100,
        })
    );

    const onClose = () => {
        props.dialogRef.current?.close();
        form.reset();
    };

    const createFn = useMutation({
        ...service.ruangan.assign(),
        meta: {
            messages: {
                success: "Berhasil Assign Kepala Lab!",
                error: "Gagal Assign Kepala Lab!",
            },
            invalidatesQuery: ["ruangan", params],
            onDialogClose: onClose,
        },
    });

    const form = useForm<TAssignRequest>({
        resolver: zodResolver(assignSchema),
        defaultValues: {
            dosenId: data?.content?.kepalaLabId ?? "",
        },
        values: {
            dosenId: data?.content?.kepalaLabId ?? "",
        },
        resetOptions: {
            keepDirty: true,
        },
    });

    const onSubmit = form.handleSubmit((data) => {
        console.log("Data : ", data);
        createFn.mutate(
            { id: props.id, data },
            {
                onSuccess: () => onClose(),
            }
        );
    });

    const dosenOptions = dosen?.content?.entries.map((item) => ({
        label: `${item.nama} - ${item.nip}`,
        value: item.id,
    })) as Option[];

    console.log("Form Error : ", form.formState.errors);

    return (
        <Modal ref={props.dialogRef} title="Assign Kepala Lab">
            <Form {...form}>
                <form className="space-y-4" onSubmit={onSubmit}>
                    <FormField
                        control={form.control}
                        name="dosenId"
                        render={({ field, fieldState: { error } }) => (
                            <FormItem>
                                <FormLabel>Dosen</FormLabel>
                                <FormControl>
                                    <SelectBase
                                        {...field}
                                        placeholder="Pilih Dosen"
                                        isSearchable
                                        options={dosenOptions}
                                        fullWith
                                        value={dosenOptions.find(
                                            (item) => item.value === field.value
                                        )}
                                        onChange={(value) => {
                                            field.onChange(
                                                (value as Option)?.value
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

                    <div className="flex items-center gap-2 justify-end">
                        <Button
                            variant={"outline"}
                            type="button"
                            onClick={onClose}
                            disabled={createFn.isPending}
                        >
                            Batal
                        </Button>
                        <Button type="submit" disabled={createFn.isPending}>
                            {createFn.isPending ? "Memuat..." : "Simpan"}
                        </Button>
                    </div>
                </form>
            </Form>
        </Modal>
    );
}
