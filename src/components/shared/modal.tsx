"use client";

import { forwardRef, useImperativeHandle, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";

interface IModalProps {
    title: string;
    children: React.ReactNode;
    contentClassName?: string;
    onClose?: () => void;
}

export interface IModalRef {
    open: () => void;
    close: () => void;
    isOpen: boolean;
}

const Modal = forwardRef<IModalRef, IModalProps>((props, ref) => {
    const [show, setShow] = useState(false);

    useImperativeHandle(ref, () => ({
        open: () => setShow(true),
        close: () => setShow(false),
        isOpen: show,
    }));

    const handleOpenChange = (open: boolean) => {
        setShow(open);
        if (!open && props.onClose) {
            props.onClose();
        }
    };

    return (
        <Dialog open={show} onOpenChange={handleOpenChange}>
            <DialogContent
                className={cn("w-full max-w-3xl", props.contentClassName)}
            >
                <DialogHeader>
                    <DialogTitle id={props.title ?? "title"}>
                        {props.title}
                    </DialogTitle>
                </DialogHeader>
                <Separator />
                {props.children}
            </DialogContent>
        </Dialog>
    );
});

Modal.displayName = "Modal";

export default Modal;
