import { SQueryParams, TQueryParams } from "@/types/request";

export function parseQueryParams(params: URLSearchParams): TQueryParams {
    const obj: Record<string, string | []> = {};

    params.forEach((value, key) => {
        try {
            obj[key] = JSON.parse(value);
        } catch {
            obj[key] = value;
        }
    });

    const result = SQueryParams.safeParse(obj);

    if (!result.success) {
        console.warn(`Invalid query params: ${result.error.message}`);

        return {};
    }

    return result.data;
}

export function getParams(params?: TQueryParams) {
    const queryParams = new URLSearchParams();

    Object.entries(params || {}).forEach(([key, value]) => {
        queryParams.append(key, JSON.stringify(value));
    });

    return queryParams.toString();
}

export function stringifyParams(params?: TQueryParams): {
    searchParams: string;
    query: Record<string, unknown>;
} {
    const searchParams = new URLSearchParams();
    const query: Record<string, unknown> = {};

    Object.entries(params || {}).forEach(([key, value]) => {
        if (value !== undefined) {
            if (typeof value === "object") {
                searchParams.set(key, JSON.stringify(value));
                query[key] = JSON.stringify(value);
            } else {
                searchParams.set(key, value.toString());
                query[key] = value;
            }
        }
    });

    return {
        searchParams: searchParams.toString(),
        query,
    };
}
