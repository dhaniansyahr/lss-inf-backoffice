import { getError } from "@/utils/api";
import { TQueryParams } from "@/types/request";
import { service } from "./service.api";
import { TAclRequest } from "./type";

const QUERY_KEY = (key?: string | TQueryParams | Record<string, unknown>) =>
    ["user-levels", key] as const;

const getAll = (params?: TQueryParams) => ({
    queryKey: QUERY_KEY({ type: "getAll", ...params }),
    queryFn: async () => {
        try {
            const response = await service.getAll(params);

            return response.data;
        } catch (error) {
            throw getError(error);
        }
    },
});

const getOneRole = (id: string) => ({
    queryKey: QUERY_KEY({ type: "getOneRole", id }),
    queryFn: async () => {
        try {
            const response = await service.getOneRole(id);

            return response.data;
        } catch (error) {
            throw getError(error);
        }
    },
});

const getAllFeatures = (params?: TQueryParams) => ({
    queryKey: QUERY_KEY({ type: "getAllFeatures", ...params }),
    queryFn: async () => {
        try {
            const response = await service.getAllFeatures();

            return response.data;
        } catch (error) {
            throw getError(error);
        }
    },
});

const getAvailableFeatures = (params?: TQueryParams) => ({
    queryKey: QUERY_KEY({ type: "getAvailableFeatures", ...params }),
    queryFn: async () => {
        try {
            const response = await service.getAvailableFeatures();

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
    queryKey: QUERY_KEY({
        type: "getAccessByUserLevelId",
        userLevelId,
        ...params,
    }),
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
    mutationFn: async ({ id, data }: { id: string; data: TAclRequest }) => {
        try {
            const response = await service.update(id, data);

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
        invalidatesQuery: QUERY_KEY({ type: "getAll", ...params }),
    },
});

const getAccessByFeatureName = (
    featureName: string,
    params?: TQueryParams
) => ({
    queryKey: QUERY_KEY({
        type: "getAccessByFeatureName",
        featureName,
        ...params,
    }),
    queryFn: async () => {
        try {
            const response = await service.getAccessByFeatureName(featureName);

            return response.data;
        } catch (error) {
            throw getError(error);
        }
    },
});

export const roles = {
    getAll,
    getOneRole,
    getAllFeatures,
    getAvailableFeatures,
    getAccessByUserLevelId,
    create,
    update,
    getAccessByFeatureName,
};
