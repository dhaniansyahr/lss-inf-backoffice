import Modal, { IModalRef } from "@/components/shared/modal";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";

interface IDialogOptionsCreateProps {
    dialogRef: React.RefObject<IModalRef | null>;
    onManual: () => void;
    onGenerate: () => void;
    onClose?: () => void;
    isGenerate?: boolean;
}

export default function DialogOptionsCreate(props: IDialogOptionsCreateProps) {
    return (
        <Modal
            ref={props.dialogRef}
            title=""
            contentClassName="max-w-md"
            onClose={props.onClose}
        >
            <div className="space-y-4">
                <div className="flex flex-col items-center gap-2">
                    <h1 className="font-bold text-xl text-center">
                        Pilih cara untuk membuat data jadwal
                    </h1>

                    {/* <Link
                        href={props.templateLink}
                        download
                        target="_blank"
                        className="text-blue-500 underline"
                    >
                        
                    </Link> */}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <Button
                        variant="outline"
                        onClick={props.onManual}
                        disabled={props.isGenerate}
                    >
                        <Icon icon="streamline:manual-book" />
                        Manual
                    </Button>

                    <Button
                        variant="default"
                        onClick={props.onGenerate}
                        disabled={props.isGenerate}
                        loading={props.isGenerate}
                    >
                        <Icon icon="oui:generate" />
                        Generate
                    </Button>
                </div>
            </div>
        </Modal>
    );
}
