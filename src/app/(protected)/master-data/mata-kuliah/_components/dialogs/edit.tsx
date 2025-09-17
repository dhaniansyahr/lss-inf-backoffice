import Modal, { IModalRef } from "@/components/shared/modal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { service } from "@/services";
import { Skeleton } from "@/components/ui/skeleton";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useQueryBuilder } from "@/hooks/use-query-builder";
import {
    TMatakuliahRequest,
    schema,
} from "@/services/master-data/matakuliah/type";
import { matakuliahToValues } from "@/services/master-data/matakuliah/dto";
import FormSection from "../form";

interface IDialogEditProps {
    dialogRef: React.RefObject<IModalRef | null>;
    id: string;
}

export default function DialogEdit(props: IDialogEditProps) {
    const { params } = useQueryBuilder();

    const { data, isLoading } = useQuery({
        ...service.matakuliah.getOne(props.id),
        enabled: !!props.id,
    });

    const onClose = () => {
        props.dialogRef.current?.close();
        form.reset();
    };

    const updateFn = useMutation(service.matakuliah.update(props.id, params));

    const form = useForm<TMatakuliahRequest>({
        resolver: zodResolver(schema),
        defaultValues: matakuliahToValues(data?.content ?? null),
        values: matakuliahToValues(data?.content ?? null),
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
        <Modal ref={props.dialogRef} title="Edit Data Matakuliah">
            <Form {...form}>
                <form className="space-y-4" onSubmit={onSubmit}>
                    {isLoading ? (
                        Array.from({ length: 2 }).map((_, index) => (
                            <Skeleton className="h-10 w-full" key={index} />
                        ))
                    ) : (
                        <FormSection />
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
