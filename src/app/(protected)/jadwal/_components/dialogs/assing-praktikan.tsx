import Modal, { IModalRef } from "@/components/shared/modal";
import { useForm } from "react-hook-form";
import {
    Form,
    FormLabel,
    FormField,
    FormItem,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { service } from "@/services";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import SelectBase from "@/components/shared/select-base";

interface IDialogManualAssignPraktikan {
    dialogRef: React.RefObject<IModalRef | null>;
    id: string;
}

export default function DialogManualAssignPraktikan(
    props: IDialogManualAssignPraktikan
) {
    const onClose = () => {
        props.dialogRef.current?.close();
        form.reset();
    };

    const form = useForm<{ mahasiswaIds: string[] }>({
        defaultValues: {
            mahasiswaIds: [],
        },
    });

    const createFn = useMutation(service.jadwal.manualAssignMhs());

    const onSubmit = form.handleSubmit((data) => {
        createFn.mutate(
            { id: props.id, data },
            {
                onSuccess: (res) => {
                    toast.success(res.message);
                    onClose();
                },
                onError: (error) => {
                    toast.error(error.message);
                },
            }
        );
    });

    const { data: mahasiswa } = useQuery(
        service.mahasiswa.getAll({
            page: 1,
            rows: 1000,
        })
    );

    const mahasiswaOptions =
        mahasiswa?.content?.entries.map((item) => ({
            label: `${item.nama} - ${item.npm}`,
            value: item.id,
        })) ?? [];

    return (
        <Modal ref={props.dialogRef} title="Assign Praktikan">
            <Form {...form}>
                <form className="space-y-4" onSubmit={onSubmit}>
                    <FormField
                        name="mahasiswaIds"
                        control={form.control}
                        render={({ field, fieldState: { error } }) => (
                            <FormItem>
                                <FormLabel>Praktikan</FormLabel>
                                <FormControl>
                                    <SelectBase
                                        {...field}
                                        placeholder="Pilih Praktikan"
                                        isSearchable
                                        options={mahasiswaOptions}
                                        fullWith
                                        value={mahasiswaOptions.find((item) =>
                                            field.value?.includes(item.value)
                                        )}
                                        onChange={(value) => {
                                            field.onChange([value?.value]);
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
                        <Button
                            type="submit"
                            disabled={createFn.isPending}
                            loading={createFn.isPending}
                        >
                            Simpan
                        </Button>
                    </div>
                </form>
            </Form>
        </Modal>
    );
}
