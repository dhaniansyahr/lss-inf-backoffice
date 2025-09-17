import { stringifyParams } from "@/lib/query-params";
import { TDosen } from "@/types/data";
import { TQueryParams } from "@/types/request";
import { TResponse, TResponseGetAll } from "@/types/response";
import { api, MULTIPART_HEADER } from "@/utils/api";
import { TDosenRequest } from "./type";

export const service = {
    getAll: (params?: TQueryParams) => {
        return api.get<TResponseGetAll<TDosen>>("/master-data/dosen", {
            params: stringifyParams(params).query,
        });
    },
    getOne: (id: string) => {
        return api.get<TResponse<TDosen>>(`/master-data/dosen/${id}`);
    },
    create: (data: TDosenRequest) => {
        return api.post<TResponse<TDosen>>("/master-data/dosen", data);
    },
    update: (id: string, data: TDosenRequest) => {
        return api.put<TResponse<TDosen>>(`/master-data/dosen/${id}`, data);
    },
    bulkUpload: (data: { file: File }) => {
        return api.post<TResponse<TDosen>>(
            "/master-data/dosen/bulk-upload",
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

        return api.delete<TResponse<TDosen>>(`/master-data/dosen`, { params });
    },
};
