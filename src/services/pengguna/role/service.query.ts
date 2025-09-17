import { getError } from "@/utils/api";
import { TQueryParams } from "@/types/request";
import { service } from "./service.api";
import { TAclRequest } from "./type";

const QUERY_KEY = (key?: string | TQueryParams | Record<string, unknown>) =>
    ["user-levels", key] as const;

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

const getAllFeatures = (params?: TQueryParams) => ({
    queryKey: QUERY_KEY({ ...params }),
    queryFn: async () => {
        try {
            const response = await service.getAllFeatures();

            return response.data;
        } catch (error) {
            throw getError(error);
        }
    },
});

const getAccessByUserLevelId = (
    userLevelId: string,
    params?: TQueryParams
) => ({
    queryKey: QUERY_KEY({ ...params }),
    queryFn: async () => {
        try {
            const response = await service.getAccessByUserLevelId(userLevelId);

            return response.data;
        } catch (error) {
            throw getError(error);
        }
    },
});

const create = () => ({
    mutationFn: async (data: TAclRequest) => {
        try {
            const response = await service.create(data);

            return response.data;
        } catch (error) {
            throw getError(error);
        }
    },
});

const update = (params?: TQueryParams) => ({
    mutationFn: async (data: TAclRequest) => {
        try {
            const response = await service.update(data);

            return response.data;
        } catch (error) {
            throw getError(error);
        }
    },
    meta: {
        messages: {
            success: "Berhasil Memperbarui Role!",
            error: "Gagal Memperbarui Role!",
        },
        invalidatesQuery: QUERY_KEY({ ...params }),
    },
});

export const roles = {
    getAll,
    getAllFeatures,
    getAccessByUserLevelId,
    create,
    update,
};
