import { IMenuItem } from "@/types/common";

export const NavigationItem: IMenuItem[] = [
    {
        label: "Dashboard",
        type: "LINK",
        url: "/dashboard",
        icon: "mdi:home-outline",
    },
    {
        label: "Master Data",
        type: "HEADER",
        items: [
            {
                label: "Shift",
                url: "/master-data/shift",
                type: "LINK",
                icon: "mdi:clock-outline",
            },
            {
                label: "Ruangan",
                url: "/master-data/ruangan",
                type: "LINK",
                icon: "mdi:home-outline",
            },
            {
                label: "Mata Kuliah",
                url: "/master-data/mata-kuliah",
                type: "LINK",
                icon: "mdi:book-outline",
            },
            {
                label: "Dosen",
                url: "/master-data/dosen",
                type: "LINK",
                icon: "mdi:account-outline",
            },
        ],
    },
    {
        label: "Jadwal",
        type: "HEADER",
        items: [
            {
                label: "Praktikum",
                url: "/jadwal",
                type: "LINK",
                icon: "mdi:calendar-outline",
            },
        ],
    },
    {
        label: "Asisten Lab",
        type: "HEADER",
        items: [
            {
                label: "Pendaftaran",
                type: "LINK",
                url: "/asisten-lab/pendaftaran",
                icon: "mdi:register",
            },
            {
                label: "Penerimaan",
                type: "LINK",
                url: "/asisten-lab/penerimaan",
                icon: "healthicons:i-documents-accepted",
            },
        ],
    },
    {
        label: "Pengaturan",
        type: "HEADER",
        items: [
            {
                label: "Pengguna",
                type: "LINK",
                url: "/pengaturan/pengguna",
                icon: "fa6-solid:user-gear",
            },
            {
                label: "Role",
                type: "LINK",
                url: "/pengaturan/role",
                icon: "oui:app-users-roles",
            },
        ],
    },
];
