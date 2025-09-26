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
import { TpendaftaranAsistenLab } from "@/types/data";
import { toast } from "sonner";

interface IDialogEditProps {
    dialogRef: React.RefObject<IModalRef | null>;
    values: TpendaftaranAsistenLab | null;
}

export default function DialogEdit(props: IDialogEditProps) {
    const { params } = useQueryBuilder();

    const onClose = () => {
        props.dialogRef.current?.close();
        form.reset();
    };

    const updateFn = useMutation({
        ...service.asistenLab.update(props.values?.id ?? "", params),
        meta: {
            invalidatesQuery: [props.values?.id ?? "", "asisten-lab", params],
        },
    });

    const form = useForm<TRequestAssistenLab>({
        resolver: zodResolver(schema.request),
        defaultValues: {
            mahasiswaId: props.values?.mahasiswaId ?? "",
            jadwalId: props.values?.jadwalId ?? "",
            nilaiTeori: props.values?.nilaiTeori ?? "",
            nilaiPraktikum: props.values?.nilaiPraktikum ?? "",
            nilaiAkhir: props.values?.nilaiAkhir ?? "",
        },
        values: {
            mahasiswaId: props.values?.mahasiswaId ?? "",
            jadwalId: props.values?.jadwalId ?? "",
            nilaiTeori: props.values?.nilaiTeori ?? "",
            nilaiPraktikum: props.values?.nilaiPraktikum ?? "",
            nilaiAkhir: props.values?.nilaiAkhir ?? "",
        },
        resetOptions: {
            keepDirty: true,
        },
    });

    const onSubmit = form.handleSubmit((data) => {
        updateFn.mutate(data, {
            onSuccess: () => onClose(),
            onError: (err) => {
                toast.error(err.message);
            },
        });
    });

    return (
        <Modal ref={props.dialogRef} title="Edit Pendaftaran Asisten Lab">
            <Form {...form}>
                <form className="space-y-4" onSubmit={onSubmit}>
                    <FormSection />

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
