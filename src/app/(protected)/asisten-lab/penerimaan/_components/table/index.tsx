"use client";

import { TableLayout } from "@/components/shared/table-layout";
import { useQueryBuilder } from "@/hooks/use-query-builder";
import { createColumns } from "./columns";
import { service } from "@/services";
import { useCallback, useRef } from "react";
import { debounce } from "lodash";
import { DataTable } from "@/components/shared/data-table";
import { IDialogsRef } from "../dialogs";
import { useQuery } from "@tanstack/react-query";
import DialogJadwal from "../dialogs";

export default function TablePenerimaanAsistenLab() {
    const { params, updateParams } = useQueryBuilder();

    const dialogRef = useRef<IDialogsRef>(null);

    const columns = createColumns({
        onEdit: (id: string) => dialogRef.current?.openDialogEdit(id),
        onDelete: (id: string) => dialogRef.current?.openDialogDelete(id),
    });

    const { data, isLoading } = useQuery(
        service.asistenLab.getAll({
            ...params,
            filters: {
                status: "DISETUJUI",
            },
        })
    );

    const onSearch = useCallback(
        debounce((query: string) => {
            updateParams({
                ...params,
                searchFilters: {
                    "matakuliah.nama": query,
                    "matakuliah.kode": query,
                    "ruangan.nama": query,
                    kelas: query,
                    hari: query,
                    "shift.startTime": query,
                    "shift.endTime": query,
                    semester: query,
                },
            });
        }, 500),
        [updateParams, params]
    );

    return (
        <TableLayout
            search={{
                onSearch: onSearch,
                placeholder: "Cari asisten",
            }}
            dataTable={
                <DataTable
                    columns={columns}
                    data={data?.content?.entries ?? []}
                    isLoading={isLoading}
                    paginate={{
                        page: params.page ?? 1,
                        rows: params.rows ?? 10,
                        totalData: data?.content?.totalData,
                        totalPage: data?.content?.totalPage,
                    }}
                    onPaginate={(page) => {
                        updateParams({
                            page: page,
                            rows: params.rows ?? 10,
                        });
                    }}
                />
            }
        >
            <DialogJadwal ref={dialogRef} />
        </TableLayout>
    );
}
