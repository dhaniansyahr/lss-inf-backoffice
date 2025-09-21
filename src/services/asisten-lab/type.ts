import { z } from "zod";

const request = z.object({
    mahasiswaId: z.string().nonempty({ message: "Mahasiswa ID harus diisi!" }),
    jadwalId: z.string().nonempty({ message: "Jadwal ID harus diisi!" }),
    nilaiTeori: z.string().nonempty({ message: "Nilai Teori harus diisi!" }),
    nilaiPraktikum: z
        .string()
        .nonempty({ message: "Nilai Praktikum harus diisi!" }),
    nilaiAkhir: z.string().nonempty({ message: "Nilai Akhir harus diisi!" }),
});

const acceptance = z.object({
    status: z.string().nonempty({ message: "Status harus diisi!" }),
    keterangan: z.string().optional(),
});

export type TRequestAssistenLab = z.infer<typeof request>;
export type TAcceptanceAssistenLab = z.infer<typeof acceptance>;

export const schema = {
    request,
    acceptance,
};
