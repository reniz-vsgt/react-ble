import { baseUrl } from "../../Constants/Constants";
import { IForgotPassword, IForgotPasswordResponse } from "./ForgotPassword.interface";

export const sendOTP = async (email: IForgotPassword): Promise<IForgotPasswordResponse> => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");
    const raw = JSON.stringify(email);
    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
    };
    const response = await fetch(`${baseUrl}/api/v1/vsgt-service/sendOtp?type=resetPassword`, requestOptions)
    if (!response.ok) {
        throw new Error((await response.json()).message);
    }

    const res = await response.json();
    return await res
}


export const verifyOTP = async (payload: IForgotPassword): Promise<IForgotPasswordResponse> => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");
    const raw = JSON.stringify(payload);
    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
    };
    const response = await fetch(`${baseUrl}/api/v1/vsgt-service/verifyOtp`, requestOptions)
    if (!response.ok) {
        throw new Error((await response.json()).message);
    }

    const res = await response.json();
    return await res

}
