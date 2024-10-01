import { baseUrl } from "../../Constants/Constants";
import { ISignupForm, ISignupResponse } from "./Signup.interface";

export const signup = async (loginCredentials: ISignupForm): Promise<ISignupResponse> => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");
    const raw = JSON.stringify(loginCredentials);
    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
    };
    const response = await fetch(`${baseUrl}/api/v1/vsgt-service/signup`, requestOptions)
    if (!response.ok) {
        throw new Error((await response.json()).message);
    }
    return await response.json()

}
