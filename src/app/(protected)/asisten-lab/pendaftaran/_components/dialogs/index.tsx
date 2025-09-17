import { Fragment, useImperativeHandle, useRef } from "react";
import { IModalRef } from "@/components/shared/modal";

import DialogAdd from "./add";
import DialogEdit from "./edit";
import { TpendaftaranAsistenLab } from "@/types/data";

export interface IDialogsRef {
    openDialogAdd: () => void;
    openDialogEdit: (v: TpendaftaranAsistenLab | null) => void;
}

export interface IDialogsProps {
    ref?: React.Ref<IDialogsRef>;
    values: TpendaftaranAsistenLab | null;
    setValues: (values: TpendaftaranAsistenLab | null) => void;
}

const DialogPendaftaran = (props: IDialogsProps) => {
    const dialogAddRef = useRef<IModalRef>(null);
    const dialogEditRef = useRef<IModalRef>(null);

    useImperativeHandle(props.ref, () => ({
        openDialogAdd: () => dialogAddRef.current?.open(),
        openDialogEdit: (values: TpendaftaranAsistenLab | null) => {
            dialogEditRef.current?.open();
            props.setValues(values);
        },
    }));

    return (
        <Fragment>
            <DialogAdd
                dialogRef={dialogAddRef}
                jadwalId={props.values?.jadwalId ?? ""}
            />

            <DialogEdit dialogRef={dialogEditRef} values={props.values} />
        </Fragment>
    );
};

export default DialogPendaftaran;
