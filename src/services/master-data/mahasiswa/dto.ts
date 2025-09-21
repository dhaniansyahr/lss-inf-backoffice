import { TMahasiswa } from "@/types/data";
import { TMahasiswaRequest } from "./type";

export function mahasiswaToValues(data: TMahasiswa | null): TMahasiswaRequest {
    return {
        nama: data?.nama ?? "",
        password: data?.password ?? "",
        semester: data?.semester ?? 0,
        tahunMasuk: data?.tahunMasuk ?? 0,
        npm: data?.npm ?? "",
    };
}
