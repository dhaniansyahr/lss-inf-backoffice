import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "../ui/button";
import Modal, { IModalRef } from "./modal";

interface IDialogConfirmationProps {
    dialogRef: React.RefObject<IModalRef | null>;
    onDelete: () => Promise<void>;
    isLoading?: boolean;
}

export default function DialogConfirmation(props: IDialogConfirmationProps) {
    const onClose = () => props.dialogRef.current?.close();

    return (
        <Modal ref={props.dialogRef} title="" contentClassName="max-w-md">
            <div className="space-y-6">
                <div className="flex items-center gap-2 justify-center flex-col">
                    <Icon
                        icon="famicons:warning"
                        className="text-yellow-500"
                        width={60}
                    />
                    <h1 className="font-bold text-xl text-center">
                        Apakah Anda yakin ingin menghapus data ini?
                    </h1>

                    <p className="text-sm text-center">
                        Data yang dihapus tidak dapat dikembalikan.
                    </p>
                </div>

                <div className="flex items-center justify-end gap-2">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        disabled={props.isLoading}
                    >
                        Batal
                    </Button>

                    <Button
                        variant="default"
                        onClick={props.onDelete}
                        loading={props.isLoading}
                        disabled={props.isLoading}
                    >
                        Hapus
                    </Button>
                </div>
            </div>
        </Modal>
    );
}
