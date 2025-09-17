import { stringifyParams } from "@/lib/query-params";
import { TMatakuliah } from "@/types/data";
import { TQueryParams } from "@/types/request";
import { TResponse, TResponseGetAll } from "@/types/response";
import { api, MULTIPART_HEADER } from "@/utils/api";
import { TMatakuliahRequest } from "./type";

export const service = {
    getAll: (params?: TQueryParams) => {
        return api.get<TResponseGetAll<TMatakuliah>>(
            "/master-data/mata-kuliah",
            { params: stringifyParams(params).query }
        );
    },
    getOne: (id: string) => {
        return api.get<TResponse<TMatakuliah>>(
            `/master-data/mata-kuliah/${id}`
        );
    },
    create: (data: TMatakuliahRequest) => {
        return api.post<TResponse<TMatakuliah>>(
            "/master-data/mata-kuliah",
            data
        );
    },
    update: (id: string, data: TMatakuliahRequest) => {
        return api.put<TResponse<TMatakuliah>>(
            `/master-data/mata-kuliah/${id}`,
            data
        );
    },
    bulkUpload: (data: { file: File }) => {
        return api.post<TResponse<TMatakuliah>>(
            "/master-data/mata-kuliah/bulk-upload",
            data,
            MULTIPART_HEADER
        );
    },
    remove: (ids: string[] | string) => {
        const params = {
            ids: Array.isArray(ids)
                ? JSON.stringify(ids)
                : JSON.stringify([ids]),
        };

        return api.delete<TResponse<TMatakuliah>>(`/master-data/mata-kuliah`, {
            params,
        });
    },
};
