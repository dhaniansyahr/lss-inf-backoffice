import { TRuanganLaboratorium } from "@/types/data";
import { TRuanganRequest } from "./type";

export function ruanganToValues(
    data: TRuanganLaboratorium | null
): TRuanganRequest {
    return {
        nama: data?.nama ?? "",
        lokasi: data?.lokasi ?? "",
        namaKepalaLab: data?.kepalaLab?.nama ?? "",
        nipKepalaLab: data?.kepalaLab?.nip ?? "",
        kapasitas: data?.kapasitas ?? 0,
        isLab: data?.isLab ?? true,
    };
}
