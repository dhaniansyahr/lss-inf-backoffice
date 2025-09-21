import type { ColumnDef } from "@tanstack/react-table";
import { TAccess, TpendaftaranAsistenLab } from "@/types/data";
import { Button } from "@/components/ui/button";

interface ICreateColumnsProps {
    access: TAccess["actions"] | undefined | null;
    onUpdate: (v: TpendaftaranAsistenLab | null) => void;
    currentPage?: number;
    pageSize?: number;
}

type CustomColumnDef<TData, TValue> = ColumnDef<TData, TValue> & {
    isCenter?: boolean;
};

type ColumnType = TpendaftaranAsistenLab;

export const createColumnsRegistered = ({
    access,
    onUpdate,
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
            return <div>{row.original.jadwal.hari ?? "-"}</div>;
        },
        isCenter: true,
    },
    {
        accessorKey: "kelas",
        header: "Kelas",
        isCenter: true,
        cell: ({ row }) => {
            return <div>{row.original.jadwal.kelas ?? "-"}</div>;
        },
    },
    {
        accessorKey: "jadwal.ruangan.nama",
        header: "Ruangan",
        cell: ({ row }) => {
            return <div>{row.original.jadwal.ruangan.nama ?? "-"}</div>;
        },
        isCenter: true,
    },
    {
        id: "actions",
        header: "Aksi",
        isCenter: true,
        cell: ({ row }) => {
            return (
                access?.UPDATE && (
                    <Button size={"sm"} onClick={() => onUpdate(row.original)}>
                        Update
                    </Button>
                )
            );
        },
        minSize: 150,
    },
];
