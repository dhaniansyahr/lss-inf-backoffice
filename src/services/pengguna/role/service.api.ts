import { stringifyParams } from "@/lib/query-params";
import { TAccess, TAllFeatures, TUserLevels } from "@/types/data";
import { TQueryParams } from "@/types/request";
import { TResponse, TResponseGetAll } from "@/types/response";
import { api } from "@/utils/api";
import { TAclRequest } from "./type";

export const service = {
    getAll: (params?: TQueryParams) => {
        return api.get<TResponseGetAll<TUserLevels>>("/user-levels", {
            params: stringifyParams(params).query,
        });
    },
    getAllFeatures: () => {
        return api.get<TResponse<TAllFeatures[]>>(`/acl/features`);
    },
    getAccessByUserLevelId: (userLevelId: string) => {
        return api.get<TResponse<TUserLevels>>(`/acl/${userLevelId}`);
    },
    create: (data: TAclRequest) => {
        return api.post<TResponse<TUserLevels>>("/acl", data);
    },
    update: (data: TAclRequest) => {
        return api.put<TResponse<TUserLevels>>(`/acl`, data);
    },
    getAvailableFeatures: () => {
        return api.get<TResponse<string[]>>(`/acl/available-features`);
    },
    getAccessByFeatureName: (featureName: string) => {
        return api.get<TResponse<TAccess>>(`/acl`, {
            params: {
                featureName,
            },
        });
    },
};
