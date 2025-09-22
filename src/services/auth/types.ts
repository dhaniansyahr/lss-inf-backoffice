import { z } from "zod";

// login
export const schemaLoginRequest = z.object({
    identity: z.string(),
    password: z.string(),
});

export type TLoginRequest = z.infer<typeof schemaLoginRequest>;

export const schemaLoginResponse = z.object({
    user: z.object({
        id: z.string(),
        email: z.string(),
        nama: z.string().nullable(),
        npm: z.string().nullable(),
        nip: z.string().nullable(),
        fullName: z.string(),
        noIdentitas: z.string(),
        userLevelId: z.string().optional(),
        userLevel: z.object({
            id: z.string(),
            name: z.string(),
        }),
    }),
    token: z.string(),
    refreshToken: z.string(),
});

export type TLoginResponse = z.infer<typeof schemaLoginResponse>;

// verify token
export const schemaVerifyRequest = z.object({
    token: z.string(),
});

export type TVerifyRequest = z.infer<typeof schemaVerifyRequest>;

export const schemaVerifyResponse = z.object({
    user: schemaLoginResponse.shape.user,
    token: z.string(),
    refreshToken: z.string(),
});

export type TVerifyResponse = z.infer<typeof schemaVerifyResponse>;
