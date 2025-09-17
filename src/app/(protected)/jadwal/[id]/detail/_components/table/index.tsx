"use client";

import { TJadwalMahasiswa } from "@/types/data";
import { createColumns } from "./column";
import { DataTable } from "@/components/shared/data-table";

interface ITableListMahasiswaProps {
    mahasiswa: TJadwalMahasiswa[];
}

export default function TableListMahasiswa({
    mahasiswa,
}: ITableListMahasiswaProps) {
    const columns = createColumns({
        currentPage: 1,
        pageSize: mahasiswa.length,
    });

    return <DataTable columns={columns} data={mahasiswa} />;
}
