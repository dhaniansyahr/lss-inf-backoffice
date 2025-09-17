import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "../ui/button";
import Modal, { IModalRef } from "./modal";
import Link from "next/link";

interface IDialogOptionsCreateProps {
    dialogRef: React.RefObject<IModalRef | null>;
    feature: string;
    templateLink: string;
    onManual: () => void;
    onBulkUpload: () => void;
    isBulkUpload?: boolean;
}

const getFileName = (feature: string) => {
    const formattedFeature = feature.toLowerCase().replace(/ /g, "_");

    return `${formattedFeature}-template.xlsx`;
};

export default function DialogOptionsCreate(props: IDialogOptionsCreateProps) {
    return (
        <Modal ref={props.dialogRef} title="" contentClassName="max-w-md">
            <div className="space-y-4">
                <div className="flex flex-col items-center gap-2">
                    <h1 className="font-bold text-xl text-center">
                        Pilih cara untuk membuat data {props.feature}
                    </h1>

                    <Link
                        href={props.templateLink}
                        download={getFileName(props.feature)}
                        target="_blank"
                        className="text-blue-500 underline"
                    >
                        Download template bulk upload {props.feature}
                    </Link>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <Button
                        variant="outline"
                        onClick={props.onManual}
                        disabled={props.isBulkUpload}
                    >
                        <Icon icon="streamline:manual-book" />
                        Manual
                    </Button>

                    <Button
                        variant="default"
                        onClick={props.onBulkUpload}
                        loading={props.isBulkUpload}
                        disabled={props.isBulkUpload}
                    >
                        <Icon icon="mdi:file-upload" />
                        Bulk Upload
                    </Button>
                </div>
            </div>
        </Modal>
    );
}
