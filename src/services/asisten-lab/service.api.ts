import { stringifyParams } from "@/lib/query-params";
import { TpendaftaranAsistenLab } from "@/types/data";
import { TQueryParams } from "@/types/request";
import { TResponse, TResponseGetAll } from "@/types/response";
import { api } from "@/utils/api";
import { TAcceptanceAssistenLab, TRequestAssistenLab } from "./type";

export const api_service = {
    getAll: (params?: TQueryParams) => {
        return api.get<TResponseGetAll<TpendaftaranAsistenLab>>(
            "/asisten-lab",
            {
                params: stringifyParams(params).query,
            }
        );
    },
    create: (data: TRequestAssistenLab) => {
        return api.post<TResponse<TpendaftaranAsistenLab>>(
            "/asisten-lab",
            data
        );
    },
    update: (id: string, data: TRequestAssistenLab) => {
        return api.put<TResponse<TpendaftaranAsistenLab>>(
            `/asisten-lab/${id}`,
            data
        );
    },
    acceptance: (id: string, data: TAcceptanceAssistenLab) => {
        return api.put<TResponse<TpendaftaranAsistenLab>>(
            `/asisten-lab/${id}/acceptance`,
            data
        );
    },
    assignment: (id: string, data: { asistenIds: string }) => {
        return api.put<TResponse<TpendaftaranAsistenLab>>(
            `/asisten-lab/${id}/assignment`,
            data
        );
    },
};
