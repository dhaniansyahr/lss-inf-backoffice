import { TDosen } from "@/types/data";
import { TDosenRequest } from "./type";

export function dosenToValues(data: TDosen | null): TDosenRequest {
    return {
        nama: data?.nama ?? "",
        email: data?.email ?? "",
        password: data?.password ?? "",
        nip: data?.nip ?? "",
        bidangMinat: data?.bidangMinat ?? "",
        userLevelId: data?.userLevelId ?? "",
    };
}
