import { z } from "zod";

export const schema = z.object({
    nama: z.string().nonempty({ message: "Nama harus diisi!" }),
    npm: z.string().nonempty({ message: "NPM harus diisi!" }),
    password: z.string().nonempty({ message: "Password harus diisi!" }),
    semester: z
        .number()
        .int()
        .positive({ message: "Semester harus berupa angka positif!" }),
    tahunMasuk: z
        .number()
        .int()
        .positive({ message: "Tahun Masuk harus berupa angka positif!" }),
});

export type TMahasiswaRequest = z.infer<typeof schema>;
