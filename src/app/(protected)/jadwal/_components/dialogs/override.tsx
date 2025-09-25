import Modal, { IModalRef } from "@/components/shared/modal";
import { Button } from "@/components/ui/button";
import { TErrorOverride } from "@/types/data";

interface IDialogOverrideProps {
    dialogOverrideRef: React.RefObject<IModalRef | null>;
    onOverride: () => void;
    message: TErrorOverride[];
}

export default function DialogOverride(props: IDialogOverrideProps) {
    return (
        <Modal
            ref={props.dialogOverrideRef}
            title=""
            contentClassName="max-w-md"
        >
            <div className="space-y-4">
                <div className="flex flex-col items-center gap-2">
                    <h1 className="font-bold text-xl text-center">
                        Apakah Anda yakin ingin mengoverride data jadwal ini?
                    </h1>
                </div>

                {props.message.map((item) => (
                    <div className="p-2 rounded-md bg-destructive/20">
                        <p className="text-sm text-destructive">
                            {item.message}
                        </p>
                    </div>
                ))}

                <div className="grid grid-cols-2 gap-4">
                    <Button
                        type="button"
                        variant="default"
                        onClick={() => props.dialogOverrideRef.current?.close()}
                    >
                        Tidak
                    </Button>

                    <Button
                        type="button"
                        variant="destructive"
                        onClick={props.onOverride}
                    >
                        Iya
                    </Button>
                </div>
            </div>
        </Modal>
    );
}
