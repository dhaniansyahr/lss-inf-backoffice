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
import DialogJadwal from "../dialogs";
import { useRouter } from "next/navigation";

export default function TableJadwal() {
    const router = useRouter();

    const { params, updateParams } = useQueryBuilder();

    const dialogRef = useRef<IDialogsRef>(null);

    const columns = createColumns({
        onDetail: (id: string) => router.push(`/jadwal/${id}/detail`),
        onAbsensi: (id: string) => router.push(`/jadwal/${id}/absensi`),
        onEditPertemuan: (id: string) =>
            dialogRef.current?.openDialogEditPertemuan(id),
        onEdit: (id: string) => dialogRef.current?.openDialogEdit(id),
    });

    const { data, isLoading } = useQuery(
        service.jadwal.getAll({
            ...params,
            filters: {
                "matakuliah.isTeori": false,
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
                placeholder:
                    "Cari jadwal berdasarkan nama matakuliah, kode, hari, kelas, waktu, dan ruangan",
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
            <DialogJadwal ref={dialogRef} />
        </TableLayout>
    );
}
