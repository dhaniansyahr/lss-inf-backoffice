import { getError } from "@/utils/api";
import { TQueryParams } from "@/types/request";
import { api_service } from "./service.api";
import { TAcceptanceAssistenLab, TRequestAssistenLab } from "./type";

const QUERY_KEY = (key?: string | TQueryParams | Record<string, unknown>) =>
    ["asisten-lab", key] as const;

const getAll = (params?: TQueryParams) => ({
    queryKey: QUERY_KEY({ ...params }),
    queryFn: async () => {
        try {
            const response = await api_service.getAll(params);

            return response.data;
        } catch (error) {
            throw getError(error);
        }
    },
});

const create = (params?: TQueryParams) => ({
    mutationFn: async (data: TRequestAssistenLab) => {
        try {
            const response = await api_service.create(data);

            return response.data;
        } catch (error) {
            throw getError(error);
        }
    },
    meta: {
        messages: {
            success: "Berhasil mendaftar sebagai asisten lab!",
            error: "Gagal mendaftar sebagai asisten lab!",
        },
        invalidatesQuery: QUERY_KEY({ ...params }),
    },
});

const update = (id: string, params?: TQueryParams) => ({
    mutationFn: async (data: TRequestAssistenLab) => {
        try {
            const response = await api_service.update(id, data);

            return response.data;
        } catch (error) {
            throw getError(error);
        }
    },
    meta: {
        messages: {
            success: "Berhasil Memperbarui data pendaftaran asisten lab!",
            error: "Gagal Memperbarui data pendaftaran asisten lab!",
        },
        invalidatesQuery: QUERY_KEY({ id, ...params }),
    },
});

const acceptance = (id: string, params?: TQueryParams) => ({
    mutationFn: async (data: TAcceptanceAssistenLab) => {
        try {
            const response = await api_service.acceptance(id, data);

            return response.data;
        } catch (error) {
            throw getError(error);
        }
    },
    meta: {
        messages: {
            success: "Berhasil menerima/menolak pendaftaran asisten lab!",
            error: "Gagal menerima/menolak pendaftaran asisten lab!",
        },
        invalidatesQuery: QUERY_KEY({ id, ...params }),
    },
});

const assignment = (id: string, params?: TQueryParams) => ({
    mutationFn: async (data: { asistenIds: string }) => {
        try {
            const response = await api_service.assignment(id, data);

            return response.data;
        } catch (error) {
            throw getError(error);
        }
    },
    meta: {
        messages: {
            success: "Berhasil mengassign asisten lab!",
            error: "Gagal mengassign asisten lab!",
        },
        invalidatesQuery: QUERY_KEY({ id, ...params }),
    },
});

export const asistenLab = {
    getAll,
    create,
    update,
    acceptance,
    assignment,
};
