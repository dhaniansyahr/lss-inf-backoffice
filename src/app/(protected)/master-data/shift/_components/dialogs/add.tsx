import Modal, { IModalRef } from "@/components/shared/modal";
import { dataToRequest } from "@/services/master-data/shift/dto";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema, TShiftRequest } from "@/services/master-data/shift/type";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import FormShift from "../form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { service } from "@/services";
import { toast } from "sonner";
import { DateTime } from "luxon";

interface IDialogAddProps {
    dialogRef: React.RefObject<IModalRef | null>;
}

export default function DialogAdd(props: IDialogAddProps) {
    const queryClient = useQueryClient();

    const onClose = () => {
        props.dialogRef.current?.close();
        form.reset();
    };

    const createFn = useMutation(service.shift.create());

    const form = useForm<TShiftRequest>({
        defaultValues: dataToRequest(null),
        resolver: zodResolver(schema),
    });

    const onSubmit = form.handleSubmit((data) => {
        console.log(data);

        const body = Object.assign({}, data, {
            startTime: DateTime.fromISO(data.startTime).toFormat("HH.mm"),
            endTime: DateTime.fromISO(data.endTime).toFormat("HH.mm"),
        });

        createFn.mutate(body, {
            onSuccess: (res) => {
                toast.success(res.message);
                queryClient.refetchQueries({
                    queryKey: ["shifts"],
                });
                onClose();
            },
            onError: (err) => {
                toast.error(err.message);
            },
        });
    });

    return (
        <Modal ref={props.dialogRef} title="Tambah Shift Baru">
            <Form {...form}>
                <form className="space-y-4" onSubmit={onSubmit}>
                    <FormShift />

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
