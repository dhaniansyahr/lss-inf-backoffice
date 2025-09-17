import { TJadwal } from "@/types/data";
import { TJadwalRequest } from "./type";

export function jadwalToValues(data: TJadwal | null): TJadwalRequest {
    return {
        hari: data?.hari ?? "",
        shiftId: data?.shiftId ?? "",
        ruanganId: data?.ruanganId ?? "",
        isOverride: data?.isOverride ?? false,
        kelas: data?.kelas ?? "",
        matakuliahId: data?.matakuliahId ?? "",
        dosenIds: data?.jadwalDosen?.map((dosen) => dosen.dosenId) ?? [],
        asistenLabIds:
            data?.jadwalAsistenLab?.map((asisten) => asisten.asistenLabId) ??
            [],
        mahasiswaIds:
            data?.jadwalMahasiswa?.map((mahasiswa) => mahasiswa.mahasiswaId) ??
            [],
    };
}
