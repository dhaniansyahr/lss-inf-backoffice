import type { ColumnDef, Row } from "@tanstack/react-table";
import { TMeeting, TParticipant } from "@/types/data";
import { Checkbox } from "@/components/ui/checkbox";
import { TAbsentRequest } from "@/services/jadwal/type";

interface ICreateColumnsProps {
    onRecord: (data: TAbsentRequest) => void;
    currentPage?: number;
    pageSize?: number;
}

type CustomColumnDef<TData, TValue> = ColumnDef<TData, TValue> & {
    isCenter?: boolean;
};

type ColumnType = TParticipant;

export const createColumns = ({
    onRecord,
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
            return <div>{row.original.name ?? "-"}</div>;
        },
    },
    {
        accessorKey: "npm",
        header: "NPM/NIP",
        cell: ({ row }) => {
            return <div>{row.original.noIdentitas ?? "-"}</div>;
        },
        isCenter: true,
    },
    {
        accessorKey: `pertemuan1`,
        header: `Pertemuan 1`,
        cell: ({ row }) => {
            return (
                <div className="flex items-center justify-center w-full">
                    <Checkbox
                        checked={row.original.meetings.pertemuan1}
                        onCheckedChange={() =>
                            onRecord({
                                meetingId: row.original.meetings.pertemuan1Id,
                                identity: row.original.noIdentitas,
                                type: row.original.type as
                                    | "DOSEN"
                                    | "MAHASISWA"
                                    | "ASISTEN_LAB",
                            })
                        }
                    />
                </div>
            );
        },
        isCenter: true,
    },
    {
        accessorKey: `pertemuan2`,
        header: `Pertemuan 2`,
        cell: ({ row }) => {
            return (
                <div className="flex items-center justify-center w-full">
                    <Checkbox
                        checked={row.original.meetings.pertemuan2}
                        onCheckedChange={() =>
                            onRecord({
                                meetingId: row.original.meetings.pertemuan2Id,
                                identity: row.original.noIdentitas,
                                type: row.original.type as
                                    | "DOSEN"
                                    | "MAHASISWA"
                                    | "ASISTEN_LAB",
                            })
                        }
                    />
                </div>
            );
        },
        isCenter: true,
    },
    {
        accessorKey: `pertemuan3`,
        header: `Pertemuan 3`,
        cell: ({ row }) => {
            return (
                <div className="flex items-center justify-center w-full">
                    <Checkbox
                        checked={row.original.meetings.pertemuan3}
                        onCheckedChange={() =>
                            onRecord({
                                meetingId: row.original.meetings.pertemuan3Id,
                                identity: row.original.noIdentitas,
                                type: row.original.type as
                                    | "DOSEN"
                                    | "MAHASISWA"
                                    | "ASISTEN_LAB",
                            })
                        }
                    />
                </div>
            );
        },
        isCenter: true,
    },
    {
        accessorKey: `pertemuan4`,
        header: `Pertemuan 4`,
        cell: ({ row }) => {
            return (
                <div className="flex items-center justify-center w-full">
                    <Checkbox
                        checked={row.original.meetings.pertemuan4}
                        onCheckedChange={() =>
                            onRecord({
                                meetingId: row.original.meetings.pertemuan4Id,
                                identity: row.original.noIdentitas,
                                type: row.original.type as
                                    | "DOSEN"
                                    | "MAHASISWA"
                                    | "ASISTEN_LAB",
                            })
                        }
                    />
                </div>
            );
        },
        isCenter: true,
    },
    {
        accessorKey: `pertemuan5`,
        header: `Pertemuan 5`,
        cell: ({ row }) => {
            return (
                <div className="flex items-center justify-center w-full">
                    <Checkbox
                        checked={row.original.meetings.pertemuan5}
                        onCheckedChange={() =>
                            onRecord({
                                meetingId: row.original.meetings.pertemuan5Id,
                                identity: row.original.noIdentitas,
                                type: row.original.type as
                                    | "DOSEN"
                                    | "MAHASISWA"
                                    | "ASISTEN_LAB",
                            })
                        }
                    />
                </div>
            );
        },
        isCenter: true,
    },
    {
        accessorKey: `pertemuan6`,
        header: `Pertemuan 6`,
        cell: ({ row }) => {
            return (
                <div className="flex items-center justify-center w-full">
                    <Checkbox
                        checked={row.original.meetings.pertemuan6}
                        onCheckedChange={() =>
                            onRecord({
                                meetingId: row.original.meetings.pertemuan6Id,
                                identity: row.original.noIdentitas,
                                type: row.original.type as
                                    | "DOSEN"
                                    | "MAHASISWA"
                                    | "ASISTEN_LAB",
                            })
                        }
                    />
                </div>
            );
        },
        isCenter: true,
    },
    {
        accessorKey: `pertemuan7`,
        header: `Pertemuan 7`,
        cell: ({ row }) => {
            return (
                <div className="flex items-center justify-center w-full">
                    <Checkbox
                        checked={row.original.meetings.pertemuan7}
                        onCheckedChange={() =>
                            onRecord({
                                meetingId: row.original.meetings.pertemuan7Id,
                                identity: row.original.noIdentitas,
                                type: row.original.type as
                                    | "DOSEN"
                                    | "MAHASISWA"
                                    | "ASISTEN_LAB",
                            })
                        }
                    />
                </div>
            );
        },
        isCenter: true,
    },
    {
        accessorKey: `pertemuan8`,
        header: `Pertemuan 8`,
        cell: ({ row }) => {
            return (
                <div className="flex items-center justify-center w-full">
                    <Checkbox
                        checked={row.original.meetings.pertemuan8}
                        onCheckedChange={() =>
                            onRecord({
                                meetingId: row.original.meetings.pertemuan8Id,
                                identity: row.original.noIdentitas,
                                type: row.original.type as
                                    | "DOSEN"
                                    | "MAHASISWA"
                                    | "ASISTEN_LAB",
                            })
                        }
                    />
                </div>
            );
        },
        isCenter: true,
    },
    {
        accessorKey: `pertemuan9`,
        header: `Pertemuan 9`,
        cell: ({ row }) => {
            return (
                <div className="flex items-center justify-center w-full">
                    <Checkbox
                        checked={row.original.meetings.pertemuan9}
                        onCheckedChange={() =>
                            onRecord({
                                meetingId: row.original.meetings.pertemuan9Id,
                                identity: row.original.noIdentitas,
                                type: row.original.type as
                                    | "DOSEN"
                                    | "MAHASISWA"
                                    | "ASISTEN_LAB",
                            })
                        }
                    />
                </div>
            );
        },
        isCenter: true,
    },
    {
        accessorKey: `pertemuan10`,
        header: `Pertemuan 10`,
        cell: ({ row }) => {
            return (
                <div className="flex items-center justify-center w-full">
                    <Checkbox
                        checked={row.original.meetings.pertemuan10}
                        onCheckedChange={() =>
                            onRecord({
                                meetingId: row.original.meetings.pertemuan10Id,
                                identity: row.original.noIdentitas,
                                type: row.original.type as
                                    | "DOSEN"
                                    | "MAHASISWA"
                                    | "ASISTEN_LAB",
                            })
                        }
                    />
                </div>
            );
        },
        isCenter: true,
    },
    {
        accessorKey: `pertemuan11`,
        header: `Pertemuan 11`,
        cell: ({ row }) => {
            return (
                <div className="flex items-center justify-center w-full">
                    <Checkbox
                        checked={row.original.meetings.pertemuan11}
                        onCheckedChange={() =>
                            onRecord({
                                meetingId: row.original.meetings.pertemuan11Id,
                                identity: row.original.noIdentitas,
                                type: row.original.type as
                                    | "DOSEN"
                                    | "MAHASISWA"
                                    | "ASISTEN_LAB",
                            })
                        }
                    />
                </div>
            );
        },
        isCenter: true,
    },
    {
        accessorKey: `pertemuan12`,
        header: `Pertemuan 12`,
        cell: ({ row }) => {
            return (
                <div className="flex items-center justify-center w-full">
                    <Checkbox
                        checked={row.original.meetings.pertemuan12}
                        onCheckedChange={() =>
                            onRecord({
                                meetingId: row.original.meetings.pertemuan12Id,
                                identity: row.original.noIdentitas,
                                type: row.original.type as
                                    | "DOSEN"
                                    | "MAHASISWA"
                                    | "ASISTEN_LAB",
                            })
                        }
                    />
                </div>
            );
        },
        isCenter: true,
    },
];
