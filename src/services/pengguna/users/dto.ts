import { formatTime } from "@/utils/string.utils";
import { TShift, TShiftRequest } from "./type";

export function dataToRequest(data: TShift | null): TShiftRequest {
    return {
        id: data?.id ?? "",
        startTime: formatTime(data?.startTime ?? ""),
        endTime: formatTime(data?.endTime ?? ""),
        isActive: data?.isActive ?? true,
    };
}
