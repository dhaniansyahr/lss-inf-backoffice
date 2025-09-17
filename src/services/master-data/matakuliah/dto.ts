import { TMatakuliah } from "@/types/data";
import { TMatakuliahRequest } from "./type";

export function matakuliahToValues(
    data: TMatakuliah | null
): TMatakuliahRequest {
    return {
        nama: data?.nama ?? "",
        kode: data?.kode ?? "",
        type: data?.type ?? "",
        sks: data?.sks ?? 0,
        bidangMinat: data?.bidangMinat ?? "",
        isTeori: data?.isTeori ?? false,
        semester: data?.semester ?? 0,
    };
}
