import { stringifyParams } from "@/lib/query-params";
import { TMahasiswa } from "@/types/data";
import { TQueryParams } from "@/types/request";
import { TResponse, TResponseGetAll } from "@/types/response";
import { api, MULTIPART_HEADER } from "@/utils/api";
import { TMahasiswaRequest } from "./type";

export const service = {
    getAll: (params?: TQueryParams) => {
        return api.get<TResponseGetAll<TMahasiswa>>("/master-data/mahasiswa", {
            params: stringifyParams(params).query,
        });
    },
    getOne: (id: string) => {
        return api.get<TResponse<TMahasiswa>>(`/master-data/mahasiswa/${id}`);
    },
    create: (data: TMahasiswaRequest) => {
        return api.post<TResponse<TMahasiswa>>("/master-data/mahasiswa", data);
    },
    update: (id: string, data: TMahasiswaRequest) => {
        return api.put<TResponse<TMahasiswa>>(
            `/master-data/mahasiswa/${id}`,
            data
        );
    },
    bulkUpload: (data: { file: File }) => {
        return api.post<TResponse<TMahasiswa>>(
            "/master-data/mahasiswa/bulk-upload",
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

        return api.delete<TResponse<TMahasiswa>>(`/master-data/mahasiswa`, {
            params,
        });
    },
};
