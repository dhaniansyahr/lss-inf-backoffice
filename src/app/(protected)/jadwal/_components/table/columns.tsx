import type { ColumnDef } from "@tanstack/react-table";
import {
    DropdownMenuGroup,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@iconify/react/dist/iconify.js";
import ActionMenu from "@/components/shared/action-menu";
import { TAccess, TJadwal } from "@/types/data";

interface ICreateColumnsProps {
    access: TAccess["actions"] | undefined | null;
    onDetail: (id: string) => void;
    onEdit: (id: string) => void;
    onAbsensi: (id: string) => void;
    onEditPertemuan: (id: string) => void;
    onAssignMhs: (id: string) => void;
    currentPage?: number;
    pageSize?: number;
}

type CustomColumnDef<TData, TValue> = ColumnDef<TData, TValue> & {
    isCenter?: boolean;
};

type ColumnType = TJadwal;

export const createColumns = ({
    access,
    onDetail,
    onAbsensi,
    onEditPertemuan,
    onEdit,
    onAssignMhs,
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
                <ActionMenu>
                    <DropdownMenuGroup className="flex flex-col gap-2">
                        {access?.VIEW && (
                            <DropdownMenuItem
                                className="inline-flex items-center gap-2"
                                onClick={() => onDetail(row.original.id)}
                            >
                                <Icon icon="ph:eye" />
                                <span>Detail</span>
                            </DropdownMenuItem>
                        )}

                        {access?.UPDATE && (
                            <DropdownMenuItem
                                className="inline-flex items-center gap-2"
                                onClick={() => onEdit(row.original.id)}
                            >
                                <Icon icon="mdi:pencil" />
                                <span>Edit</span>
                            </DropdownMenuItem>
                        )}

                        {access?.ABSENT && (
                            <DropdownMenuItem
                                className="inline-flex items-center gap-2"
                                onClick={() => onAbsensi(row.original.id)}
                            >
                                <Icon icon="mdi:file-document-outline" />
                                <span>Absensi</span>
                            </DropdownMenuItem>
                        )}

                        {access?.UPDATE_MEETING && (
                            <DropdownMenuItem
                                className="inline-flex items-center gap-2"
                                onClick={() => onEditPertemuan(row.original.id)}
                            >
                                <Icon icon="mdi:calendar-outline" />
                                <span>Edit Pertemuan</span>
                            </DropdownMenuItem>
                        )}

                        {access?.ASSIGN_MAHASISWA && (
                            <DropdownMenuItem
                                className="inline-flex items-center gap-2"
                                onClick={() => onAssignMhs(row.original.id)}
                            >
                                <Icon icon="mdi:account-plus" />
                                <span>Assign Praktikan</span>
                            </DropdownMenuItem>
                        )}

                        {access?.ASSIGN_ASISTEN_LAB && (
                            <DropdownMenuItem
                                className="inline-flex items-center gap-2"
                                onClick={() => onEditPertemuan(row.original.id)}
                            >
                                <Icon icon="mdi:account-multiple" />
                                <span>Assign Asisten</span>
                            </DropdownMenuItem>
                        )}
                    </DropdownMenuGroup>
                </ActionMenu>
            );
        },
        size: 50,
    },
];
