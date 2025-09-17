import Modal, { IModalRef } from "@/components/shared/modal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import FormSection from "../form";
import { useMutation } from "@tanstack/react-query";
import { service } from "@/services";
import { TUserRequest, schema } from "@/services/pengguna/users/type";

interface IDialogAddProps {
    dialogRef: React.RefObject<IModalRef | null>;
}

export default function DialogAdd(props: IDialogAddProps) {
    const onClose = () => {
        props.dialogRef.current?.close();
        form.reset();
    };

    const createFn = useMutation({
        ...service.users.create(),
        meta: {
            messages: {
                success: "Berhasil Membuat Shift Baru!",
                error: "Gagal Membuat Shift Baru!",
            },
            invalidatesQuery: ["users"],
            onDialogClose: onClose,
        },
    });

    const form = useForm<TUserRequest>({
        defaultValues: {
            fullName: "",
            email: "",
            password: "",
            userLevelId: "",
        },
        resolver: zodResolver(schema),
    });

    const onSubmit = form.handleSubmit((data) => {
        createFn.mutate(data);
    });

    return (
        <Modal ref={props.dialogRef} title="Tambah Pengguna Baru">
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
                        <Button type="submit" disabled={createFn.isPending}>
                            {createFn.isPending ? "Memuat..." : "Simpan"}
                        </Button>
                    </div>
                </form>
            </Form>
        </Modal>
    );
}
