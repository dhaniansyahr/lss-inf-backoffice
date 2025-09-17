import type { ColumnDef } from "@tanstack/react-table";
import {
    DropdownMenuGroup,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@iconify/react/dist/iconify.js";
import ActionMenu from "@/components/shared/action-menu";
import { Switch } from "@/components/ui/switch";
import { TShift } from "@/types/data";

interface ICreateColumnsProps {
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
    onActivate: (id: string, isActive: boolean) => void;
    currentPage?: number;
    pageSize?: number;
}

type CustomColumnDef<TData, TValue> = ColumnDef<TData, TValue> & {
    isCenter?: boolean;
};

type ColumnType = TShift;

export const createColumns = ({
    onEdit,
    onDelete,
    onActivate,
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
        accessorKey: "startTime",
        header: "Waktu Mulai",
        isCenter: true,
    },
    {
        accessorKey: "endTime",
        header: "Waktu Selesai",
        isCenter: true,
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
