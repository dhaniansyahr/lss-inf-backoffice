import Modal, { IModalRef } from "@/components/shared/modal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import FormShift from "../form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { service } from "@/services";
import { Skeleton } from "@/components/ui/skeleton";
import {
    TUpdateUserRequest,
    updateSchema,
} from "@/services/pengguna/users/type";

interface IDialogEditProps {
    dialogRef: React.RefObject<IModalRef | null>;
    id: string;
}

export default function DialogEdit(props: IDialogEditProps) {
    const { data, isLoading } = useQuery({
        ...service.users.getOne(props.id),
        enabled: !!props.id,
    });

    const onClose = () => {
        props.dialogRef.current?.close();
        form.reset();
    };

    const updateFn = useMutation({
        ...service.users.update(props.id),
        meta: {
            messages: {
                success: "Berhasil Memperbarui Pengguna!",
                error: "Gagal Memperbarui Pengguna!",
            },
            invalidatesQuery: [props.id, "users"],
            onDialogClose: onClose,
        },
    });

    const form = useForm<TUpdateUserRequest>({
        resolver: zodResolver(updateSchema),
        defaultValues: {
            fullName: data?.content?.fullName ?? "",
            email: data?.content?.email ?? "",
            userLevelId: data?.content?.userLevelId ?? "",
        },
        values: {
            fullName: data?.content?.fullName ?? "",
            email: data?.content?.email ?? "",
            userLevelId: data?.content?.userLevelId ?? "",
        },
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
        <Modal ref={props.dialogRef} title="Edit Shift">
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
                        <Button type="submit" disabled={updateFn.isPending}>
                            {updateFn.isPending ? "Memuat..." : "Simpan"}
                        </Button>
                    </div>
                </form>
            </Form>
        </Modal>
    );
}
