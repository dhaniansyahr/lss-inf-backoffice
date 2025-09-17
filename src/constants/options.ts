import { Option } from "@/types/common";

const HARI: Option[] = [
    { label: "Senin", value: "SENIN" },
    { label: "Selasa", value: "SELASA" },
    { label: "Rabu", value: "RABU" },
    { label: "Kamis", value: "KAMIS" },
    { label: "Jumat", value: "JUMAT" },
    { label: "Sabtu", value: "SABTU" },
];

const KELAS: Option[] = [
    { label: "A", value: "A" },
    { label: "B", value: "B" },
    { label: "C", value: "C" },
    { label: "D", value: "D" },
];

const BIDANG_MINAT: Option[] = [
    { label: "Rekayasa Perangkat Lunak", value: "RPL" },
    { label: "Data Mining", value: "DATA_MINING" },
    { label: "Jaringan Komputer", value: "JARINGAN" },
    { label: "GIS", value: "GIS" },
];

const SEMESTER: Option[] = [
    { label: "Semester 1", value: "1" },
    { label: "Semester 2", value: "2" },
    { label: "Semester 3", value: "3" },
    { label: "Semester 4", value: "4" },
    { label: "Semester 5", value: "5" },
    { label: "Semester 6", value: "6" },
    { label: "Semester 7", value: "7" },
    { label: "Semester 8", value: "8" },
];

const TIPE_MATKUL: Option[] = [
    { label: "Wajib", value: "WAJIB" },
    { label: "Pilihan", value: "PILIHAN" },
];

const NILAI = [
    { label: "A", value: "A" },
    { label: "AB", value: "AB" },
    { label: "B", value: "B" },
    { label: "BC", value: "BC" },
    { label: "C", value: "C" },
    { label: "D", value: "D" },
    { label: "E", value: "E" },
];

export const options = {
    HARI,
    KELAS,
    BIDANG_MINAT,
    SEMESTER,
    TIPE_MATKUL,
    NILAI,
};
