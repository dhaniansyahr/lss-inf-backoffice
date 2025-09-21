"use client";

import { DataTable } from "@/components/shared/data-table";
import { TableLayout } from "@/components/shared/table-layout";
import { createColumns } from "./column";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useMutation, useQuery } from "@tanstack/react-query";
import { service } from "@/services";
import { useQueryBuilder } from "@/hooks/use-query-builder";
import { useCallback, useRef } from "react";
import { debounce } from "lodash";
import DialogShift, { IDialogsRef } from "../dialogs";
import { useAccess } from "@/hooks/useAccess";

export default function TableShift() {
    const { access } = useAccess("SHIFT");

    const { params, updateParams } = useQueryBuilder();

    const dialogsRef = useRef<IDialogsRef>(null);

    // Mutation
    const activatedFn = useMutation({
        ...service.shift.activate(),
        meta: {
            messages: {
                success: "Berhasil Mengaktifkan Shift!",
                error: "Gagal Mengaktifkan Shift!",
            },
            invalidatesQuery: ["shifts"],
        },
    });

    const columns = createColumns({
        access: access,
        onEdit: (id: string) => {
            dialogsRef.current?.openDialogEdit(id);
        },
        onDelete: (id: string) => {
            dialogsRef.current?.openDialogDelete(id);
        },
        onActivate: (id: string, isActive: boolean) => {
            activatedFn.mutate({ id, data: { isActive: isActive } });
        },
    });

    // Fetch Data
    const { data, isLoading } = useQuery(service.shift.getAll(params));

    const debouncedSearch = useCallback(
        debounce((query: string) => {
            updateParams({
                ...params,
                searchFilters: {
                    startTime: query,
                    endTime: query,
                },
            });
        }, 500),
        [updateParams, params]
    );

    // Fixed: onSearch now properly calls the debounced function
    const onSearch = useCallback(
        (query: string) => {
            debouncedSearch(query);
        },
        [debouncedSearch]
    );

    return (
        <TableLayout
            search={{
                onSearch: onSearch,
                placeholder: "Cari shift",
            }}
            actions={{
                right: access?.CREATE && (
                    <Button
                        size={"lg"}
                        onClick={() => dialogsRef.current?.openDialogAdd()}
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
            <DialogShift ref={dialogsRef} />
        </TableLayout>
    );
}
