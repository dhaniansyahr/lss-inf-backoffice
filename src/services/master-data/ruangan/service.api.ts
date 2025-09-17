import { stringifyParams } from "@/lib/query-params";
import { TRuanganLaboratorium } from "@/types/data";
import { TQueryParams } from "@/types/request";
import { TResponse, TResponseGetAll } from "@/types/response";
import { api } from "@/utils/api";
import { TAssignRequest, TRuanganRequest } from "./type";

export const service = {
    getAll: (params?: TQueryParams) => {
        return api.get<TResponseGetAll<TRuanganLaboratorium>>(
            "/master-data/ruangan",
            { params: stringifyParams(params).query }
        );
    },
    getOne: (id: string) => {
        return api.get<TResponse<TRuanganLaboratorium>>(
            `/master-data/ruangan/${id}`
        );
    },
    create: (data: TRuanganRequest) => {
        return api.post<TResponse<TRuanganLaboratorium>>(
            "/master-data/ruangan",
            data
        );
    },
    update: (id: string, data: TRuanganRequest) => {
        return api.put<TResponse<TRuanganLaboratorium>>(
            `/master-data/ruangan/${id}`,
            data
        );
    },
    activate: (id: string, data: { isActive: boolean }) => {
        return api.put<TResponse<TRuanganLaboratorium>>(
            `/master-data/ruangan/${id}/activate`,
            data
        );
    },
    assign: (id: string, data: TAssignRequest) => {
        return api.put<TResponse<TRuanganLaboratorium>>(
            `/master-data/ruangan/${id}/assign-kepala-lab`,
            data
        );
    },
    remove: (ids: string[] | string) => {
        const params = {
            ids: Array.isArray(ids)
                ? JSON.stringify(ids)
                : JSON.stringify([ids]),
        };

        return api.delete<TResponse<TRuanganLaboratorium>>(
            `/master-data/ruangan`,
            { params }
        );
    },
};
