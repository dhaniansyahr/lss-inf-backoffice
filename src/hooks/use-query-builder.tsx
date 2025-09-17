import { parseQueryParams, stringifyParams } from "@/lib/query-params";
import { TQueryParams } from "@/types/request";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function useQueryBuilder() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [params, setParams] = useState<TQueryParams>({});

    useEffect(() => {
        const parsedParams = parseQueryParams(searchParams);
        setParams(parsedParams);
    }, [searchParams]);

    const updateParams = (newParams: TQueryParams) => {
        setParams(newParams);
        const queryString = stringifyParams(newParams).searchParams;
        router.replace(`?${queryString}`);
    };

    return { params, updateParams };
}
