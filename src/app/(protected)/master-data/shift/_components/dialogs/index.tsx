import { Fragment, useImperativeHandle, useRef, useState } from "react";
import { IModalRef } from "@/components/shared/modal";
import { useMutation } from "@tanstack/react-query";
import { service } from "@/services";
import { useQueryBuilder } from "@/hooks/use-query-builder";

import DialogAdd from "./add";
import DialogEdit from "./edit";
import DialogConfirmation from "@/components/shared/confirmation-dialog";

export interface IDialogsRef {
    openDialogAdd: () => void;
    openDialogEdit: (id: string) => void;
    openDialogDelete: (id: string) => void;
}

export interface IDialogsProps {
    ref?: React.Ref<IDialogsRef>;
}

const DialogShift = (props: IDialogsProps) => {
    const { params } = useQueryBuilder();

    const [id, setId] = useState<string>("");

    const dialogAddRef = useRef<IModalRef>(null);
    const dialogEditRef = useRef<IModalRef>(null);
    const dialogDeleteRef = useRef<IModalRef>(null);

    useImperativeHandle(props.ref, () => ({
        openDialogAdd: () => dialogAddRef.current?.open(),
        openDialogEdit: (id: string) => {
            dialogEditRef.current?.open();
            setId(id);
        },
        openDialogDelete: () => {
            dialogDeleteRef.current?.open();
            setId(id);
        },
    }));

    const deleteFn = useMutation({
        ...service.shift.remove(),
        meta: {
            messages: {
                success: "Berhasil Menghapus Shift!",
                error: "Gagal Menghapus Shift!",
            },
            invalidatesQuery: ["shifts", params],
            onDialogClose: () => {
                dialogDeleteRef.current?.close();
            },
        },
    });

    const onDelete = async () => {
        await deleteFn.mutate(id);
    };

    return (
        <Fragment>
            <DialogAdd dialogRef={dialogAddRef} />
            <DialogEdit dialogRef={dialogEditRef} id={id} />
            <DialogConfirmation
                dialogRef={dialogDeleteRef}
                onDelete={onDelete}
            />
        </Fragment>
    );
};

export default DialogShift;
