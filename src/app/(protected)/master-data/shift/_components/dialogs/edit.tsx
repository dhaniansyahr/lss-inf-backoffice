import Modal, { IModalRef } from "@/components/shared/modal";
import { dataToRequest } from "@/services/master-data/shift/dto";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema, TShiftRequest } from "@/services/master-data/shift/type";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import FormShift from "../form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { service } from "@/services";
import { Skeleton } from "@/components/ui/skeleton";
import { DateTime } from "luxon";
import { toast } from "sonner";

interface IDialogEditProps {
    dialogRef: React.RefObject<IModalRef | null>;
    id: string;
}

export default function DialogEdit(props: IDialogEditProps) {
    const queryClient = useQueryClient();

    const { data, isLoading } = useQuery({
        ...service.shift.getOne(props.id),
        enabled: !!props.id,
    });

    const onClose = () => {
        props.dialogRef.current?.close();
        form.reset();
    };

    const updateFn = useMutation(service.shift.update(props.id));

    const form = useForm<TShiftRequest>({
        resolver: zodResolver(schema),
        defaultValues: dataToRequest(data?.content ?? null),
        values: dataToRequest(data?.content ?? null),
        resetOptions: {
            keepDirty: true,
        },
    });

    const onSubmit = form.handleSubmit((data) => {
        const body = Object.assign({}, data, {
            startTime: DateTime.fromISO(data.startTime).toFormat("HH.mm"),
            endTime: DateTime.fromISO(data.endTime).toFormat("HH.mm"),
        });

        updateFn.mutate(body, {
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
        <Modal ref={props.dialogRef} title="Edit Shift">
            <Form {...form}>
                <form className="space-y-4" onSubmit={onSubmit}>
                    {isLoading ? (
                        Array.from({ length: 2 }).map((_, index) => (
                            <Skeleton className="h-10 w-full" key={index} />
                        ))
                    ) : (
                        <FormShift />
                    )}

                    <div className="flex items-center gap-2 justify-end">
                        <Button
                            variant={"outline"}
                            type="button"
                            onClick={onClose}
                            disabled={updateFn.isPending}
                        >
                            Batal
                        </Button>
                        <Button type="submit" disabled={updateFn.isPending}>
                            {updateFn.isPending ? "Memuat..." : "Simpan"}
                        </Button>
                    </div>
                </form>
            </Form>
        </Modal>
    );
}
