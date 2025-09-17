import type { ColumnDef } from "@tanstack/react-table";
import { TJadwalMahasiswa } from "@/types/data";
import { Checkbox } from "@/components/ui/checkbox";

interface ICreateColumnsProps {
    currentPage?: number;
    pageSize?: number;
}

type CustomColumnDef<TData, TValue> = ColumnDef<TData, TValue> & {
    isCenter?: boolean;
};

type ColumnType = TJadwalMahasiswa;

export const createColumns = ({
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
            return <div>{row.original.mahasiswa.nama ?? "-"}</div>;
        },
    },
    {
        accessorKey: "npm",
        header: "npm",
        cell: ({ row }) => {
            return <div>{row.original.mahasiswa.npm ?? "-"}</div>;
        },
        isCenter: true,
    },
    ...Array.from({ length: 12 }, (_, i) => ({
        accessorKey: `pertemuan${i + 1}`,
        header: `Pertemuan ${i + 1}`,
        cell: () => {
            return (
                <div className="flex items-center gap-2">
                    <Checkbox />
                </div>
            );
        },
        isCenter: true,
    })),
    {
        accessorKey: "totalKehadiaran",
        header: "Total Kehadiran",
        cell: () => {
            return <div>{"-"}</div>;
        },
        isCenter: true,
    },
];
