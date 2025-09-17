"use client";

import { createColumns } from "./column";
import { DataTable } from "@/components/shared/data-table";

export default function TableAbsensi() {
    const columns = createColumns({
        currentPage: 1,
        pageSize: 10,
    });

    return <DataTable columns={columns} data={[]} />;
}
