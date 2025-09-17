import type { TResponse } from "@/types/response";
import { api, apiBase, apiDefault, getError } from "@/utils/api";
import type {
    TLoginRequest,
    TLoginResponse,
    TVerifyRequest,
    TVerifyResponse,
} from "./types";
import { routes } from "./api-route";

const login = () => ({
    mutationFn: async (data: TLoginRequest) => {
        try {
            const response = await apiBase.post<TResponse<TLoginResponse>>(
                routes.login,
                data
            );

            return response.data;
        } catch (error) {
            throw getError(error);
        }
    },
    meta: {
        messages: {
            success: "Berhasil Login!",
            error: "Gagal Login!",
        },
    },
});

const verifyToken = async (data: TVerifyRequest) => {
    try {
        const response = await api.post<TResponse<TVerifyResponse>>(
            routes.verifyToken,
            data
        );

        return response.data;
    } catch (error) {
        throw getError(error);
    }
};

const logout = async () => {
    try {
        const response = await apiDefault.get(routes.logout);

        return response.data;
    } catch (error) {
        console.log(error);
        throw getError(error);
    }
};

export const auth = {
    login,
    verifyToken,
    logout,
};
