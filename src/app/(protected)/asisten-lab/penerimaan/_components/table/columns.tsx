import type { ColumnDef } from "@tanstack/react-table";
import { TAccess, TpendaftaranAsistenLab } from "@/types/data";
import { Button } from "@/components/ui/button";

interface ICreateColumnsProps {
    access: TAccess["actions"] | undefined | null;
    onAcceptance: (id: string) => void;
    onDelete: (id: string) => void;
    currentPage?: number;
    pageSize?: number;
}

type CustomColumnDef<TData, TValue> = ColumnDef<TData, TValue> & {
    isCenter?: boolean;
};

type ColumnType = TpendaftaranAsistenLab;

export const createColumns = ({
    access,
    onAcceptance,
    onDelete,
    currentPage = 1,
    pageSize = 10,
}: ICreateColumnsProps): Array<CustomColumnDef<ColumnType, unknown>> => [
    {
        id: "id",
        header: "No",
        isCenter: true,
        size: 50,
        cell: ({ row }) => {
            const globalIndex = (currentPage - 1) * pageSize + row.index + 1;
            return <div className="text-center">{globalIndex}</div>;
        },
    },
    {
        accessorKey: "nama",
        header: "Nama",
        cell: ({ row }) => {
            return (
                <div>
                    {row.original.mahasiswaId ?? "-"} -{" "}
                    {/* {row.original.mahasiswa.nama ?? "-"} -{" "}
                    {row.original.mahasiswa.npm ?? "-"} */}
                </div>
            );
        },
        isCenter: true,
    },
    // {
    //     accessorKey: "matakuliah.nama",
    //     header: "Matakuliah",
    //     cell: ({ row }) => {
    //         return (
    //             <div>
    //                 {row.original.matakuliah.kode ?? "-"} -{" "}
    //                 {row.original.matakuliah.nama ?? "-"}
    //             </div>
    //         );
    //     },
    // },
    // {
    //     accessorKey: "kelas",
    //     header: "Kelas",
    //     isCenter: true,
    //     cell: ({ row }) => {
    //         return <div>{row.original.jadwal.kelas ?? "-"}</div>;
    //     },
    // },
    // {
    //     accessorKey: "shift",
    //     header: "Waktu",
    //     cell: ({ row }) => {
    //         return (
    //             <div>
    //                 {row.original.jadwal.shift.startTime ?? "-"} -{" "}
    //                 {row.original.jadwal.shift.endTime ?? "-"}
    //             </div>
    //         );
    //     },
    //     isCenter: true,
    // },
    // {
    //     accessorKey: "jadwal.ruangan.nama",
    //     header: "Ruangan",
    //     cell: ({ row }) => {
    //         return <div>{row.original.jadwal.ruangan.nama ?? "-"}</div>;
    //     },
    //     isCenter: true,
    // },
    {
        id: "actions",
        header: "Aksi",
        isCenter: true,
        cell: ({ row }) => {
            const isDisabled = row.original.status !== "PENDING";

            return (
                access?.ACCEPTED && (
                    <div className="flex items-center justify-center gap-2">
                        <Button
                            size={"sm"}
                            variant={"destructive"}
                            onClick={() => onDelete(row.original.id)}
                            disabled={isDisabled}
                        >
                            Tolak
                        </Button>

                        <Button
                            size={"sm"}
                            variant={"default"}
                            onClick={() => onAcceptance(row.original.id)}
                            disabled={isDisabled}
                        >
                            Terima
                        </Button>
                    </div>
                )
            );
        },
        size: 50,
    },
];
