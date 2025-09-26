import { TUser } from "@/types/data";
import { TUserRequest } from "./type";

export function userToRequest(data: TUser | null): TUserRequest {
    return {
        fullName: data?.fullName ?? "",
        email: data?.email ?? "",
        password: data?.password ?? "",
        userLevelId: data?.userLevelId ?? "",
    };
}
