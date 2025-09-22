import { NavigationItem } from "@/constants/navigation";
import { service } from "@/services";
import { IMenuItem } from "@/types/common";
import { useQuery } from "@tanstack/react-query";

const HEADER_GROUPS = {
    "Master Data": ["SHIFT", "RUANGAN", "MATA_KULIAH", "DOSEN", "MAHASISWA"],
    Jadwal: ["JADWAL"],
    "Asisten Lab": ["PENDAFTARAN_ASISTEN_LAB", "PENERIMAAN_ASISTEN_LAB"],
    Pengaturan: ["USER_MANAGEMENT", "ROLE_MANAGEMENT"],
};

export function useHomeRoute() {
    const { data, isLoading } = useQuery(service.roles.getAvailableFeatures());

    const availableItems = data?.content ?? [];

    const getAvailableMenuItems = (menuItems: IMenuItem[]) => {
        const result: IMenuItem[] = [];
        const processedHeaders = new Set<string>();

        // First pass: collect all available items and their headers
        for (const item of menuItems) {
            if (
                item.type === "LINK" &&
                availableItems.includes(item.subject ?? "")
            ) {
                // Find the header for this item
                const itemIndex = menuItems.indexOf(item);
                let header: IMenuItem | null = null;

                // Look backwards for the nearest header
                for (let i = itemIndex - 1; i >= 0; i--) {
                    if (menuItems[i].type === "HEADER") {
                        header = menuItems[i];
                        break;
                    }
                }

                // Add header if not already added
                if (header && !processedHeaders.has(header.label)) {
                    result.push(header);
                    processedHeaders.add(header.label);
                }

                // Add the item
                result.push(item);
            }
        }

        return result;
    };
    const getHomeRoute = (): string => {
        const navigationItems = getAvailableMenuItems(NavigationItem);

        for (const item of navigationItems) {
            if (item.type === "LINK") {
                return item.url ?? "/dashboard";
            }
        }

        return "/dashboard";
    };

    const getTitle = (pathname: string) => {
        const navigationItems = getAvailableMenuItems(NavigationItem);

        for (const item of navigationItems) {
            if (item.type === "LINK" && item.url === pathname) {
                return item.label;
            }
        }

        return "Dashboard";
    };

    return {
        homeRoute: getHomeRoute(),
        isLoading,
        availableFeatures: data?.content ?? [],
        getAvailableMenuItems,
        getTitle,
    };
}
