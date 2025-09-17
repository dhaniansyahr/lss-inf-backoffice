import { z } from "zod";

export const schema = z.object({
    nama: z.string().nonempty({ message: "Nama harus diisi!" }),
    lokasi: z.string().nonempty({ message: "Lokasi harus diisi!" }),
    namaKepalaLab: z.string().optional(),
    nipKepalaLab: z.string().optional(),
    kapasitas: z
        .number()
        .int({ message: "Kapasitas harus berupa angka bulat!" }),
    isLab: z.boolean().default(true),
});

export const assignSchema = z.object({
    dosenId: z.string().nonempty({ message: "Dosen harus diisi!" }),
});

export type TRuanganRequest = z.infer<typeof schema>;
export type TAssignRequest = z.infer<typeof assignSchema>;
