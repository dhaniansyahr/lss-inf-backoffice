import { z } from "zod";

export const schema = z.object({
    id: z.string().optional(),
    startTime: z.string({ message: "Start Time harus diisi!" }).nonempty(),
    endTime: z.string({ message: "End Time harus diisi" }).nonempty(),
    isActive: z.boolean().default(true),
});

export type TShiftRequest = z.infer<typeof schema>;
