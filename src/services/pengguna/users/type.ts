import { z } from "zod";

export const schema = z.object({
    fullName: z.string({ message: "Full Name harus diisi!" }).nonempty(),
    email: z.string({ message: "Email harus diisi!" }).email(),
    password: z.string({ message: "Password harus diisi!" }).nonempty(),
    userLevelId: z.string({ message: "User Level ID harus diisi!" }).nonempty(),
});

export const updateSchema = z.object({
    fullName: z.string({ message: "Full Name harus diisi!" }).nonempty(),
    email: z.string({ message: "Email harus diisi!" }).email(),
    userLevelId: z.string({ message: "User Level ID harus diisi!" }).nonempty(),
});

export type TUserRequest = z.infer<typeof schema>;
export type TUpdateUserRequest = z.infer<typeof updateSchema>;
