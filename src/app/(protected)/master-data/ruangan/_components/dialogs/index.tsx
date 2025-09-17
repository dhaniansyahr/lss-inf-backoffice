import { Fragment, useImperativeHandle, useRef, useState } from "react";
import { IModalRef } from "@/components/shared/modal";

import DialogAdd from "./add";
import DialogEdit from "./edit";
import DialogAssign from "./assign";

export interface IDialogsRef {
    openDialogAdd: () => void;
    openDialogEdit: (id: string) => void;
    openDialogAssign: (id: string) => void;
}

export interface IDialogsProps {
    ref?: React.Ref<IDialogsRef>;
}

const DialogRuangan = (props: IDialogsProps) => {
    const [id, setId] = useState<string>("");

    const dialogAddRef = useRef<IModalRef>(null);
    const dialogEditRef = useRef<IModalRef>(null);
    const dialogAssignRef = useRef<IModalRef>(null);

    useImperativeHandle(props.ref, () => ({
        openDialogAdd: () => dialogAddRef.current?.open(),
        openDialogEdit: (id: string) => {
            dialogEditRef.current?.open();
            setId(id);
        },
        openDialogAssign: (id: string) => {
            dialogAssignRef.current?.open();
            setId(id);
        },
    }));

    return (
        <Fragment>
            <DialogAdd dialogRef={dialogAddRef} />
            <DialogEdit dialogRef={dialogEditRef} id={id} />
            <DialogAssign dialogRef={dialogAssignRef} id={id} />
        </Fragment>
    );
};

export default DialogRuangan;
