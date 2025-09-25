import Modal, { IModalRef } from "@/components/shared/modal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { service } from "@/services";
import { Skeleton } from "@/components/ui/skeleton";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import FormSection from "../form";
import { TJadwalRequest, schema } from "@/services/jadwal/type";
import { jadwalToValues } from "@/services/jadwal/dto";
import { toast } from "sonner";
import DialogOverride from "./override";
import { useRef, useState } from "react";
import { TErrorOverride } from "@/types/data";

interface IDialogEditProps {
    dialogRef: React.RefObject<IModalRef | null>;
    id: string;
}

export default function DialogEdit(props: IDialogEditProps) {
    const queryClient = useQueryClient();

    const dialogOverrideRef = useRef<IModalRef>(null);
    const [errorStatus, setErrorStatus] = useState<TErrorOverride[]>([]);

    const { data, isLoading } = useQuery({
        ...service.jadwal.getOne(props.id),
        enabled: !!props.id,
    });

    const onClose = () => {
        props.dialogRef.current?.close();
        form.reset();
        setErrorStatus([]);
    };

    const updateFn = useMutation(service.jadwal.update(props.id));

    const form = useForm<TJadwalRequest>({
        resolver: zodResolver(schema.jadwal),
        defaultValues: jadwalToValues(data?.content ?? null),
        values: jadwalToValues(data?.content ?? null),
        resetOptions: {
            keepDirty: true,
        },
    });

    const onSubmit = (data: TJadwalRequest, isOverride: boolean = false) => {
        const requestBody = {
            ...data,
            isOverride: isOverride,
        };

        updateFn.mutate(requestBody, {
            onSuccess: (res) => {
                queryClient.refetchQueries({
                    queryKey: ["jadwal"],
                });
                toast.success(res.message);
                onClose();
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
            <Modal ref={props.dialogRef} title="Edit Jadwal">
                <Form {...form}>
                    <form
                        className="space-y-4"
                        onSubmit={(e) => {
                            e.preventDefault();

                            form.handleSubmit((value) => onSubmit(value))();
                        }}
                    >
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
