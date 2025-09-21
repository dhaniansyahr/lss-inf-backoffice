"use client";

import { DataTable } from "@/components/shared/data-table";
import { TableLayout } from "@/components/shared/table-layout";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useQuery } from "@tanstack/react-query";
import { service } from "@/services";
import { useQueryBuilder } from "@/hooks/use-query-builder";
import { useCallback } from "react";
import { debounce } from "lodash";
import { createColumns } from "./columns";
import { useRouter } from "next/navigation";
import { useAccess } from "@/hooks/useAccess";
import { ACCESS } from "@/constants/access";

export default function TableRoles() {
    const { access } = useAccess(ACCESS.ROLE_MANAGEMENT);

    const router = useRouter();

    const { params, updateParams } = useQueryBuilder();

    const columns = createColumns({
        access,
        onEdit: (id: string) => {
            console.log(id);
        },
        onDelete: (id: string) => {
            console.log(id);
        },
    });

    // Fetch Data
    const { data, isLoading } = useQuery(service.roles.getAll(params));

    const debouncedSearch = useCallback(
        debounce((query: string) => {
            updateParams({
                ...params,
                searchFilters: {
                    name: query,
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
                placeholder: "Cari role berdasarkan nama",
            }}
            actions={{
                right: access?.CREATE && (
                    <Button
                        size={"lg"}
                        onClick={() => router.push("/pengaturan/role/create")}
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
            {/* <DialogPengguna ref={dialogsRef} /> */}
        </TableLayout>
    );
}
