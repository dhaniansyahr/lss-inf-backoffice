import { z } from "zod";

const jadwal = z.object({
    hari: z.string().nonempty({ message: "Hari harus diisi!" }),
    shiftId: z.string().nonempty({ message: "Shift ID harus diisi!" }),
    ruanganId: z.string().nonempty({ message: "Ruangan ID harus diisi!" }),
    isOverride: z.boolean().default(false),
    kelas: z.string().nonempty({ message: "Kelas harus diisi!" }),
    matakuliahId: z
        .string()
        .nonempty({ message: "Matakuliah ID harus diisi!" }),
    dosenIds: z.array(z.string()).optional(),
    asistenLabIds: z.array(z.string()).optional(),
    mahasiswaIds: z.array(z.string()).optional(),
});

const meeting = z.object({
    tanggal: z.string().nonempty({ message: "Tanggal harus diisi!" }),
    meetingId: z.string().nonempty({ message: "Meeting ID harus diisi!" }),
});

const absent = z.object({
    identity: z.string().nonempty({ message: "Identitas harus diisi!" }),
    meetingId: z.string().nonempty({ message: "Meeting ID harus diisi!" }),
    type: z.enum(["DOSEN", "MAHASISWA", "ASISTEN_LAB"]),
});

export type TJadwalRequest = z.infer<typeof jadwal>;
export type TMeetingRequest = z.infer<typeof meeting>;
export type TAbsentRequest = z.infer<typeof absent>;

export const schema = {
    jadwal,
    meeting,
    absent,
};
