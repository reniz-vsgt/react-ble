import { baseUrl } from "../../Constants/Constants";
import { IResetPasswordPayload, IResetPasswordResponse } from "./ResetPassword.interface";

export const resetPasswordAPI = async (payload: IResetPasswordPayload): Promise<IResetPasswordResponse> => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");
    const raw = JSON.stringify(payload);
    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
    };
    const response = await fetch(`${baseUrl}/api/v1/vsgt-service/resetPassword`, requestOptions)
    if (!response.ok) {
        throw new Error((await response.json()).message);
    }

    const res = await response.json();
    return await res
}
