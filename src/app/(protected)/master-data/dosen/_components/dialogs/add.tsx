import Modal, { IModalRef } from "@/components/shared/modal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import FormShift from "../form";
import { service } from "@/services";
import { ruanganToValues } from "@/services/master-data/ruangan/dto";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TDosenRequest, schema } from "@/services/master-data/dosen/type";
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

    const form = useForm<TDosenRequest>({
        defaultValues: ruanganToValues(null),
        resolver: zodResolver(schema),
    });

    const createFn = useMutation(service.dosen.create());

    const onSubmit = form.handleSubmit((data) => {
        createFn.mutate(data, {
            onSuccess: (res) => {
                toast.success(res.message);
                queryClient.refetchQueries({
                    queryKey: ["dosen"],
                });
                onClose();
            },
            onError: (err) => {
                toast.error(err.message);
            },
        });
    });

    return (
        <Modal ref={props.dialogRef} title="Tambah Data Dosen Baru">
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
