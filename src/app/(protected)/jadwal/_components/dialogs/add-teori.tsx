import Modal, { IModalRef } from "@/components/shared/modal";
import { Button } from "@/components/ui/button";
import { service } from "@/services";
import { useMutation } from "@tanstack/react-query";
import { useRef, useState } from "react";
import Link from "next/link";

interface IDialogAddTeoriProps {
    dialogRef: React.RefObject<IModalRef | null>;
}

const TEMPLATE_LINK = "https://data.usk.ac.id/pengajar-prodi";

export default function DialogAddTeori(props: IDialogAddTeoriProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<File | null>(null);

    const onClose = () => {
        props.dialogRef.current?.close();
    };

    const createFn = useMutation(service.jadwal.bulkUpload());

    const onSubmit = () => {
        createFn.mutate(
            { file: file! },
            {
                onSuccess: () => onClose(),
            }
        );
    };

    return (
        <Modal ref={props.dialogRef} title="Bulk Upload Jadwal Teori">
            <form
                className="space-y-4"
                onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit();
                }}
            >
                <div className="space-y-4">
                    <div className="p-4 border border-gray-200 rounded-md bg-gray-200">
                        <h1>{file?.name ?? "Silahkan masukkan file excel"}</h1>
                        <input
                            ref={fileInputRef}
                            hidden
                            type="file"
                            accept=".xlsx,.xls"
                            onChange={(e) => {
                                const file = e.target.files?.[0];

                                if (file) {
                                    setFile(file);
                                }
                            }}
                        />
                    </div>

                    <Button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full"
                    >
                        Pilih File
                    </Button>

                    <Link
                        href={"/app/template/jadwal-teori.xlsx"}
                        download={"jadwal-teori.xlsx"}
                        target="_blank"
                    >
                        Template Excel dapat anda dapatkan melalui{" "}
                        <span className="text-blue-500">link ini.</span>
                    </Link>
                    <Link href={TEMPLATE_LINK} target="_blank">
                        Data Jadwal teori dapat anda akses melalui
                        <span className="text-blue-500">link ini.</span>
                    </Link>
                </div>

                <div className="flex items-center gap-2 justify-end">
                    <Button
                        variant={"outline"}
                        type="button"
                        onClick={onClose}
                        disabled={createFn.isPending}
                    >
                        Batal
                    </Button>
                    <Button
                        type="submit"
                        disabled={createFn.isPending}
                        loading={createFn.isPending}
                    >
                        Simpan
                    </Button>
                </div>
            </form>
        </Modal>
    );
}
