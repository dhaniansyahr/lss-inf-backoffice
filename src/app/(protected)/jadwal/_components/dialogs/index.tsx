import { Fragment, useImperativeHandle, useRef, useState } from "react";
import { IModalRef } from "@/components/shared/modal";
import { service } from "@/services";

import DialogAdd from "./add";
import DialogEdit from "./edit";
import DialogConfirmation from "@/components/shared/confirmation-dialog";
import { useMutation } from "@tanstack/react-query";
import DialogOptionsCreate from "./create-options";
import DialogAssignOptions from "@/components/shared/options-create-dialog";
import DialogAddTeori from "./add-teori";
import DialogEditPertemuan from "./edit-pertemuan";
import DialogManualAssignPraktikan from "./assing-praktikan";
import { toast } from "sonner";

export interface IDialogsRef {
    openDialogAdd: () => void;
    openDialogAssingMhs: (id: string) => void;
    openDialogEdit: (id: string) => void;
    openDialogOptionsCreate: () => void;
    openDialogDelete: (id: string) => void;
    openDialogEditPertemuan: (id: string) => void;
}

export interface IDialogsProps {
    ref?: React.Ref<IDialogsRef>;
}

const DialogJadwal = (props: IDialogsProps) => {
    const [id, setId] = useState<string>("");

    const dialogAddRef = useRef<IModalRef>(null);
    const dialogTeoriRef = useRef<IModalRef>(null);
    const dialogEditRef = useRef<IModalRef>(null);
    const dialogOptionsCreateRef = useRef<IModalRef>(null);
    const dialogDeleteRef = useRef<IModalRef>(null);
    const dialogEditPertemuanRef = useRef<IModalRef>(null);
    const dialogOptionAssignMhsnRef = useRef<IModalRef>(null);
    const dialogManualAssignMhsRef = useRef<IModalRef>(null);

    useImperativeHandle(props.ref, () => ({
        openDialogAdd: () => dialogOptionsCreateRef.current?.open(),
        openDialogAssingMhs: (id: string) => {
            dialogOptionAssignMhsnRef.current?.open();
            setId(id);
        },
        openDialogEdit: (id: string) => {
            dialogEditRef.current?.open();
            setId(id);
        },
        openDialogOptionsCreate: () => {
            dialogOptionsCreateRef.current?.open();
        },
        openDialogDelete: () => {
            dialogDeleteRef.current?.open();
            setId(id);
        },
        openDialogEditPertemuan: (id: string) => {
            dialogEditPertemuanRef.current?.open();
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
            },
        });
    };

    const onManualAssignMhs = () => {
        dialogOptionAssignMhsnRef.current?.close();
        dialogManualAssignMhsRef.current?.open();
    };

    const bulkAssignMhsFn = useMutation(service.jadwal.bulkAssignMhs());

    const onBulkAssignMhs = () => {
        const inputElement = document.createElement("input");
        inputElement.type = "file";
        inputElement.accept = ".xlsx, .xls";

        inputElement.onchange = (event) => {
            const file = (event.target as HTMLInputElement).files?.[0];
            if (file) {
                bulkAssignMhsFn.mutate(
                    { id, data: { file } },
                    {
                        onSuccess: (res) => {
                            toast.success(res.message);
                            dialogOptionAssignMhsnRef.current?.close();
                        },
                        onError: (error) => {
                            toast.error(error.message);
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
                onManual={() => {
                    dialogAddRef.current?.open();
                    dialogOptionsCreateRef.current?.close();
                }}
                onGenerate={() => {
                    onCheck();
                }}
                isGenerate={generateFn.isPending || checkFn.isPending}
            />

            <DialogAssignOptions
                dialogRef={dialogOptionAssignMhsnRef}
                templateLink="/app/template/mahasiswa.xlsx"
                feature="Assign Mahasiswa"
                onManual={onManualAssignMhs}
                onBulkUpload={onBulkAssignMhs}
                isBulkUpload={bulkAssignMhsFn.isPending}
            />

            <DialogManualAssignPraktikan
                dialogRef={dialogManualAssignMhsRef}
                id={id}
            />

            <DialogAddTeori dialogRef={dialogTeoriRef} />

            <DialogAdd dialogRef={dialogAddRef} />

            <DialogEdit dialogRef={dialogEditRef} id={id} />

            <DialogEditPertemuan dialogRef={dialogEditPertemuanRef} id={id} />

            <DialogConfirmation
                dialogRef={dialogDeleteRef}
                onDelete={onDelete}
            />
        </Fragment>
    );
};

export default DialogJadwal;
