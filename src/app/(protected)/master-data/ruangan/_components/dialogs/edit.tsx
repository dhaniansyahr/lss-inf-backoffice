import Modal, { IModalRef } from "@/components/shared/modal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import FormShift from "../form";
import { service } from "@/services";
import { Skeleton } from "@/components/ui/skeleton";
import { schema, TRuanganRequest } from "@/services/master-data/ruangan/type";
import { ruanganToValues } from "@/services/master-data/ruangan/dto";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useQueryBuilder } from "@/hooks/use-query-builder";

interface IDialogEditProps {
    dialogRef: React.RefObject<IModalRef | null>;
    id: string;
}

export default function DialogEdit(props: IDialogEditProps) {
    const { params } = useQueryBuilder();

    const { data, isLoading } = useQuery({
        ...service.ruangan.getOne(props.id),
        enabled: !!props.id,
    });

    const onClose = () => {
        props.dialogRef.current?.close();
        form.reset();
    };

    const updateFn = useMutation(service.ruangan.update(props.id, params));

    const form = useForm<TRuanganRequest>({
        resolver: zodResolver(schema),
        defaultValues: ruanganToValues(data?.content ?? null),
        values: ruanganToValues(data?.content ?? null),
        resetOptions: {
            keepDirty: true,
        },
    });

    const onSubmit = form.handleSubmit((data) => {
        updateFn.mutate(data, {
            onSuccess: () => onClose(),
        });
    });

    return (
        <Modal ref={props.dialogRef} title="Edit Ruangan">
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
