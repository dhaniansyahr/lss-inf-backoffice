import { Fragment, useImperativeHandle, useRef, useState } from "react";
import { IModalRef } from "@/components/shared/modal";
import { service } from "@/services";

import DialogAdd from "./add";
import DialogEdit from "./edit";
import DialogConfirmation from "@/components/shared/confirmation-dialog";
import { useMutation, useQuery } from "@tanstack/react-query";
import DialogOptionsCreate from "./create-options";
import DialogAddTeori from "./add-teori";
import { queryClientInstance } from "@/lib/query-client";

export interface IDialogsRef {
    openDialogAdd: () => void;
    openDialogEdit: (id: string) => void;
    openDialogOptionsCreate: () => void;
    openDialogDelete: (id: string) => void;
}

export interface IDialogsProps {
    ref?: React.Ref<IDialogsRef>;
}

const DialogJadwal = (props: IDialogsProps) => {
    const [id, setId] = useState<string>("");
    const [isOptionsDialogOpen, setIsOptionsDialogOpen] =
        useState<boolean>(false);

    const dialogAddRef = useRef<IModalRef>(null);
    const dialogTeoriRef = useRef<IModalRef>(null);
    const dialogEditRef = useRef<IModalRef>(null);
    const dialogOptionsCreateRef = useRef<IModalRef>(null);
    const dialogDeleteRef = useRef<IModalRef>(null);

    useImperativeHandle(props.ref, () => ({
        openDialogAdd: () => dialogOptionsCreateRef.current?.open(),
        openDialogEdit: (id: string) => {
            dialogEditRef.current?.open();
            setId(id);
        },
        openDialogOptionsCreate: () => {
            dialogOptionsCreateRef.current?.open();
            setIsOptionsDialogOpen(true);
        },
        openDialogDelete: () => {
            dialogDeleteRef.current?.open();
            setId(id);
        },
    }));

    const deleteFn = useMutation(service.jadwal.remove());

    const onDelete = async () => {
        deleteFn.mutate(id, {
            onSuccess: () => {
                dialogDeleteRef.current?.close();
            },
        });
    };

    const generateFn = useMutation({
        ...service.jadwal.generate(),
        meta: {
            invalidatesQuery: ["jadwal"],
        },
    });

    const checkFn = useMutation(service.jadwal.check());

    const onCheck = () => {
        checkFn.mutate(undefined, {
            onSuccess: (data) => {
                if (data.content) {
                    onGenerate();
                } else {
                    dialogTeoriRef.current?.open();
                }
            },
        });
    };

    const onGenerate = () => {
        generateFn.mutate(undefined, {
            onSuccess: () => {
                dialogOptionsCreateRef.current?.close();
                setIsOptionsDialogOpen(false);
            },
        });
    };

    return (
        <Fragment>
            <DialogOptionsCreate
                dialogRef={dialogOptionsCreateRef}
                onManual={() => {
                    dialogAddRef.current?.open();
                    dialogOptionsCreateRef.current?.close();
                    setIsOptionsDialogOpen(false);
                }}
                onGenerate={() => {
                    onCheck();
                }}
                onClose={() => {
                    setIsOptionsDialogOpen(false);
                }}
                isGenerate={generateFn.isPending || checkFn.isPending}
            />

            <DialogAddTeori dialogRef={dialogTeoriRef} />

            <DialogAdd dialogRef={dialogAddRef} />

            <DialogEdit dialogRef={dialogEditRef} id={id} />

            <DialogConfirmation
                dialogRef={dialogDeleteRef}
                onDelete={onDelete}
            />
        </Fragment>
    );
};

export default DialogJadwal;
