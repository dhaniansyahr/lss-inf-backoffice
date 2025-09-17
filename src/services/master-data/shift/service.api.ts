import { stringifyParams } from "@/lib/query-params";
import { TShift } from "@/types/data";
import { TQueryParams } from "@/types/request";
import { TResponse, TResponseGetAll } from "@/types/response";
import { api } from "@/utils/api";
import { TShiftRequest } from "./type";

export const service = {
    getAll: (params?: TQueryParams) => {
        return api.get<TResponseGetAll<TShift>>("/master-data/shift", {
            params: stringifyParams(params).query,
        });
    },
    getOne: (id: string) => {
        return api.get<TResponse<TShift>>(`/master-data/shift/${id}`);
    },
    create: (data: TShiftRequest) => {
        return api.post<TResponse<TShift>>("/master-data/shift", data);
    },
    update: (id: string, data: TShiftRequest) => {
        return api.put<TResponse<TShift>>(`/master-data/shift/${id}`, data);
    },
    activate: (id: string, data: { isActive: boolean }) => {
        return api.put<TResponse<TShift>>(
            `/master-data/shift/${id}/activate`,
            data
        );
    },
    remove: (ids: string[] | string) => {
        const params = {
            ids: Array.isArray(ids)
                ? JSON.stringify(ids)
                : JSON.stringify([ids]),
        };

        return api.delete<TResponse<TShift>>(`/master-data/shift`, {
            params,
        });
    },
};
