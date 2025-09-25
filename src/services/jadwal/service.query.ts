import { getError } from "@/utils/api";
import { TQueryParams } from "@/types/request";
import { api_service } from "./service.api";
import { TAbsentRequest, TJadwalRequest, TMeetingRequest } from "./type";

const QUERY_KEY = (key?: string | TQueryParams | Record<string, unknown>) =>
    ["jadwal", key] as const;

const getAll = (params?: TQueryParams) => ({
    queryKey: QUERY_KEY({ ...params }),
    queryFn: async () => {
        try {
            const response = await api_service.getAll(params);

            return response.data;
        } catch (error) {
            throw getError(error);
        }
    },
});

const getOne = (id: string) => ({
    queryKey: QUERY_KEY({ type: "detail", id }),
    queryFn: async () => {
        try {
            const response = await api_service.getOne(id);

            return response.data;
        } catch (error) {
            throw getError(error);
        }
    },
});

const create = () => ({
    mutationFn: async (data: TJadwalRequest) => {
        try {
            const response = await api_service.create(data);

            return response.data;
        } catch (error) {
            throw getError(error);
        }
    },
});

const update = (id: string) => ({
    mutationFn: async (data: TJadwalRequest) => {
        try {
            const response = await api_service.update(id, data);

            return response.data;
        } catch (error) {
            throw getError(error);
        }
    },
});

const remove = (params?: TQueryParams) => ({
    mutationFn: async (ids: string[] | string) => {
        try {
            const response = await api_service.remove(ids);

            return response.data;
        } catch (error) {
            throw getError(error);
        }
    },
    meta: {
        messages: {
            success: "Berhasil Menghapus Jadwal!",
            error: "Gagal Menghapus Jadwal!",
        },
        invalidatesQuery: QUERY_KEY({ ...params }),
    },
});

const check = () => ({
    mutationFn: async () => {
        try {
            const response = await api_service.check();

            return response.data;
        } catch (error) {
            throw getError(error);
        }
    },
});

const bulkUpload = () => ({
    mutationFn: async (data: { file: File }) => {
        try {
            const response = await api_service.bulkUpload(data);

            return response.data;
        } catch (error) {
            throw getError(error);
        }
    },
    meta: {
        messages: {
            success: "Berhasil Membuat jadwal dengan bulk!",
            error: "Gagal membuat jadwal dengan bulk!",
        },
    },
});

const generate = () => ({
    mutationFn: async () => {
        try {
            const response = await api_service.generate();

            return response.data;
        } catch (error) {
            throw getError(error);
        }
    },
    meta: {
        messages: {
            success: "Berhasil membuat jadwal secara otomatis!",
            error: "Gagal membuat jadwal secara otomatis!",
        },
    },
});

const updateMeeting = (id: string) => ({
    mutationFn: async (data: TMeetingRequest) => {
        try {
            const response = await api_service.updateMeeting(id, data);

            return response.data;
        } catch (error) {
            throw getError(error);
        }
    },
    meta: {
        messages: {
            success: "Berhasil Memperbarui Pertemuan pada jadwal!",
            error: "Gagal Memperbarui Pertemuan pada jadwal!",
        },
    },
});

const getListParticipants = (id: string) => ({
    queryKey: QUERY_KEY({ type: "list-participants", id }),
    queryFn: async () => {
        try {
            const response = await api_service.getListParticipants(id);

            return response.data;
        } catch (error) {
            throw getError(error);
        }
    },
});

const getListMeeting = (id: string) => ({
    queryKey: QUERY_KEY({ type: "list-meeting", id }),
    queryFn: async () => {
        try {
            const response = await api_service.getListMeeting(id);

            return response.data;
        } catch (error) {
            throw getError(error);
        }
    },
});

const recordAbsent = () => ({
    mutationFn: async (data: TAbsentRequest) => {
        try {
            const response = await api_service.recordAbsent(data);

            return response.data;
        } catch (error) {
            throw getError(error);
        }
    },
    meta: {
        messages: {
            success: "Berhasil Menyimpan Absensi pada jadwal!",
            error: "Gagal Menyimpan Absensi pada jadwal!",
        },
    },
});

const manualAssignMhs = () => ({
    mutationFn: async ({
        id,
        data,
    }: {
        id: string;
        data: { mahasiswaIds: string[] };
    }) => {
        try {
            const response = await api_service.manualAssignMhs(id, data);

            return response.data;
        } catch (error) {
            throw getError(error);
        }
    },
});

const bulkAssignMhs = () => ({
    mutationFn: async ({ id, data }: { id: string; data: { file: File } }) => {
        try {
            const response = await api_service.bulkAssignMhs(id, data);

            return response.data;
        } catch (error) {
            throw getError(error);
        }
    },
});

const today = (params?: TQueryParams) => ({
    queryKey: QUERY_KEY({ ...params }),
    queryFn: async () => {
        try {
            const response = await api_service.today();

            return response.data;
        } catch (error) {
            throw getError(error);
        }
    },
});

export const jadwal = {
    queryKey: (key?: string | TQueryParams | Record<string, unknown>) =>
        QUERY_KEY(key),
    getAll,
    getOne,
    create,
    update,
    remove,
    check,
    bulkUpload,
    generate,
    updateMeeting,
    getListParticipants,
    getListMeeting,
    recordAbsent,
    today,
    manualAssignMhs,
    bulkAssignMhs,
};
