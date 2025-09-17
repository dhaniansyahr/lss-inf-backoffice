import { z } from "zod";

export const schema = z.object({
    nama: z.string().nonempty({ message: "Nama harus diisi!" }),
    email: z
        .string()
        .email({ message: "Email harus valid!" })
        .nonempty({ message: "Email harus diisi!" }),
    password: z.string().nonempty({ message: "Password harus diisi!" }),
    nip: z
        .string()
        .length(16, { message: "NIP harus terdiri dari 16 digit!" })
        .nonempty({ message: "NIP harus diisi!" }),
    bidangMinat: z.string().nonempty({ message: "Bidang Minat harus diisi!" }),
});

export type TDosenRequest = z.infer<typeof schema>;
