import type { ColumnDef } from "@tanstack/react-table";
import { TJadwalMahasiswa } from "@/types/data";

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
        accessorKey: "mahasiswa.nama",
        header: "Nama",
        cell: ({ row }) => {
            return <div>{row.original.mahasiswa.nama ?? "-"}</div>;
        },
    },
    {
        accessorKey: "mahasiswa.npm",
        header: "NPM",
        cell: ({ row }) => {
            return <div>{row.original.mahasiswa.npm ?? "-"}</div>;
        },
        isCenter: true,
    },
    {
        accessorKey: "mahasiswa.semester",
        header: "Semester",
        cell: ({ row }) => {
            return <div>{row.original.mahasiswa.semester ?? "-"}</div>;
        },
        isCenter: true,
    },
];
