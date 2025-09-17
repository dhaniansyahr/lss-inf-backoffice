import { getError } from "@/utils/api";
import { TQueryParams } from "@/types/request";
import { service } from "./service.api";
import { TDosenRequest } from "./type";
const QUERY_KEY = (key?: string | TQueryParams | Record<string, unknown>) =>
    ["dosen", key] as const;

const getAll = (params?: TQueryParams) => ({
    queryKey: QUERY_KEY({ ...params }),
    queryFn: async () => {
        try {
            const response = await service.getAll(params);

            return response.data;
        } catch (error) {
            throw getError(error);
        }
    },
});

const getOne = (id: string) => ({
    queryKey: QUERY_KEY({ id }),
    queryFn: async () => {
        try {
            const response = await service.getOne(id);

            return response.data;
        } catch (error) {
            throw getError(error);
        }
    },
});

const create = (params?: TQueryParams) => ({
    mutationFn: async (data: TDosenRequest) => {
        try {
            const response = await service.create(data);

            return response.data;
        } catch (error) {
            throw getError(error);
        }
    },
    meta: {
        messages: {
            success: "Berhasil Membuat Dosen Baru!",
            error: "Gagal Membuat Dosen Baru!",
        },
        invalidatesQuery: QUERY_KEY({ ...params }),
    },
});

const update = (id: string, params?: TQueryParams) => ({
    mutationFn: async (data: TDosenRequest) => {
        try {
            const response = await service.update(id, data);
            return response.data;
        } catch (error) {
            throw getError(error);
        }
    },
    meta: {
        messages: {
            success: "Berhasil Memperbarui Dosen!",
            error: "Gagal Memperbarui Dosen!",
        },
        invalidatesQuery: QUERY_KEY({ id, ...params }),
    },
});

const bulkUpload = () => ({
    mutationFn: async (data: { file: File }) => {
        try {
            const response = await service.bulkUpload(data);

            return response.data;
        } catch (error) {
            throw getError(error);
        }
    },
    meta: {
        messages: {
            success: "Berhasil Membuat dosen dengan bulk!",
            error: "Gagal membuat dosen dengan bulk!",
        },
    },
});

const remove = (params?: TQueryParams) => ({
    mutationFn: async (ids: string[] | string) => {
        try {
            const response = await service.remove(ids);

            return response.data;
        } catch (error) {
            throw getError(error);
        }
    },
    meta: {
        messages: {
            success: "Berhasil Menghapus Dosen!",
            error: "Gagal Menghapus Dosen!",
        },
        invalidatesQuery: QUERY_KEY({ ...params }),
    },
});

export const dosen = {
    getAll,
    getOne,
    create,
    update,
    bulkUpload,
    remove,
};
