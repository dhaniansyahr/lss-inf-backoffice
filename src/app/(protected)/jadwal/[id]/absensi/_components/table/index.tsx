"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createColumns } from "./column";
import { DataTable } from "@/components/shared/data-table";
import { service } from "@/services";
import { useParams } from "next/navigation";
import { TAbsentRequest } from "@/services/jadwal/type";
import { toast } from "sonner";

export default function TableAbsensi() {
    const queryClient = useQueryClient();

    const { id }: { id: string } = useParams();

    const { data, isLoading } = useQuery({
        ...service.jadwal.getListParticipants(id),
        enabled: !!id,
    });

    const recordFn = useMutation(service.jadwal.recordAbsent());

    const onRecord = (data: TAbsentRequest) => {
        recordFn.mutate(data, {
            onSuccess: (data) => {
                toast.success(data.message);
                queryClient.invalidateQueries({
                    queryKey: service.jadwal.queryKey({ id }),
                });
            },
        });
    };

    const columns = createColumns({
        onRecord,
        currentPage: 1,
        pageSize: 10,
    });

    return (
        <DataTable
            columns={columns}
            data={data?.content?.participants ?? []}
            isLoading={isLoading}
        />
    );
}
