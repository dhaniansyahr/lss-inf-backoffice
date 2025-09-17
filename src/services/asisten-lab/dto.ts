import { TpendaftaranAsistenLab } from "@/types/data";
import { TRequestAssistenLab } from "./type";

export function jadwalToValues(
    data: TpendaftaranAsistenLab | null
): TRequestAssistenLab {
    return {
        mahasiswaId: data?.mahasiswaId ?? "",
        jadwalId: data?.jadwalId ?? "",
        nilaiTeori: data?.nilaiTeori ?? "",
        nilaiPraktikum: data?.nilaiPraktikum ?? "",
        nilaiAkhir: data?.nilaiAkhir ?? "",
        keterangan: data?.keterangan ?? "",
    };
}
