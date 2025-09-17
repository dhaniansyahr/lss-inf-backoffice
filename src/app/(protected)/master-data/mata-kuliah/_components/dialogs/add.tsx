import Modal, { IModalRef } from "@/components/shared/modal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { service } from "@/services";
import { useMutation } from "@tanstack/react-query";
import { useQueryBuilder } from "@/hooks/use-query-builder";
import FormSection from "../form";
import {
    schema,
    TMatakuliahRequest,
} from "@/services/master-data/matakuliah/type";
import { matakuliahToValues } from "@/services/master-data/matakuliah/dto";

interface IDialogAddProps {
    dialogRef: React.RefObject<IModalRef | null>;
}

export default function DialogAdd(props: IDialogAddProps) {
    const { params } = useQueryBuilder();

    const onClose = () => {
        props.dialogRef.current?.close();
        form.reset();
    };

    const form = useForm<TMatakuliahRequest>({
        defaultValues: matakuliahToValues(null),
        resolver: zodResolver(schema),
    });

    const createFn = useMutation(service.matakuliah.create(params));

    const onSubmit = form.handleSubmit((data) => {
        const body = Object.assign({}, data, {
            semester: Number(data.semester),
        });

        createFn.mutate(body, {
            onSuccess: () => onClose(),
        });
    });

    return (
        <Modal ref={props.dialogRef} title="Tambah Data Matakuliah Baru">
            <Form {...form}>
                <form className="space-y-4" onSubmit={onSubmit}>
                    <FormSection />

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
