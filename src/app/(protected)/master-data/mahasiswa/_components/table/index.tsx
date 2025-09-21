"use client";

import { TableLayout } from "@/components/shared/table-layout";
import { useQueryBuilder } from "@/hooks/use-query-builder";
import { createColumns } from "./columns";
import { service } from "@/services";
import { useCallback, useRef } from "react";
import { debounce } from "lodash";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { DataTable } from "@/components/shared/data-table";
import { IDialogsRef } from "../dialogs";
import { useQuery } from "@tanstack/react-query";
import DialogMahasiswa from "../dialogs";
import { useAccess } from "@/hooks/useAccess";
import { ACCESS } from "@/constants/access";

export default function TableMahasiswa() {
    const { access } = useAccess(ACCESS.MAHASISWA);

    const { params, updateParams } = useQueryBuilder();

    const dialogRef = useRef<IDialogsRef>(null);

    const columns = createColumns({
        access,
        onEdit: (id: string) => dialogRef.current?.openDialogEdit(id),
        onDelete: (id: string) => dialogRef.current?.openDialogDelete(id),
    });

    const { data, isLoading } = useQuery(service.mahasiswa.getAll(params));

    const onSearch = useCallback(
        debounce((query: string) => {
            updateParams({
                ...params,
                searchFilters: {
                    nama: query,
                    npm: query,
                },
            });
        }, 500),
        [updateParams, params]
    );

    return (
        <TableLayout
            search={{
                onSearch: onSearch,
                placeholder: "Cari mahasiswa berdasarkan nama dan npm",
            }}
            actions={{
                right: access?.CREATE && (
                    <Button
                        size={"lg"}
                        onClick={() => dialogRef.current?.openDialogAdd()}
                    >
                        <Icon icon="mdi:plus" />
                        Tambah
                    </Button>
                ),
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
            <DialogMahasiswa ref={dialogRef} />
        </TableLayout>
    );
}
