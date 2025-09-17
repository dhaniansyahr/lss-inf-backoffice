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
import DialogRuangan, { IDialogsRef } from "../dialogs";
import { useMutation, useQuery } from "@tanstack/react-query";

export default function TableRuangan() {
    const { params, updateParams } = useQueryBuilder();

    const dialogRef = useRef<IDialogsRef>(null);

    const activatedFn = useMutation(service.ruangan.activate());

    const onActivate = (id: string, isActive: boolean) => {
        activatedFn.mutate({ id, data: { isActive: isActive } });
    };

    const columns = createColumns({
        onEdit: (id: string) => dialogRef.current?.openDialogEdit(id),
        onActivate: (id: string, isActive: boolean) => onActivate(id, isActive),
        onAssign: (id: string) => dialogRef.current?.openDialogAssign(id),
    });

    const { data, isLoading } = useQuery(service.ruangan.getAll(params));

    const onSearch = useCallback(
        debounce((query: string) => {
            updateParams({
                ...params,
                searchFilters: {
                    nama: query,
                    lokasi: query,
                },
            });
        }, 500),
        [updateParams, params]
    );

    return (
        <TableLayout
            search={{
                onSearch: onSearch,
                placeholder: "Cari ruangan",
            }}
            actions={{
                right: (
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
            <DialogRuangan ref={dialogRef} />
        </TableLayout>
    );
}
