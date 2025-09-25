import Modal, { IModalRef } from "@/components/shared/modal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { service } from "@/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useQueryBuilder } from "@/hooks/use-query-builder";
import FormSection from "../form";
import { TJadwalRequest, schema } from "@/services/jadwal/type";
import { jadwalToValues } from "@/services/jadwal/dto";
import { toast } from "sonner";
import { useRef, useState } from "react";
import DialogOverride from "./override";
import { TErrorOverride } from "@/types/data";

interface IDialogAddProps {
    dialogRef: React.RefObject<IModalRef | null>;
}

export default function DialogAdd(props: IDialogAddProps) {
    const { params } = useQueryBuilder();
    const queryClient = useQueryClient();

    const dialogOverrideRef = useRef<IModalRef>(null);

    const [errorStatus, setErrorStatus] = useState<TErrorOverride[]>([]);

    const onClose = () => {
        props.dialogRef.current?.close();
        form.reset();
    };

    const form = useForm<TJadwalRequest>({
        defaultValues: jadwalToValues(null),
        resolver: zodResolver(schema.jadwal),
    });

    const createFn = useMutation(service.jadwal.create());

    const onSubmit = (value: TJadwalRequest, isOverride: boolean = false) => {
        const requestBody = {
            ...value,
            isOverride: isOverride,
        };

        createFn.mutate(requestBody, {
            onSuccess: (res) => {
                toast.success(res.message);
                onClose();
                queryClient.invalidateQueries({
                    queryKey: ["jadwal", params],
                });

                dialogOverrideRef.current?.close();
            },
            onError: (error: any) => {
                if (error?.status) {
                    dialogOverrideRef.current?.open();
                    setErrorStatus([...errorStatus, error]);
                } else {
                    toast.error(error.message);
                }
            },
        });
    };

    return (
        <>
            <Modal ref={props.dialogRef} title="Tambah Data Jadwal Baru">
                <Form {...form}>
                    <form
                        className="space-y-4"
                        onSubmit={(e) => {
                            e.preventDefault();

                            form.handleSubmit((value) => onSubmit(value))();
                        }}
                    >
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

            <DialogOverride
                dialogOverrideRef={dialogOverrideRef}
                onOverride={() =>
                    form.handleSubmit((value) => onSubmit(value, true))()
                }
                message={errorStatus}
            />
        </>
    );
}
