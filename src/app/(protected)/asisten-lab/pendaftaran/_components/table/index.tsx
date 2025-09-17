"use client";

import { TableLayout } from "@/components/shared/table-layout";
import { useQueryBuilder } from "@/hooks/use-query-builder";
import { createColumns } from "./columns";
import { service } from "@/services";
import { useCallback, useRef, useState } from "react";
import { debounce } from "lodash";
import { DataTable } from "@/components/shared/data-table";
import { useQuery } from "@tanstack/react-query";
import Tabs from "@/components/shared/tabs";
import { IModalRef } from "@/components/shared/modal";
import DialogAdd from "../dialogs/add";
import { TpendaftaranAsistenLab } from "@/types/data";
import { createColumnsRegistered } from "./columns-terdaftar";
import DialogEdit from "../dialogs/edit";

const TABS = [
    { label: "Daftar", value: "REQUEST" },
    { label: "Terdaftar", value: "REGISTERED" },
];

export default function TablePendaftaranAsistenLab() {
    const [tab, setTab] = useState<string>("REQUEST");

    const { params, updateParams } = useQueryBuilder();

    const [id, setId] = useState<string>("");
    const [values, setValues] = useState<TpendaftaranAsistenLab | null>(null);

    const dialogAddRef = useRef<IModalRef>(null);
    const dialogEditRef = useRef<IModalRef>(null);

    const columns = createColumns({
        onRequest: (id: string) => {
            dialogAddRef.current?.open();
            setId(id);
        },
    });

    const columnsRegistered = createColumnsRegistered({
        onUpdate: (v: TpendaftaranAsistenLab | null) => {
            dialogEditRef.current?.open();
            setValues(v);
        },
    });

    const { data, isLoading } = useQuery({
        ...service.jadwal.getAll({
            ...params,
            filters: {
                "matakuliah.isTeori": false,
            },
        }),
        queryKey: ["jadwal", params, "REQUEST"],
        enabled: tab === "REQUEST",
    });

    const { data: dataRegistered, isLoading: isLoadingRegistered } = useQuery({
        ...service.asistenLab.getAll({
            ...params,
            filters: {
                status: "PENDING",
            },
        }),
        queryKey: ["asisten-lab", params, "REGISTERED"],
        enabled: tab === "REGISTERED",
    });

    const onSearch = useCallback(
        debounce((query: string) => {
            updateParams({
                ...params,
                searchFilters: {
                    "matakuliah.nama": query,
                    "matakuliah.kode": query,
                },
            });
        }, 500),
        [updateParams, params]
    );

    return (
        <TableLayout
            search={{
                onSearch: onSearch,
                placeholder: "Cari jadwal berdasarkan nama dan kode matakuliah",
            }}
            tab={<Tabs tabs={TABS} value={tab} onChange={setTab} />}
            dataTable={
                <>
                    {tab === "REQUEST" ? (
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
                    ) : (
                        <DataTable
                            columns={columnsRegistered}
                            data={dataRegistered?.content?.entries ?? []}
                            isLoading={isLoadingRegistered}
                            paginate={{
                                page: params.page ?? 1,
                                rows: params.rows ?? 10,
                                totalData: dataRegistered?.content?.totalData,
                                totalPage: dataRegistered?.content?.totalPage,
                            }}
                            onPaginate={(page) => {
                                updateParams({
                                    page: page,
                                    rows: params.rows ?? 10,
                                });
                            }}
                        />
                    )}
                </>
            }
        >
            <DialogAdd dialogRef={dialogAddRef} jadwalId={id} />
            <DialogEdit dialogRef={dialogEditRef} values={values} />
        </TableLayout>
    );
}
