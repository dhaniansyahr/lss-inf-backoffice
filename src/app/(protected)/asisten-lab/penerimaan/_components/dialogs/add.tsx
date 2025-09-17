import Modal, { IModalRef } from "@/components/shared/modal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { service } from "@/services";
import { useMutation } from "@tanstack/react-query";
import { useQueryBuilder } from "@/hooks/use-query-builder";
import FormSection from "../form";
import { TJadwalRequest, schema } from "@/services/jadwal/type";
import { jadwalToValues } from "@/services/jadwal/dto";

interface IDialogAddProps {
    dialogRef: React.RefObject<IModalRef | null>;
}

export default function DialogAdd(props: IDialogAddProps) {
    const { params } = useQueryBuilder();

    const onClose = () => {
        props.dialogRef.current?.close();
        form.reset();
    };

    const form = useForm<TJadwalRequest>({
        defaultValues: jadwalToValues(null),
        resolver: zodResolver(schema.jadwal),
    });

    const createFn = useMutation(service.jadwal.create(params));

    const onSubmit = form.handleSubmit((data) => {
        createFn.mutate(data, {
            onSuccess: () => onClose(),
        });
    });

    return (
        <Modal ref={props.dialogRef} title="Tambah Data Jadwal Baru">
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
