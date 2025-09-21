import type { ColumnDef } from "@tanstack/react-table";
import { TAccess, TJadwal } from "@/types/data";
import { Button } from "@/components/ui/button";

interface ICreateColumnsProps {
    access: TAccess["actions"] | undefined | null;
    onRequest: (id: string) => void;
    currentPage?: number;
    pageSize?: number;
}

type CustomColumnDef<TData, TValue> = ColumnDef<TData, TValue> & {
    isCenter?: boolean;
};

type ColumnType = TJadwal;

export const createColumns = ({
    access,
    onRequest,
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
        accessorKey: "matakuliah.nama",
        header: "Nama",
        cell: ({ row }) => {
            return <div>{row.original.matakuliah.nama ?? "-"}</div>;
        },
    },
    {
        accessorKey: "matakuliah.kode",
        header: "Kode",
        cell: ({ row }) => {
            return <div>{row.original.matakuliah.kode ?? "-"}</div>;
        },
        isCenter: true,
    },
    {
        accessorKey: "hari",
        header: "Hari",
        cell: ({ row }) => {
            return <div>{row.original.hari ?? "-"}</div>;
        },
        isCenter: true,
    },
    {
        accessorKey: "kelas",
        header: "Kelas",
        isCenter: true,
    },
    {
        accessorKey: "shift",
        header: "Waktu",
        cell: ({ row }) => {
            return (
                <div>
                    {row.original.shift.startTime ?? "-"} -{" "}
                    {row.original.shift.endTime ?? "-"}
                </div>
            );
        },
        isCenter: true,
    },
    {
        accessorKey: "ruangan",
        header: "Ruangan",
        cell: ({ row }) => {
            return <div>{row.original.ruangan.nama ?? "-"}</div>;
        },
        isCenter: true,
    },
    {
        accessorKey: "dosen",
        header: "Dosen Pengampu",
        cell: ({ row }) => {
            return (
                <div>
                    <ul className="list-disc list-inside">
                        {row.original.jadwalDosen.map((dosen) => (
                            <li key={dosen.id}>
                                {dosen.dosen.nama} ({dosen.dosen.nip})
                            </li>
                        ))}
                    </ul>
                </div>
            );
        },
    },

    {
        id: "actions",
        header: "Aksi",
        isCenter: true,
        cell: ({ row }) => {
            return (
                access?.CREATE && (
                    <Button
                        size={"sm"}
                        onClick={() => onRequest(row.original.id)}
                    >
                        Daftar
                    </Button>
                )
            );
        },
        minSize: 150,
    },
];
