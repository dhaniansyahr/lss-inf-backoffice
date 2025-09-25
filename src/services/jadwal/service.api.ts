import { stringifyParams } from "@/lib/query-params";
import { TJadwal, TListParticipants, TMeeting } from "@/types/data";
import { TQueryParams } from "@/types/request";
import { TResponse, TResponseGetAll } from "@/types/response";
import { api, MULTIPART_HEADER } from "@/utils/api";
import { TAbsentRequest, TJadwalRequest, TMeetingRequest } from "./type";

export const api_service = {
    getAll: (params?: TQueryParams) => {
        return api.get<TResponseGetAll<TJadwal>>("/jadwal", {
            params: stringifyParams(params).query,
        });
    },
    getOne: (id: string) => {
        return api.get<TResponse<TJadwal>>(`/jadwal/${id}`);
    },
    create: (data: TJadwalRequest) => {
        return api.post<TResponse<TJadwal>>("/jadwal", data);
    },
    update: (id: string, data: TJadwalRequest) => {
        return api.put<TResponse<TJadwal>>(`/jadwal/${id}`, data);
    },
    remove: (ids: string[] | string) => {
        const params = {
            ids: Array.isArray(ids)
                ? JSON.stringify(ids)
                : JSON.stringify([ids]),
        };

        return api.delete<TResponse<TJadwal>>(`/jadwal`, { params });
    },
    check: () => {
        return api.get<TResponse<any>>("/jadwal/check");
    },
    bulkUpload: (data: { file: File }) => {
        return api.post<TResponse<TJadwal>>(
            "/jadwal/bulk-upload",
            data,
            MULTIPART_HEADER
        );
    },
    generate: () => {
        return api.post<TResponse<TJadwal>>("/jadwal/generate");
    },
    updateMeeting: (id: string, data: TMeetingRequest) => {
        return api.put<TResponse<TJadwal>>(`/jadwal/${id}/meeting`, data);
    },
    getListParticipants: (id: string) => {
        return api.get<TResponse<TListParticipants>>(`/absensi/${id}/list`);
    },
    getListMeeting: (id: string) => {
        return api.get<TResponse<TMeeting[]>>(`/jadwal/${id}/list-meeting`);
    },
    recordAbsent: (data: TAbsentRequest) => {
        return api.post<TResponse<TMeeting>>(`/absensi/record`, data);
    },
    today: () => {
        return api.get<TResponse<TMeeting[]>>(`/absensi/today`);
    },
    manualAssignMhs: (id: string, data: { mahasiswaIds: string[] }) => {
        return api.put<TResponse<{}>>(
            `/jadwal/assign-mahasiswa/${id}/manual`,
            data
        );
    },
    bulkAssignMhs: (id: string, data: { file: File }) => {
        return api.put<TResponse<{}>>(
            `/jadwal/assign-mahasiswa/${id}/bulk-upload`,
            data,
            MULTIPART_HEADER
        );
    },
};
