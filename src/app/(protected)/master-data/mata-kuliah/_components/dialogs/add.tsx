import Modal, { IModalRef } from "@/components/shared/modal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { service } from "@/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import FormSection from "../form";
import {
    schema,
    TMatakuliahRequest,
} from "@/services/master-data/matakuliah/type";
import { matakuliahToValues } from "@/services/master-data/matakuliah/dto";
import { toast } from "sonner";

interface IDialogAddProps {
    dialogRef: React.RefObject<IModalRef | null>;
}

export default function DialogAdd(props: IDialogAddProps) {
    const queryClient = useQueryClient();

    const onClose = () => {
        props.dialogRef.current?.close();
        form.reset();
    };

    const form = useForm<TMatakuliahRequest>({
        defaultValues: matakuliahToValues(null),
        resolver: zodResolver(schema),
    });

    const createFn = useMutation(service.matakuliah.create());

    const onSubmit = form.handleSubmit((data) => {
        const body = Object.assign({}, data, {
            semester: Number(data.semester),
        });

        createFn.mutate(body, {
            onSuccess: (res) => {
                toast.success(res.message);
                queryClient.refetchQueries({
                    queryKey: ["matakuliah"],
                });
                onClose();
            },
            onError: (err) => {
                toast.error(err.message);
            },
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
