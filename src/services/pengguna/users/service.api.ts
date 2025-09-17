import { stringifyParams } from "@/lib/query-params";
import { TUser } from "@/types/data";
import { TQueryParams } from "@/types/request";
import { TResponse, TResponseGetAll } from "@/types/response";
import { api } from "@/utils/api";
import { TUpdateUserRequest, TUserRequest } from "./type";

export const service = {
    getAll: (params?: TQueryParams) => {
        return api.get<TResponseGetAll<TUser>>("/users", {
            params: stringifyParams(params).query,
        });
    },
    getOne: (id: string) => {
        return api.get<TResponse<TUser>>(`/users/${id}`);
    },
    create: (data: TUserRequest) => {
        return api.post<TResponse<TUser>>("/users", data);
    },
    update: (id: string, data: TUpdateUserRequest) => {
        return api.put<TResponse<TUser>>(`/users/${id}`, data);
    },
    remove: (ids: string[] | string) => {
        const params = {
            ids: Array.isArray(ids)
                ? JSON.stringify(ids)
                : JSON.stringify([ids]),
        };

        return api.delete<TResponse<TUser>>(`/users`, {
            params,
        });
    },
};
