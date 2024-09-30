import { baseUrl } from "../../Constants/Constants";
import { ILoginCredentials, ILoginResponse } from "./Login.interface";

export const login = async (loginCredentials: ILoginCredentials): Promise<ILoginResponse> => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");
    const raw = JSON.stringify(loginCredentials);
    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
    };
    const response = await fetch(`${baseUrl}/api/v2/vsgt-service/login`, requestOptions)
    if (!response.ok) {
        throw new Error((await response.json()).message);
    }

    const res = await response.json();
    return await res

}
