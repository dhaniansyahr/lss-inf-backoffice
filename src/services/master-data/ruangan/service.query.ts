import { getError } from "@/utils/api";
import { TQueryParams } from "@/types/request";
import { service } from "./service.api";
import { TAssignRequest, TRuanganRequest } from "./type";

const QUERY_KEY = (key?: string | TQueryParams | Record<string, unknown>) =>
    ["ruangan", key] as const;

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
    mutationFn: async (data: TRuanganRequest) => {
        try {
            const response = await service.create(data);

            return response.data;
        } catch (error) {
            throw getError(error);
        }
    },
    meta: {
        messages: {
            success: "Berhasil Membuat Ruangan Baru!",
            error: "Gagal Membuat Ruangan Baru!",
        },
        invalidatesQuery: QUERY_KEY({ ...params }),
    },
});

const update = (id: string, params?: TQueryParams) => ({
    mutationFn: async (data: TRuanganRequest) => {
        try {
            const response = await service.update(id, data);
            return response.data;
        } catch (error) {
            throw getError(error);
        }
    },
    meta: {
        messages: {
            success: "Berhasil Memperbarui Ruangan!",
            error: "Gagal Memperbarui Ruangan!",
        },
        invalidatesQuery: QUERY_KEY({ id, ...params }),
    },
});

const activate = (params?: TQueryParams) => ({
    mutationFn: async ({
        id,
        data,
    }: {
        id: string;
        data: { isActive: boolean };
    }) => {
        try {
            const response = await service.activate(id, data);

            return response.data;
        } catch (error) {
            throw getError(error);
        }
    },
    meta: {
        messages: {
            success: "Berhasil Mengaktifkan Ruangan!",
            error: "Gagal Mengaktifkan Ruangan!",
        },
        invalidatesQuery: QUERY_KEY({ ...params }),
    },
});

const assign = (params?: TQueryParams) => ({
    mutationFn: async ({ id, data }: { id: string; data: TAssignRequest }) => {
        try {
            const response = await service.assign(id, data);

            return response.data;
        } catch (error) {
            throw getError(error);
        }
    },
    meta: {
        messages: {
            success: "Berhasil Mengassign Kepala Lab!",
            error: "Gagal Mengassign Kepala Lab!",
        },
        invalidatesQuery: QUERY_KEY({ ...params }),
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
            success: "Berhasil Menghapus Ruangan!",
            error: "Gagal Menghapus Ruangan!",
        },
        invalidatesQuery: QUERY_KEY({ ...params }),
    },
});

export const ruangan = {
    getAll,
    getOne,
    create,
    update,
    remove,
    activate,
    assign,
};
