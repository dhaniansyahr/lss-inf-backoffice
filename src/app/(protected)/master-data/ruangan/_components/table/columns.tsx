import type { ColumnDef } from "@tanstack/react-table";
import {
    DropdownMenuGroup,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@iconify/react/dist/iconify.js";
import ActionMenu from "@/components/shared/action-menu";
import { Switch } from "@/components/ui/switch";
import { TRuanganLaboratorium } from "@/types/data";

interface ICreateColumnsProps {
    onEdit: (id: string) => void;
    onActivate: (id: string, isActive: boolean) => void;
    onAssign: (id: string) => void;
    currentPage?: number;
    pageSize?: number;
}

type CustomColumnDef<TData, TValue> = ColumnDef<TData, TValue> & {
    isCenter?: boolean;
};

type ColumnType = TRuanganLaboratorium;

export const createColumns = ({
    onEdit,
    onActivate,
    onAssign,
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
    },
    {
        accessorKey: "lokasi",
        header: "Lokasi",
        isCenter: true,
    },
    {
        accessorKey: "namaKepalaLab",
        header: "Nama Kepala Lab",
        isCenter: true,
        cell: ({ row }) => {
            return (
                <div className="text-center">
                    {row.original.kepalaLab?.nama}
                </div>
            );
        },
    },
    {
        accessorKey: "nipKepalaLab",
        header: "NIP Kepala Lab",
        isCenter: true,
        cell: ({ row }) => {
            return (
                <div className="text-center">{row.original.kepalaLab?.nip}</div>
            );
        },
    },
    {
        accessorKey: "kapasitas",
        header: "Kapasitas",
        isCenter: true,
        cell: ({ row }) => {
            return <div className="text-center">{row.original.kapasitas}</div>;
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        isCenter: true,
        cell: ({ row }) => {
            const status = row.original.isActive;

            return (
                <div className="flex items-center gap-2 justify-center">
                    <Switch
                        checked={status}
                        onCheckedChange={() =>
                            onActivate(row.original.id, !status)
                        }
                    />
                    <span>
                        {row.original.isActive ? "Aktif" : "Tidak Aktif"}
                    </span>
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
                        <DropdownMenuItem
                            className="inline-flex items-center gap-2"
                            onClick={() => onEdit(row.original.id)}
                        >
                            <Icon icon="mdi:pencil" />
                            <span>Edit</span>
                        </DropdownMenuItem>

                        <DropdownMenuItem
                            className="inline-flex items-center gap-2"
                            onClick={() => onAssign(row.original.id)}
                        >
                            <Icon icon="mdi:user-plus" />
                            <span>Assign Kepala Lab</span>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </ActionMenu>
            );
        },
        size: 50,
    },
];
