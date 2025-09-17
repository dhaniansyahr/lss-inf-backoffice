import type { ColumnDef } from "@tanstack/react-table";
import {
    DropdownMenuGroup,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@iconify/react/dist/iconify.js";
import ActionMenu from "@/components/shared/action-menu";
import { TpendaftaranAsistenLab } from "@/types/data";

interface ICreateColumnsProps {
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
    currentPage?: number;
    pageSize?: number;
}

type CustomColumnDef<TData, TValue> = ColumnDef<TData, TValue> & {
    isCenter?: boolean;
};

type ColumnType = TpendaftaranAsistenLab;

export const createColumns = ({
    onEdit,
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
                    {row.original.mahasiswa.nama ?? "-"} -{" "}
                    {row.original.mahasiswa.npm ?? "-"}
                </div>
            );
        },
        isCenter: true,
    },
    {
        accessorKey: "matakuliah.nama",
        header: "Matakuliah",
        cell: ({ row }) => {
            return (
                <div>
                    {row.original.matakuliah.kode ?? "-"} -{" "}
                    {row.original.matakuliah.nama ?? "-"}
                </div>
            );
        },
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
        accessorKey: "shift",
        header: "Waktu",
        cell: ({ row }) => {
            return (
                <div>
                    {row.original.jadwal.shift.startTime ?? "-"} -{" "}
                    {row.original.jadwal.shift.endTime ?? "-"}
                </div>
            );
        },
        isCenter: true,
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
                <ActionMenu>
                    <DropdownMenuGroup className="flex flex-col gap-2">
                        <DropdownMenuItem
                            className="inline-flex items-center gap-2"
                            onClick={() => onDelete(row.original.id)}
                        >
                            <Icon icon="ph:eye" />
                            <span>Detail</span>
                        </DropdownMenuItem>

                        <DropdownMenuItem
                            className="inline-flex items-center gap-2"
                            onClick={() => onEdit(row.original.id)}
                        >
                            <Icon icon="mdi:pencil" />
                            <span>Edit</span>
                        </DropdownMenuItem>

                        <DropdownMenuItem
                            className="inline-flex items-center gap-2"
                            onClick={() => onDelete(row.original.id)}
                        >
                            <Icon icon="mdi:file-document-outline" />
                            <span>Absensi</span>
                        </DropdownMenuItem>

                        <DropdownMenuItem
                            className="inline-flex items-center gap-2"
                            onClick={() => onDelete(row.original.id)}
                        >
                            <Icon icon="mdi:calendar-outline" />
                            <span>Edit Pertemuan</span>
                        </DropdownMenuItem>

                        <DropdownMenuItem
                            className="inline-flex items-center gap-2 text-red-500"
                            onClick={() => onDelete(row.original.id)}
                        >
                            <Icon icon="mdi:trash" />
                            <span>Hapus</span>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </ActionMenu>
            );
        },
        size: 50,
    },
];
