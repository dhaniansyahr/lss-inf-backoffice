import type { ColumnDef } from "@tanstack/react-table";
import {
    DropdownMenuGroup,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@iconify/react/dist/iconify.js";
import ActionMenu from "@/components/shared/action-menu";
import { TAccess, TUser } from "@/types/data";

interface ICreateColumnsProps {
    access: TAccess["actions"] | undefined | null;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
    currentPage?: number;
    pageSize?: number;
}

type CustomColumnDef<TData, TValue> = ColumnDef<TData, TValue> & {
    isCenter?: boolean;
};

type ColumnType = TUser;

export const createColumns = ({
    access,
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
        accessorKey: "fullName",
        header: "Nama",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "userLevel.name",
        header: "Role",

        cell: ({ row }) => {
            return <div>{row.original.userLevel.name ?? "-"}</div>;
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
                        {access?.UPDATE && (
                            <DropdownMenuItem
                                className="inline-flex items-center gap-2"
                                onClick={() => onEdit(row.original.id)}
                            >
                                <Icon icon="mdi:pencil" />
                                <span>Edit</span>
                            </DropdownMenuItem>
                        )}

                        {access?.DELETE && (
                            <DropdownMenuItem
                                className="inline-flex items-center gap-2"
                                onClick={() => onDelete(row.original.id)}
                            >
                                <Icon icon="mdi:trash" />
                                <span>Hapus</span>
                            </DropdownMenuItem>
                        )}
                    </DropdownMenuGroup>
                </ActionMenu>
            );
        },
        size: 50,
    },
];
