import { getError } from "@/utils/api";
import { TQueryParams } from "@/types/request";
import { service } from "./service.api";
import { TUpdateUserRequest, TUserRequest } from "./type";

const QUERY_KEY = (key?: string | TQueryParams | Record<string, unknown>) =>
    ["users", key] as const;

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

const create = () => ({
    mutationFn: async (data: TUserRequest) => {
        try {
            const response = await service.create(data);

            return response.data;
        } catch (error) {
            throw getError(error);
        }
    },
});

const update = (id: string, params?: TQueryParams) => ({
    mutationFn: async (data: TUpdateUserRequest) => {
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

const remove = () => ({
    mutationFn: async (ids: string[] | string) => {
        try {
            const response = await service.remove(ids);

            return response.data;
        } catch (error) {
            throw getError(error);
        }
    },
});

export const users = {
    getAll,
    getOne,
    create,
    update,
    remove,
};
