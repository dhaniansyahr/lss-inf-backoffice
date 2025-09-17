import Modal, { IModalRef } from "@/components/shared/modal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { service } from "@/services";
import { useMutation } from "@tanstack/react-query";
import { useQueryBuilder } from "@/hooks/use-query-builder";
import FormSection from "../form";
import { TRequestAssistenLab, schema } from "@/services/asisten-lab/type";
import { toast } from "sonner";
import { useAuth } from "@/stores/auth";

interface IDialogAddProps {
    dialogRef: React.RefObject<IModalRef | null>;
    jadwalId: string;
}

export default function DialogAdd(props: IDialogAddProps) {
    const { user } = useAuth();
    const { params } = useQueryBuilder();

    const onClose = () => {
        props.dialogRef.current?.close();
        form.reset();
    };

    const form = useForm<TRequestAssistenLab>({
        defaultValues: {
            jadwalId: props.jadwalId,
            mahasiswaId: user?.id,
            nilaiTeori: "",
            nilaiPraktikum: "",
            nilaiAkhir: "",
            keterangan: "",
        },
        resolver: zodResolver(schema.request),
    });

    const createFn = useMutation({
        ...service.asistenLab.create(params),
        meta: {
            invalidatesQuery: ["asisten-lab", params],
        },
    });

    const onSubmit = form.handleSubmit((data) => {
        createFn.mutate(data, {
            onSuccess: () => onClose(),
            onError: (err) => {
                toast.error(err.message);
            },
        });
    });

    return (
        <Modal ref={props.dialogRef} title="Daftar Asisten Lab">
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
