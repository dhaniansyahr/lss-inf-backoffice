import { z } from "zod";

export const schema = z.object({
    nama: z.string().nonempty({ message: "Nama harus diisi!" }),
    kode: z.string().nonempty({ message: "Kode harus diisi!" }),
    type: z.string().nonempty({ message: "Type harus diisi!" }),
    sks: z.number().int({ message: "SKS harus berupa angka bulat!" }),
    bidangMinat: z.string().nonempty({ message: "Bidang Minat harus diisi!" }),
    isTeori: z.boolean().default(false),
    semester: z.number().int({ message: "Semester harus berupa angka bulat!" }),
});

export type TMatakuliahRequest = z.infer<typeof schema>;
