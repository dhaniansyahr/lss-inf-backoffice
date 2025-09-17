import {
    defaultShouldDehydrateQuery,
    MutationCache,
    QueryClient,
    QueryKey,
} from "@tanstack/react-query";
import { toast } from "sonner";
import SuperJSON from "superjson";

declare module "@tanstack/react-query" {
    interface Register {
        mutationMeta: {
            skipToast?: boolean;
            invalidatesQuery?: QueryKey;
            messages?: {
                success?: string;
                error?: string;
            };
            onDialogClose?: () => void;
        };
    }
}

export const queryClientInstance = new QueryClient({
    mutationCache: new MutationCache({
        onSuccess(_data, _variables, _context, mutation) {
            if (mutation.meta?.messages?.success && !mutation.meta?.skipToast) {
                toast.success(mutation.meta.messages.success);
                if (mutation.meta?.onDialogClose) {
                    mutation.meta.onDialogClose();
                }
            }
        },
        onError(_error, _variables, _context, mutation) {
            if (mutation.meta?.messages?.error && !mutation.meta?.skipToast) {
                toast.error(mutation.meta.messages.error);
            }
        },
        onSettled(_data, _error, _variables, _context, mutation) {
            if (mutation.meta?.invalidatesQuery) {
                queryClientInstance.invalidateQueries({
                    queryKey: mutation.meta.invalidatesQuery,
                });
            }
        },
    }),
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000,
            gcTime: 10 * 60 * 1000,
            refetchOnWindowFocus: false,
        },
        dehydrate: {
            serializeData: SuperJSON.serialize,
            shouldDehydrateQuery: (query) =>
                defaultShouldDehydrateQuery(query) ||
                query.state.status === "pending",
        },
        hydrate: {
            deserializeData: SuperJSON.deserialize,
        },
    },
});
