"use client";

import { TableLayout } from "@/components/shared/table-layout";
import { useQueryBuilder } from "@/hooks/use-query-builder";
import { createColumns } from "./columns";
import { service } from "@/services";
import { useCallback, useRef, useState } from "react";
import { debounce } from "lodash";
import { DataTable } from "@/components/shared/data-table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAccess } from "@/hooks/useAccess";
import { ACCESS } from "@/constants/access";
import { TAcceptanceAssistenLab } from "@/services/asisten-lab/type";
import { toast } from "sonner";
import { DateTime } from "luxon";
import { IModalRef } from "@/components/shared/modal";
import DialogRejected from "../dialogs/rejected";

export default function TablePenerimaanAsistenLab() {
    const queryClient = useQueryClient();

    const { access } = useAccess(ACCESS.PENERIMAAN_ASISTEN_LAB);

    const { params, updateParams } = useQueryBuilder();

    const dialogRejectedRef = useRef<IModalRef>(null);
    const [rejectedId, setRejectedId] = useState<string>("");

    const acceptanceFn = useMutation(service.asistenLab.acceptance());

    const onAcceptance = (id: string) => {
        const body: TAcceptanceAssistenLab = {
            status: "DISETUJUI",
            keterangan: `Telah disetujui sebagai asisten lab pada ${DateTime.now().toFormat(
                "dd MMMM yyyy HH:mm"
            )}`,
        };
        acceptanceFn.mutate(
            { id, data: body },
            {
                onSuccess: (res) => {
                    toast.success(res.message);
                    queryClient.invalidateQueries({
                        queryKey: ["asisten-lab", params],
                    });
                },
                onError: (err) => {
                    toast.error(err.message);
                },
            }
        );
    };

    const columns = createColumns({
        access,
        onAcceptance: (id: string) => onAcceptance(id),
        onDelete: (id: string) => {
            dialogRejectedRef.current?.open();
            setRejectedId(id);
        },
    });

    const { data, isLoading } = useQuery(
        service.asistenLab.getAll({
            ...params,
            // filters: {
            //     status: "DISETUJUI",
            // },
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
            <DialogRejected dialogRef={dialogRejectedRef} id={rejectedId} />
        </TableLayout>
    );
}
