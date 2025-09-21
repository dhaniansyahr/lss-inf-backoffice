import { service } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { redirect } from "next/navigation";

export const useAccess = (featureName: string) => {
    const { data, isLoading } = useQuery({
        ...service.roles.getAccessByFeatureName(featureName),
        enabled: !!featureName,
    });

    const access = data?.content?.actions;

    if (!access?.VIEW) {
        redirect("/401");
    }

    return { access, isLoading };
};
