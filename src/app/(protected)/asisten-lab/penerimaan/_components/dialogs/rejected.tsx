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
import { useQueryBuilder } from "@/hooks/use-query-builder";
import { TAcceptanceAssistenLab, schema } from "@/services/asisten-lab/type";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface IDialogRejectedProps {
    dialogRef: React.RefObject<IModalRef | null>;
    id: string;
}

export default function DialogRejected(props: IDialogRejectedProps) {
    const { params } = useQueryBuilder();
    const queryClient = useQueryClient();

    const onClose = () => {
        props.dialogRef.current?.close();
        form.reset();
    };

    const rejectedFn = useMutation(service.asistenLab.acceptance());

    const form = useForm<TAcceptanceAssistenLab>({
        resolver: zodResolver(schema.acceptance),
        defaultValues: {
            status: "DITOLAK",
            keterangan: "",
        },
        values: {
            status: "DITOLAK",
            keterangan: "",
        },
        resetOptions: {
            keepDirty: true,
        },
    });

    const onSubmit = form.handleSubmit((data) => {
        rejectedFn.mutate(
            { id: props.id, data },
            {
                onSuccess: (res) => {
                    toast.success(res.message);
                    onClose();
                    queryClient.invalidateQueries({
                        queryKey: ["asisten-lab", params],
                    });
                },
                onError: (err) => {
                    toast.error(err.message);
                },
            }
        );
    });

    return (
        <Modal ref={props.dialogRef} title="Keterangan Penolakan">
            <Form {...form}>
                <form className="space-y-4" onSubmit={onSubmit}>
                    <FormField
                        control={form.control}
                        name="keterangan"
                        render={({ field, fieldState: { error } }) => (
                            <FormItem>
                                <FormControl>
                                    <Textarea
                                        {...field}
                                        rows={3}
                                        placeholder="Masukan keterangan"
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
                            disabled={rejectedFn.isPending}
                        >
                            Batal
                        </Button>
                        <Button
                            type="submit"
                            disabled={rejectedFn.isPending}
                            loading={rejectedFn.isPending}
                        >
                            Simpan
                        </Button>
                    </div>
                </form>
            </Form>
        </Modal>
    );
}
