import { formatTime } from "@/utils/string.utils";
import { TShiftRequest } from "./type";
import { TShift } from "@/types/data";

export function dataToRequest(data: TShift | null): TShiftRequest {
    return {
        id: data?.id ?? "",
        startTime: formatTime(data?.startTime ?? ""),
        endTime: formatTime(data?.endTime ?? ""),
        isActive: data?.isActive ?? true,
    };
}
