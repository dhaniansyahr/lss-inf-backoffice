import { Fragment, useImperativeHandle, useRef, useState } from "react";
import { IModalRef } from "@/components/shared/modal";
import { service } from "@/services";

import DialogAdd from "./add";
import DialogEdit from "./edit";
import DialogOptionsCreate from "@/components/shared/options-create-dialog";
import DialogConfirmation from "@/components/shared/confirmation-dialog";
import { useMutation } from "@tanstack/react-query";
import { useQueryBuilder } from "@/hooks/use-query-builder";

export interface IDialogsRef {
    openDialogAdd: () => void;
    openDialogEdit: (id: string) => void;
    openDialogOptionsCreate: () => void;
    openDialogDelete: (id: string) => void;
}

export interface IDialogsProps {
    ref?: React.Ref<IDialogsRef>;
}

const DialogDosen = (props: IDialogsProps) => {
    const { params } = useQueryBuilder();
    const [id, setId] = useState<string>("");

    const dialogAddRef = useRef<IModalRef>(null);
    const dialogEditRef = useRef<IModalRef>(null);
    const dialogOptionsCreateRef = useRef<IModalRef>(null);
    const dialogDeleteRef = useRef<IModalRef>(null);

    useImperativeHandle(props.ref, () => ({
        openDialogAdd: () => dialogOptionsCreateRef.current?.open(),
        openDialogEdit: (id: string) => {
            dialogEditRef.current?.open();
            setId(id);
        },
        openDialogOptionsCreate: () => dialogOptionsCreateRef.current?.open(),
        openDialogDelete: () => {
            dialogDeleteRef.current?.open();
            setId(id);
        },
    }));

    const deleteFn = useMutation({
        ...service.dosen.remove(),
        meta: {
            invalidatesQuery: ["dosen", params],
        },
    });

    const onDelete = async () => {
        deleteFn.mutate(id, {
            onSuccess: () => {
                dialogDeleteRef.current?.close();
            },
        });
    };

    const bulkUploadFn = useMutation(service.dosen.bulkUpload());

    const onBulkUpload = () => {
        const inputElement = document.createElement("input");
        inputElement.type = "file";
        inputElement.accept = ".xlsx, .xls";
        inputElement.onchange = (event) => {
            const file = (event.target as HTMLInputElement).files?.[0];
            if (file) {
                bulkUploadFn.mutate(
                    { file: file },
                    {
                        onSuccess: () => {
                            dialogOptionsCreateRef.current?.close();
                        },
                    }
                );
            }
        };
        inputElement.click();
    };

    return (
        <Fragment>
            <DialogOptionsCreate
                dialogRef={dialogOptionsCreateRef}
                templateLink="/app/template/dosen.xlsx"
                feature="Dosen"
                onManual={() => {
                    dialogAddRef.current?.open();
                    dialogOptionsCreateRef.current?.close();
                }}
                onBulkUpload={() => onBulkUpload()}
                isBulkUpload={bulkUploadFn.isPending}
            />
            <DialogAdd dialogRef={dialogAddRef} />
            <DialogEdit dialogRef={dialogEditRef} id={id} />
            <DialogConfirmation
                dialogRef={dialogDeleteRef}
                onDelete={onDelete}
                isLoading={deleteFn.isPending}
            />
        </Fragment>
    );
};

export default DialogDosen;
