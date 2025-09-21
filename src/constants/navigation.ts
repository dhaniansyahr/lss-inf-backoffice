import { IMenuItem } from "@/types/common";

export const NavigationItem: IMenuItem[] = [
    {
        label: "Dashboard",
        type: "LINK",
        url: "/dashboard",
        icon: "mdi:home-outline",
        subject: "DASHBOARD",
    },
    {
        label: "Master Data",
        type: "HEADER",
    },
    {
        label: "Shift",
        url: "/master-data/shift",
        type: "LINK",
        icon: "mdi:clock-outline",
        subject: "SHIFT",
    },
    {
        label: "Ruangan",
        url: "/master-data/ruangan",
        type: "LINK",
        icon: "mdi:home-outline",
        subject: "RUANGAN",
    },
    {
        label: "Mata Kuliah",
        url: "/master-data/mata-kuliah",
        type: "LINK",
        icon: "mdi:book-outline",
        subject: "MATA_KULIAH",
    },
    {
        label: "Dosen",
        url: "/master-data/dosen",
        type: "LINK",
        icon: "mdi:account-outline",
        subject: "DOSEN",
    },
    {
        label: "Mahasiswa",
        url: "/master-data/mahasiswa",
        type: "LINK",
        icon: "mdi:account-outline",
        subject: "MAHASISWA",
    },
    {
        label: "Jadwal",
        type: "HEADER",
    },
    {
        label: "Praktikum",
        url: "/jadwal",
        type: "LINK",
        icon: "mdi:calendar-outline",
        subject: "JADWAL",
    },
    {
        label: "Asisten Lab",
        type: "HEADER",
    },
    {
        label: "Pendaftaran",
        type: "LINK",
        url: "/asisten-lab/pendaftaran",
        icon: "mdi:register",
        subject: "PENDAFTARAN_ASISTEN_LAB",
    },
    {
        label: "Penerimaan",
        type: "LINK",
        url: "/asisten-lab/penerimaan",
        icon: "healthicons:i-documents-accepted",
        subject: "PENERIMAAN_ASISTEN_LAB",
    },
    {
        label: "Pengaturan",
        type: "HEADER",
    },
    {
        label: "Pengguna",
        type: "LINK",
        url: "/pengaturan/pengguna",
        icon: "fa6-solid:user-gear",
        subject: "USER_MANAGEMENT",
    },
    {
        label: "Role",
        type: "LINK",
        url: "/pengaturan/role",
        icon: "oui:app-users-roles",
        subject: "ROLE_MANAGEMENT",
    },
];
