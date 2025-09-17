export type TPaginationRequest = {
    page?: number;
    rows?: number;
    searchFilters?: {
        [key: string]: string;
    };
    filters?: {
        [key: string]: string;
    };
    rangedFilters?: {
        key: string;
        start: string;
        end: string;
    }[];
    orderKey?: string;
    orderRule?: "asc" | "desc";
};

import { z } from "zod";

export const requiredString = z.string().trim().min(1, "Required");

export const SFilter = z
    .record(
        z.union([
            z.string(),
            z.number(),
            z.boolean(),
            z.null(),
            z.undefined(),
            z.array(z.union([z.string(), z.number(), z.boolean()])),
        ])
    )
    .optional();
export const SSearchFilter = SFilter.optional();
export const SRangedFilter = z
    .object({
        key: z.string(),
        start: z.union([z.string(), z.number()]),
        end: z.union([z.string(), z.number()]),
    })
    .array()
    .optional();
export const SPage = z.number().optional();
export const SRows = z.number().optional();
export const SOrderKey = z.string().optional();
export const SOrderRule = z.enum(["asc", "desc"]).optional();

export const SQueryParams = z.object({
    filters: SFilter,
    searchFilters: SSearchFilter,
    rangedFilters: SRangedFilter,
    page: SPage,
    rows: SRows,
    orderKey: SOrderKey,
    orderRule: SOrderRule,
});

export type TQueryParams = z.infer<typeof SQueryParams>;
