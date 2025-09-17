import { IPaginate } from "@/types/common";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getPaginationRange(paginate?: IPaginate) {
    if (!paginate) return { from: 0, to: 0 };
    const { totalData, page, rows } = paginate;
    const from = totalData === 0 ? 0 : (page - 1) * rows + 1;
    const to = totalData === 0 ? 0 : Math.min(page * rows, totalData || 0);

    return `${from} - ${to} of ${totalData}`;
}
